import React from 'react';
import { AdminLayout as Shell } from '@/components/layout/AdminLayout';

export default function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Shell>
      {children}
    </Shell>
  );
}
