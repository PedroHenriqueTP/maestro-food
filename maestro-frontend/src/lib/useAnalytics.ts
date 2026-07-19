"use client";
import { useEffect, useCallback } from 'react';

export const useAnalytics = (pageName: string) => {
  // Simula o registro de um evento de Neuromarketing no Console (Futuro Webhook n8n/PostHog)
  const trackEvent = useCallback((eventName: string, metadata: any = {}) => {
    console.log(`[Neuromarketing Agent] ${eventName} | Page: ${pageName}`, metadata);
  }, [pageName]);

  useEffect(() => {
    trackEvent('page_view', { timestamp: new Date().toISOString() });

    // Rastreador de Abandono de Funil (Mouse leaving viewport top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        trackEvent('cart_abandonment_intent', { 
          risk: 'HIGH',
          reason: 'Mouse exited top boundary (exit intent)' 
        });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pageName, trackEvent]);

  return { trackEvent };
};
