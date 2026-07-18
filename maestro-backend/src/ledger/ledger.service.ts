import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient, EntryType } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateLedgerTransactionDto {
  tenantId: string;
  description: string;
  date: Date;
  entries: {
    accountId: string;
    type: EntryType;
    amount: number;
  }[];
  metadata?: any;
}

@Injectable()
export class LedgerService {
  /**
   * Cria uma transação contábil garantindo a regra da Partida Dobrada.
   */
  async createTransaction(data: CreateLedgerTransactionDto) {
    const { tenantId, description, date, entries, metadata } = data;

    // 1. Validação de Partida Dobrada (Double-Entry Engine Rule)
    const totalDebits = entries
      .filter((e) => e.type === EntryType.DEBIT)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalCredits = entries
      .filter((e) => e.type === EntryType.CREDIT)
      .reduce((acc, curr) => acc + curr.amount, 0);

    if (totalDebits !== totalCredits) {
      throw new BadRequestException(
        `Desequilíbrio Contábil: Débitos (${totalDebits}) não batem com os Créditos (${totalCredits}).`,
      );
    }

    if (totalDebits === 0) {
      throw new BadRequestException('Uma transação deve ter valor maior que zero.');
    }

    // 2. Persistência Atômica via Transaction
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        // Criar a transação
        const newTx = await tx.ledgerTransaction.create({
          data: {
            tenantId,
            description,
            date,
            metadata,
            entries: {
              create: entries.map((e) => ({
                accountId: e.accountId,
                type: e.type,
                amount: e.amount,
              })),
            },
          },
          include: {
            entries: true,
          },
        });

        return newTx;
      });

      return transaction;
    } catch (error) {
      // Aqui podemos acionar o Agent de Governança para reportar a falha em um DLQ
      console.error('Falha ao processar transação no Ledger', error);
      throw error;
    }
  }

  /**
   * Realiza o estorno de uma transação (Reversal) para garantir imutabilidade.
   */
  async reverseTransaction(transactionId: string, tenantId: string, reason: string) {
    const originalTx = await prisma.ledgerTransaction.findUnique({
      where: { id: transactionId, tenantId },
      include: { entries: true },
    });

    if (!originalTx) throw new BadRequestException('Transação original não encontrada.');
    if (originalTx.status === 'REVERSED') throw new BadRequestException('Transação já estornada.');

    // Inverter as entradas
    const reversedEntries = originalTx.entries.map((entry) => ({
      accountId: entry.accountId,
      type: entry.type === EntryType.DEBIT ? EntryType.CREDIT : EntryType.DEBIT,
      amount: entry.amount,
    }));

    // Criar transação de estorno e marcar a original como estornada
    const reversal = await prisma.$transaction(async (tx) => {
      await tx.ledgerTransaction.update({
        where: { id: originalTx.id },
        data: { status: 'REVERSED' },
      });

      return tx.ledgerTransaction.create({
        data: {
          tenantId,
          description: `Estorno: ${originalTx.description} - Motivo: ${reason}`,
          date: new Date(),
          metadata: { originalTransactionId: originalTx.id },
          entries: {
            create: reversedEntries,
          },
        },
      });
    });

    return reversal;
  }
  /**
   * Calcula o saldo atual de uma conta através do somatório de débitos e créditos.
   */
  async getAccountBalance(accountId: string, tenantId: string): Promise<number> {
    const account = await prisma.account.findUnique({
      where: { id: accountId, tenantId },
    });

    if (!account) throw new BadRequestException('Conta não encontrada.');

    // Soma todos os débitos da conta
    const debits = await prisma.ledgerEntry.aggregate({
      where: {
        accountId,
        type: EntryType.DEBIT,
        transaction: { status: 'POSTED' }, // Apenas transações confirmadas
      },
      _sum: { amount: true },
    });

    // Soma todos os créditos da conta
    const credits = await prisma.ledgerEntry.aggregate({
      where: {
        accountId,
        type: EntryType.CREDIT,
        transaction: { status: 'POSTED' },
      },
      _sum: { amount: true },
    });

    const sumDebits = debits._sum.amount || 0;
    const sumCredits = credits._sum.amount || 0;

    // A regra de saldo depende do tipo de conta (Ativo/Despesa = Devedora, Passivo/Receita/Patrimônio = Credora)
    // Para simplificar no MVP, retornamos a diferença absoluta ou baseada na natureza
    if (account.type === 'ASSET' || account.type === 'EXPENSE') {
      return sumDebits - sumCredits;
    } else {
      return sumCredits - sumDebits;
    }
  }

  /**
   * Auditoria Noturna: Valida a integridade global do Motor Contábil.
   */
  async verifyDailyIntegrity(): Promise<{ isBalanced: boolean; difference: number }> {
    console.log('[Audit] Iniciando verificação de integridade da Partida Dobrada...');

    const debits = await prisma.ledgerEntry.aggregate({
      where: {
        type: EntryType.DEBIT,
        transaction: { status: 'POSTED' },
      },
      _sum: { amount: true },
    });

    const credits = await prisma.ledgerEntry.aggregate({
      where: {
        type: EntryType.CREDIT,
        transaction: { status: 'POSTED' },
      },
      _sum: { amount: true },
    });

    const sumDebits = debits._sum.amount || 0;
    const sumCredits = credits._sum.amount || 0;
    const difference = Math.abs(sumDebits - sumCredits);

    if (difference !== 0) {
      const errorMsg = `CRÍTICO: O Ledger global está desequilibrado! Diferença de ${difference} centavos.`;
      console.error(errorMsg);
      // Aqui podemos acionar o Agent de Governança para salvar no AuditLog do Prisma
      try {
        await prisma.auditLog.create({
          data: {
            action: 'LEDGER_INTEGRITY_FAILED',
            entity: 'System',
            entityId: 'global',
            tenantId: 'SYSTEM', // Usando um ID fixo ou do admin root
            details: { difference, sumDebits, sumCredits },
          },
        });
      } catch (e) {
        console.error('Falha ao escrever log de auditoria', e);
      }

      return { isBalanced: false, difference };
    }

    console.log('[Audit] Integridade contábil verificada com sucesso. Total D/C:', sumDebits);
    return { isBalanced: true, difference: 0 };
  }
}
