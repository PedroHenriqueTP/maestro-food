# Maestro Food - Design System Tokens (Hermes Agent)

Este documento define a fundação visual do projeto Maestro Food. Qualquer agente desenvolvendo interfaces (incluindo o TechLead e o Frontend Specialist) deve obedecer estritamente a estas diretrizes de CSS/Tailwind.

## Paleta de Cores (The Black Gold Concept)

A paleta é focada em altíssimo contraste para ambientes com pouca iluminação (cozinha/salão) e requinte (cliente final).

| Nome | Variável CSS | Classe Tailwind Sugerida | Hex Code | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Onyx Black** | `--color-onyx` | `bg-[#050505]` | `#050505` | Background Principal |
| **Matte Black** | `--color-matte` | `bg-[#0a0a0a]` | `#0a0a0a` | Background de Cards e Sidebars |
| **Maestro Gold** | `--color-gold-500` | `text-[#D4AF37]` | `#D4AF37` | Primária, Call to Actions, H1 |
| **Muted Gold** | `--color-gold-600` | `text-[#aa8c2c]` | `#aa8c2c` | Hover States (Primária) |
| **Light Gold** | `--color-gold-400` | `text-[#f1e5ac]` | `#f1e5ac` | Textos em destaque sobre fundos pretos |
| **White Glass** | N/A | `bg-white/5` | `rgba(255,255,255,0.05)` | Fundo para Glassmorphism |

## Tipografia (The Elegance)

- **Headings (Cinzel):** Utilizada exclusivamente para títulos principais, logos e comunicações premium de brand.
  - `font-family: 'Cinzel', serif;`
- **Corpo (Inter):** Utilizada para todo o texto funcional, leitura rápida de cozinha e parágrafos do marketplace.
  - `font-family: 'Inter', sans-serif;`

## Física e Animação (Liquid Flow - Framer Motion)

Todas as animações de interface devem parecer orgânicas e responsivas ao toque humano. 
Utilizamos parâmetros padronizados de *spring* no Framer Motion:

```javascript
// Padrão de Hover (Botões e Cards Interativos)
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

// Inserção em Lista (Carrinho, Notificações)
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, scale: 0.8 }}
layout // Para realocamento suave de elementos irmãos
```

## Acessibilidade (Hermes AAA)
- Todo texto que sobrepor fundo Onyx Black (`#050505`) deve possuir no mínimo opacidade de 70% (`text-gray-300`) para leitura fluída, ou 100% (`text-white`) para leitura obrigatória.
- É estritamente proibido o uso de botões sem focus state aparente. Use `focus:ring-2 focus:ring-[#D4AF37]`.
