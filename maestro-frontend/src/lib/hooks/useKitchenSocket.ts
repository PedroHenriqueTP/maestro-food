"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export interface KitchenOrder {
  id: string;
  items: string[];
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERING' | 'COMPLETED';
  createdAt: string;
  urgencyLevel: 'NORMAL' | 'HIGH' | 'CRITICAL';
}

export function useKitchenSocket() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Fetch initial state
    const fetchOrders = async () => {
      // Como não temos a DB configurada, vamos usar Mocks e focar na conexão do channel
      setOrders([
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
      ]);
    };

    fetchOrders();

    // 2. Subscribe to Supabase Realtime
    const channel = supabase
      .channel(`tenant:${tenantId}:orders`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders', filter: `tenant_id=eq.${tenantId}` },
        (payload) => {
          console.log('Realtime Order Change:', payload);
          // Em um DB real, atualizaríamos o estado aqui
          // setOrders(prev => ... )
          
          if (payload.eventType === 'INSERT') {
            try {
              const audio = new Audio('/alert.mp3');
              audio.play().catch(() => {});
            } catch (e) {}
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          console.log('✅ Supabase KDS Realtime Conectado');
        } else {
          setIsConnected(false);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateOrderStatus = async (id: string, status: 'PREPARING' | 'READY') => {
    // Optimistic UI Update
    setOrders((prev) => 
      prev.map(o => o.id === id ? { ...o, status } : o)
    );
    
    // Fallback Mock: Se fosse real fariamos:
    // await supabase.from('orders').update({ status }).eq('id', id);
    console.log(`[Supabase Mock] Order ${id} updated to ${status}`);
  };

  return {
    orders,
    isConnected,
    updateOrderStatus
  };
}
