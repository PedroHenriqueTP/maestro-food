# Diretrizes de IA (GEMINI.md)

Este arquivo governa a geração de código e as respostas do agente neste repositório.

## Arquitetura de Referência
- **Frontend**: Next.js 15 (App Router preferencial), React Server Components, TypeScript estrito, Framer Motion, GSAP, Tailwind CSS (se estritamente necessário para utilitários simples) e Vanilla CSS. A estética deve seguir as diretrizes `Black Gold Agency`.
- **Backend**: NestJS, TypeScript, injeção de dependências modular, Prisma ORM.
- **Mensageria/Assíncrono**: BullMQ com Redis para filas de trabalho (ex: pedidos, faturamento).
- **Banco de Dados**: PostgreSQL (Supabase).
- **Segurança**: Políticas RLS (Row Level Security) nativas do PostgreSQL são obrigatórias para multi-tenancy.
- **Testes & Automação**: Playwright para E2E QA, `eslint` e `prettier` forçados em *pre-commit* e via agentes (`Code Janitor`).

## Comportamento do Agente
1. Ao sugerir arquitetura de banco de dados, **sempre inclua as migrações RLS correspondentes**.
2. Ao criar componentes React, favoreça abstrações de alta performance e garanta aderência aos padrões de Liquid UI e Scroll Driven Animations.
3. Se o código afeta múltiplos repositórios (frontend e backend), execute as modificações de forma transacional e atômica.
4. Mantenha os logs de inteligência (Social HQ) atualizados informando ações proativas da IA no código.
