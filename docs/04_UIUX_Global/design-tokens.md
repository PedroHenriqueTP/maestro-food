# Design System & User Journey Wireframe - Maestro OS (B2B)

## 1. User Journey (B2B Restaurante)
1. **Descoberta:** Entra na Landing Page (Homepage) > Vê impacto visual (Dark mode luxuoso) > Entende os benefícios operacionais (Automação, RLS, Insights).
2. **Engajamento:** Interage com as demonstrações visuais das features (Gráficos ao vivo, KDS mock) > Sente a "dor" sendo resolvida (Ex: "Menos tempo fechando caixa, mais tempo crescendo").
3. **Conversão (Pré-venda):** Clica em "Solicitar Acesso" ou "Login Executivo" > Redirecionado para `/login`.
4. **Onboarding:** Primeiro acesso via AuthProvider > Workspace Vazio bem desenhado (Empty States bonitos).
5. **Operação:** Navegação via Sidebar global (AdminLayout) > Uso de CustomerTable, Growth Engine e Analytics.

## 2. Wireframe Textual (Homepage B2B)
- **Header:** Logo dourado Maestro. Links: Soluções, Intelligence, Cases. CTA primário: "Login Executivo".
- **Hero Section:** Título Forte ("O Sistema Operacional Definitivo para Food Service"). Subtítulo focado em controle e IA. Fundo acrílico com glow dourado.
- **Features Grid (Bento Box):** Exposição das capacidades do backend:
  - Card 1: "Real-time Operations" (Websockets/KDS)
  - Card 2: "Security & Tenants" (JWT + RLS Supabase)
  - Card 3: "AI Agents" (Pitbull & N8n integração)
- **Footer:** Links de conformidade e institucional.

## 3. Design Tokens Globais (Pitbull Edition)
- **Cores Primárias:**
  - Background: `#050505` (Deep Black)
  - Surface: `#0B0C10` (Charcoal) e `#14151A` (Elevation 1)
  - Brand (Accent): `#D4AF37` (Maestro Gold)
  - Warning/Destructive: `#ef4444`
  - Success: `#25D366`
- **Tipografia:**
  - Fontes baseadas em `Geist` e `Geist Mono` para números/códigos.
  - Tracking (letter-spacing) amplo para headers.
- **Borders & Shadows:**
  - Borders: `border-white/5` ou `border-white/10` para divisões sutis.
  - Shadows: `shadow-[0_0_20px_rgba(212,175,55,0.15)]` para botões primários. Glow suave.
- **Efeitos:**
  - `backdrop-blur-xl` e `backdrop-blur-2xl` para glassmorphism.
  - Micro-animações no hover (`transition-all duration-300`).

## 4. Estrutura de Pastas Recomendada (UI/UX)
```text
maestro-frontend/src/
├── components/
│   ├── ui/               # Componentes burros (shadcn, botões, inputs)
│   ├── layout/           # AdminLayout, PublicLayout, Sidebar, Navbar
│   ├── crm/              # CustomerTable, LeadCard
│   ├── dashboard/        # Gráficos, KPIs, Widgets
│   └── marketing/        # Componentes da Landing Page B2B
```
