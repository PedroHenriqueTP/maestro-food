import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface TimeSeriesData {
  month: string;
  mrr: number;
  projected: number;
}

export interface FunnelData {
  stage: string;
  count: number;
  color: string;
}

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getKpis() {
    this.logger.log('Calculando KPIs financeiros e de Growth...');
    
    // Mock de agregação de dados após injeção do Growth-Bot
    const currentMRR = 42500;
    const projectedMRR = 75000; // Salto gigantesco pelo volume de leads minerados
    
    const timeSeries: TimeSeriesData[] = [
      { month: 'Jan', mrr: 22000, projected: 22000 },
      { month: 'Fev', mrr: 28000, projected: 28000 },
      { month: 'Mar', mrr: 33000, projected: 33000 },
      { month: 'Abr', mrr: 36500, projected: 36500 },
      { month: 'Mai', mrr: 42500, projected: 42500 },
      { month: 'Jun', mrr: 42500, projected: 75000 }, // Nova Projeção
    ];

    const funnel: FunnelData[] = [
      { stage: 'Minerados (Scout)', count: 500, color: '#3b82f6' }, // +50 injetados
      { stage: 'Qualificados', count: 150, color: '#eab308' }, // +30 qualificados pelo auto-sync
      { stage: 'Fechados (MRR)', count: 32, color: '#10b981' },
    ];

    return {
      currentMRR,
      projectedMRR,
      conversionRate: ((32 / 450) * 100).toFixed(1),
      timeSeries,
      funnel,
    };
  }

  async getCrmCustomers() {
    this.logger.log('Buscando base de clientes do CRM (Prisma)...');
    try {
      const customers = await this.prisma.customer.findMany({
        include: { orders: true },
        orderBy: { createdAt: 'desc' }
      });

      if (customers.length === 0) {
        return []; // Retorna vazio em vez de mock se não houver dados, garantindo que "dados falsos" desapareçam
      }

      return customers.map(c => {
        const totalOrders = c.orders.length;
        const totalSpent = c.orders.reduce((acc, order) => acc + Number(order.totalAmount), 0) * 100; // converter para centavos
        return {
          id: c.id,
          name: c.name,
          phone: c.phone || 'Sem Telefone',
          totalOrders,
          totalSpent,
          lastOrderDate: c.orders.length > 0 
            ? c.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt.toISOString() 
            : c.createdAt.toISOString()
        };
      });
    } catch (error) {
      this.logger.error('Erro ao buscar CRM Customers:', error);
      return [];
    }
  }

  async getFinance() {
    this.logger.log('Buscando dados financeiros (Prisma)...');
    try {
      const transactions = await this.prisma.ledgerTransaction.findMany({
        include: {
          entries: {
            include: {
              account: true
            }
          }
        },
        orderBy: { date: 'desc' },
        take: 100 // Limite para o dashboard
      });

      if (transactions.length === 0) {
        return { transactions: [], kpis: { revenue: 0, expense: 0, profit: 0, pendingPayable: 0 } };
      }

      let revenue = 0;
      let expense = 0;
      let pendingPayable = 0;

      const formattedTransactions = transactions.map(t => {
        let amount = 0;
        let type = 'UNKNOWN';
        let accountName = 'Unknown';
        
        t.entries.forEach(entry => {
          // Lógica simplificada: se a conta é REVENUE e a entrada é CREDIT, é faturamento
          if (entry.account.type === 'REVENUE' && entry.type === 'CREDIT') {
            revenue += entry.amount;
            amount = entry.amount;
            type = 'INCOME';
            accountName = entry.account.name;
          }
          // Se a conta é EXPENSE e a entrada é DEBIT, é despesa
          if (entry.account.type === 'EXPENSE' && entry.type === 'DEBIT') {
            expense += entry.amount;
            amount = entry.amount;
            type = 'EXPENSE';
            accountName = entry.account.name;
          }
          // Se a conta é LIABILITY, consideramos como contas a pagar (simulação básica)
          if (entry.account.type === 'LIABILITY' && entry.type === 'CREDIT' && t.status === 'PENDING') {
             pendingPayable += entry.amount;
          }
        });

        // Caso a transação não bata com o heurístico simples
        if (amount === 0 && t.entries.length > 0) {
          amount = t.entries[0].amount;
          accountName = t.entries[0].account.name;
        }

        return {
          id: t.id,
          description: t.description,
          date: t.date.toISOString(),
          status: t.status,
          amount,
          type, // INCOME | EXPENSE
          account: accountName,
          method: (t.metadata as any)?.paymentMethod || 'BANK_TRANSFER'
        };
      });

      return {
        transactions: formattedTransactions,
        kpis: {
          revenue,
          expense,
          profit: revenue - expense,
          pendingPayable
        }
      };

    } catch (error) {
      this.logger.error('Erro ao buscar dados financeiros:', error);
      return { transactions: [], kpis: { revenue: 0, expense: 0, profit: 0, pendingPayable: 0 } };
    }
  }
}
