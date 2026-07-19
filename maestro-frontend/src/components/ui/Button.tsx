"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'kitchen-alert';
  size?: 'sm' | 'md' | 'lg' | 'massive';
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050505] disabled:opacity-50 disabled:pointer-events-none rounded-md";
  
  const variantClasses = {
    primary: "bg-[#D4AF37] text-black hover:bg-[#aa8c2c] focus:ring-[#D4AF37]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 focus:ring-white",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
    'kitchen-alert': "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 uppercase tracking-widest",
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base",
    massive: "h-20 px-12 text-2xl w-full",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
