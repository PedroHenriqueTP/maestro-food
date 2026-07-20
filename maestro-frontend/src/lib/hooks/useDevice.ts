import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'kiosk';

export function useDevice() {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsPortrait(height > width);

      // Simple heuristic for detection
      if (width < 768) {
        setDevice('mobile');
      } else if (width >= 768 && width < 1024) {
        setDevice('tablet');
      } else if (width >= 1024 && width > height * 1.5) {
        // Ultrawide or specific aspect ratio could mean Kiosk, but we'll assume desktop for >= 1024
        setDevice('desktop');
      } else {
        setDevice('desktop');
      }

      // If user agent has "Kiosk" or custom flag we could override:
      if (typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('kiosk')) {
        setDevice('kiosk');
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { device, isPortrait, isMobile: device === 'mobile', isTablet: device === 'tablet', isDesktop: device === 'desktop', isKiosk: device === 'kiosk' };
}
