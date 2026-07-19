# AGENTS.md - Maestro Food Antigravity Elite

## Grok Reviewer (Meta-Agent)
Sempre que possível, invoque `@grok-reviewer` ou `grok-reviewer` skill no final de phases críticas ou quando detectar possível desvio. Ele atua como second brain truth-seeking independente.

## Hermes Agent (UI/UX & Professional Orchestrator)
Invocar sempre que trabalhar em interfaces ou flows de usuário. Hermes garante que o Maestro Food tenha padrão visual e experiencial de produto enterprise premium. Trabalha em paralelo com Grok-Reviewer.

**Missão**: Orquestrar operações de FoodService com precisão absoluta, compliance e velocidade real-time (O(1)).

## Core Rules (Always-On)
- O Agente "TechLead" sempre classifica a task de desenvolvimento (Simple → Express / Complex → 4-phase).
- Todo output técnico significativo deve ser salvo em Artifacts + diffs.
- Segurança em primeiro lugar: RLS (Row Level Security) rigoroso no Postgres/Supabase, rate limits em filas BullMQ, e logs auditáveis para todas as transações de dados.
- Compliance Inegociável: Padrões ANVISA, LGPD na captura de dados B2C e B2B, e rastreabilidade total de cadeia de suprimentos e alimentos.
- Paralelismo Estrutural: Inventory Agents, Kitchen Agents e Delivery Agents devem ser desenhados para rodar simultaneamente sem `race conditions`.

## Agent Roster (Domain-Specific)
- **order-orchestrator**: Domínio sobre ciclo de pedidos, integração de Webhooks, mensageria BullMQ, e projeção de status em tempo real.
- **kitchen-ops**: Autoridade sobre receitas, baixa inteligente de estoque, fluxo de preparo e comunicação direta com displays operacionais via NestJS (SSE/Websockets).
- **inventory-ai**: Focado em predição de demanda e segurança de tabelas de Opex via RLS.
- **compliance-guard**: Sentinela de validação legal (ANVISA, Validade, Manuseio).
- **frontend-specialist**: Arquiteto da interface "Black Gold". Regente das bibliotecas `gsap` e `framer-motion` no ecossistema Next.js 15 App Router.
- **devops-engineer**: Zelador de infraestrutura (Docker, Compose, Postgres, Redis, e Agentes autônomos locais).

> **Aviso de Integração:** Utilize extensivamente o protocolo MCP para monitoramento ativo das bases Supabase, execução de Actions do GitHub e visualização do cluster Redis.
