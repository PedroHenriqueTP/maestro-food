"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Simula a interceptação Axios para 401 Unauthorized
      await axios.post("/api/v1/auth/login", { email, password });
      setSuccess(true);
    } catch (err: any) {
      // Forçando o erro 401 para teste de dopamina do usuário
      setError("401 Unauthorized - O token é inválido ou está ausente.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="neon-glow flex w-full max-w-md flex-col items-center justify-center rounded-xl border border-emerald-500/50 bg-black/80 p-8 shadow-lg backdrop-blur-sm">
        <h1 className="neon-text mb-6 text-4xl font-bold tracking-wider text-emerald-400">
          MAESTRO
        </h1>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded bg-gray-900 px-4 py-2 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="admin@maestro.com"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded bg-gray-900 px-4 py-2 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="neon-glow mt-4 w-full rounded bg-emerald-500 px-4 py-2 font-bold text-black transition-all hover:bg-emerald-400"
          >
            ENTRAR
          </button>
        </form>

        {error && (
          <div className="mt-6 w-full rounded border border-red-500 bg-red-900/30 p-4 text-center text-red-400">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mt-6 w-full rounded border border-emerald-500 bg-emerald-900/30 p-4 text-center text-emerald-400">
            Login simulado com sucesso!
          </div>
        )}
      </div>
    </div>
  );
}
