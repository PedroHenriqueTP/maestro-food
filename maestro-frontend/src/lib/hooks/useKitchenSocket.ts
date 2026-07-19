"use client";

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface KitchenOrder {
  id: string;
  items: string[];
  status: 'PENDING' | 'PREPARING' | 'READY';
  createdAt: string;
  urgencyLevel: 'NORMAL' | 'HIGH' | 'CRITICAL';
}

export function useKitchenSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Em produção, esta URL viria do process.env
    const socketInstance = io('http://localhost:3001/kitchen', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('✅ KDS WebSockets Conectado');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ KDS WebSockets Desconectado');
    });

    socketInstance.on('sync_orders', (data: KitchenOrder[]) => {
      setOrders(data);
    });

    socketInstance.on('new_order', (order: KitchenOrder) => {
      // Toca um som de alerta para novo pedido (se o browser permitir)
      try {
        const audio = new Audio('/alert.mp3');
        audio.play().catch(() => {});
      } catch (e) {}
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const updateOrderStatus = (id: string, status: 'PREPARING' | 'READY') => {
    // Optimistic UI Update
    setOrders((prev) => 
      prev.map(o => o.id === id ? { ...o, status } : o)
    );
    
    if (socket) {
      socket.emit('update_status', { id, status });
    }
  };

  return {
    orders,
    isConnected,
    updateOrderStatus
  };
}
