import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

export interface KitchenOrder {
  id: string;
  items: string[];
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERING' | 'COMPLETED';
  createdAt: string;
  urgencyLevel: 'NORMAL' | 'HIGH' | 'CRITICAL';
}

@WebSocketGateway({
  cors: {
    origin: '*', // Em dev permitimos tudo, em prod seria origin do maestro-frontend
  },
  namespace: 'kitchen',
})
export class KitchenGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(KitchenGateway.name);

  // Mock de estado inicial
  private activeOrders: KitchenOrder[] = [
    {
      id: 'K-001',
      items: ['1x Smash Clássico', '1x Fritas'],
      status: 'PREPARING',
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      urgencyLevel: 'NORMAL',
    },
    {
      id: 'K-002',
      items: ['3x Wagyu Supreme Trufado (Flash Sale)'],
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      urgencyLevel: 'HIGH',
    },
  ];

  handleConnection(client: Socket) {
    this.logger.log(`KDS Conectado: ${client.id}`);
    // Envia estado inicial ao conectar
    client.emit('sync_orders', this.activeOrders);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`KDS Desconectado: ${client.id}`);
  }

  @SubscribeMessage('update_status')
  handleUpdateStatus(client: Socket, payload: { id: string; status: 'PREPARING' | 'READY' | 'DELIVERING' | 'COMPLETED' }) {
    this.logger.log(`Update Order ${payload.id} -> ${payload.status}`);
    
    this.activeOrders = this.activeOrders.map((order) =>
      order.id === payload.id ? { ...order, status: payload.status } : order
    );

    // Broadcast para todos os tablets KDS e Mobiles dos Garçons conectados
    this.server.emit('sync_orders', this.activeOrders);
  }

  @SubscribeMessage('claim_order')
  handleClaimOrder(client: Socket, payload: { id: string }) {
    this.logger.log(`Garçom reclamou a entrega do pedido: ${payload.id}`);
    this.handleUpdateStatus(client, { id: payload.id, status: 'DELIVERING' });
  }

  @SubscribeMessage('complete_order')
  handleCompleteOrder(client: Socket, payload: { id: string }) {
    this.logger.log(`Pedido Entregue e finalizado: ${payload.id}`);
    this.handleUpdateStatus(client, { id: payload.id, status: 'COMPLETED' });
    
    // Aqui hipoteticamente dispararia um webhook para n8n -> WhatsApp (Pesquisa NPS para cliente)
  }

  // Método para simular a chegada de um novo pedido externo (Supabase/Webhook)
  simulateIncomingOrder(order: KitchenOrder) {
    this.activeOrders.push(order);
    this.server.emit('new_order', order);
    this.server.emit('sync_orders', this.activeOrders);
  }
}
