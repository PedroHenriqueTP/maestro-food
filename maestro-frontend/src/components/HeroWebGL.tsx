"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function CyberNodes(props: any) {
  const ref = useRef<any>();
  // Cria 3000 pontos aleatórios numa esfera
  const sphere = random.inSphere(new Float32Array(3000), { radius: 1.5 }) as Float32Array;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#D4AF37" // Emerald Green e Gold vibe
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function HeroWebGL() {
  return (
    <div className="absolute inset-0 w-full h-[60vh] -z-10 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <CyberNodes />
      </Canvas>
    </div>
  );
}
