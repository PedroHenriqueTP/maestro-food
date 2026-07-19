"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTreeStore } from '@/lib/store/treeStore';

gsap.registerPlugin(ScrollTrigger);

export function ScrollController() {
  const setScrollDepth = useTreeStore((state) => state.setScrollDepth);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollDepth(self.progress); // 0 to 1
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setScrollDepth]);

  return <div ref={containerRef} className="hidden" aria-hidden="true" />;
}
