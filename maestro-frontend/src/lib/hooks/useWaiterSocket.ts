"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { KitchenOrder } from './useKitchenSocket';

export function useWaiterSocket() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Fetch initial state
    const fetchOrders = async () => {
      // Usando Mocks em vez do BD real por enquanto
      setOrders([]);
    };

    fetchOrders();

    // 2. Subscribe to Supabase Realtime (Filtrando apenas READY e DELIVERING se fosse no BD real)
    const channel = supabase
      .channel('public:orders:waiter')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders', filter: 'status=in.(READY,DELIVERING)' },
        (payload) => {
          console.log('Realtime Waiter Change:', payload);
          // Em um DB real, atualizaríamos o estado aqui
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          console.log('✅ Supabase Waiter Realtime Conectado');
        } else {
          setIsConnected(false);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const claimOrder = async (id: string) => {
    // Optimistic UI
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: 'DELIVERING' } : o));
    
    // Supabase DB Call
    // await supabase.from('orders').update({ status: 'DELIVERING' }).eq('id', id);
    console.log(`[Supabase Mock] Order ${id} claimed by Waiter`);
  };

  const completeOrder = async (id: string) => {
    // Optimistic UI
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: 'COMPLETED' } : o));
    
    // Supabase DB Call
    // await supabase.from('orders').update({ status: 'COMPLETED' }).eq('id', id);
    console.log(`[Supabase Mock] Order ${id} completed by Waiter`);
  };

  return {
    orders,
    isConnected,
    claimOrder,
    completeOrder
  };
}
