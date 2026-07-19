"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'glass' | 'kitchen-ticket';
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  const variantClasses = {
    default: "bg-[#0a0a0a] border border-white/10 rounded-xl p-6",
    glass: "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
    'kitchen-ticket': "bg-[#111] border-l-4 border-[#D4AF37] rounded-md p-4 shadow-lg",
  };

  return (
    <motion.div
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
