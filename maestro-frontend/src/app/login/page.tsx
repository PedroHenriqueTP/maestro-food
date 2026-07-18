"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Free Access Bypassed (Simulando request)
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="fineline-border premium-glow z-10 flex w-full max-w-md flex-col items-center justify-center bg-black/60 p-10 backdrop-blur-md">
        
        <div className="mb-8 flex flex-col items-center">
          <Image 
            src="/maestro_logo.png" 
            alt="Maestro Logo" 
            width={80} 
            height={80} 
            className="mb-4 opacity-90 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          />
          <h1 className="premium-text text-3xl font-light tracking-[0.2em] uppercase">
            MAESTRO
          </h1>
          <p className="mt-2 text-xs font-light tracking-[0.3em] text-[#aa8c2c] uppercase">
            Gestão Premium
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex w-full flex-col gap-8">
          <div className="flex flex-col">
            <label className="mb-2 text-[10px] uppercase tracking-widest text-[#aa8c2c]">Identificação (Free Access)</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="fineline-input px-2 py-2 text-sm text-[#f1e5ac]"
              placeholder="Acesso Livre Ativado"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full border border-[#d4af37] bg-transparent px-4 py-3 text-sm tracking-[0.2em] text-[#f1e5ac] uppercase transition-all duration-500 hover:bg-[#d4af37]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] disabled:opacity-50"
          >
            {loading ? "Autenticando..." : "Acessar Sistema"}
          </button>
        </form>
      </div>
    </div>
  );
}
