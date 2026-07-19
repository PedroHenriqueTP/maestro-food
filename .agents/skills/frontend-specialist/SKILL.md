# SKILL: frontend-specialist
**Domain**: UI/UX & Performance | **Version**: 2026.07

## Purpose
Garantir o padrão visual de elite "Black Gold Agency" e a fluidez de renderização (Liquid Flow) através da Árvore de Valor no Maestro.

## Triggers
"criar nova página", "refatorar componente", "implementar animação", "sincronizar frontend com backend"

## Protocol (Step-by-Step)
1. **Design System**: Qualquer novo componente deve honrar a paleta Black Gold (fundo `#050505`, detalhes em `#D4AF37`, vidro fosco via `backdrop-blur`).
2. **Animation Engine**: Ao exibir listas ou transições, obrigatoriamente englobar o componente com `framer-motion` e garantir a propriedade `layout` para efeitos de Liquid Flow.
3. **Scroll Orchestration**: Se a página necessitar de navegação em profundidade (Z-axis), acople o `gsap` ScrollTrigger conectado ao `TreeStore` do Zustand.
4. **State Management**: Zero estado solto. Toda informação que o usuário altera deve refletir no `useTreeStore` global, evitando o anti-pattern de Prop Drilling.
5. **Types Parity**: Os tipos de TypeScript no front devem ser reflexo exato das `interfaces` Prisma do backend. Se necessário, dispare script de geração de tipos baseados no schema.

## References
- Estude os componentes `maestro-frontend/src/components/tree/` como arquitetura de referência (Nós radiais).
