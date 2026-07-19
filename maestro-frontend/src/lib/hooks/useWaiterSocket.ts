"use client";

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { KitchenOrder } from './useKitchenSocket';

export function useWaiterSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Mesma URL do gateway, mas filtraremos o uso no front
    const socketInstance = io('http://localhost:3001/kitchen', {
      transports: ['websocket'],
      reconnectionAttempts: 10, // Garçom se move muito, mais tentativas
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Waiter WebSockets Conectado');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Waiter WebSockets Desconectado');
    });

    socketInstance.on('sync_orders', (data: KitchenOrder[]) => {
      setOrders(data);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const claimOrder = (id: string) => {
    // Optimistic UI
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: 'DELIVERING' } : o));
    socket?.emit('claim_order', { id });
  };

  const completeOrder = (id: string) => {
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: 'COMPLETED' } : o));
    socket?.emit('complete_order', { id });
  };

  return {
    orders,
    isConnected,
    claimOrder,
    completeOrder
  };
}
