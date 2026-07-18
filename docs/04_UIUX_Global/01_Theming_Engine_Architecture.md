# Theming Engine Architecture (UI/UX Global)

## 1. Visão Estratégica: O Poder do White Label
Como o Projeto Maestro é agora um SaaS de nível global, permitir que o usuário final customize a identidade visual de seu sistema é crucial para engajamento e percepção de valor corporativo.

O **Theming Engine** é a abstração que permitirá injetar preferências visuais dinâmicas em toda a plataforma.

## 2. Estrutura do Banco de Dados (TenantUI)
Uma tabela/schema associada ao cliente guardará as propriedades de design:
```json
{
  "tenantId": "uuid",
  "themeMode": "system" | "light" | "dark",
  "colors": {
    "primary": "#4F46E5",
    "secondary": "#10B981",
    "background": "#F3F4F6",
    "text": "#111827"
  },
  "typography": {
    "fontFamily": "Inter, sans-serif"
  },
  "logoUrl": "https://storage.provider/logo.png"
}
```

## 3. Arquitetura de Implementação (Next.js)

### 3.1. O Provedor de Tema (ThemeContext)
Um componente no `app/layout.tsx` que vai envolver a aplicação. Em Server Components, buscaremos os dados do Tenant antes da renderização e repassaremos ao contexto.

### 3.2. Injeção de CSS Variables
Para que o design se altere em tempo real (e seja compatível com sistemas modernos de CSS ou Tailwind), usaremos propriedades personalizadas do CSS inseridas inline na tag raiz ou no escopo do layout do tenant:

```tsx
// Exemplo conceitual do Wrapper
export function TenantThemeProvider({ children, tenantUI }) {
  const cssVariables = {
    '--color-primary': tenantUI.colors.primary,
    '--color-secondary': tenantUI.colors.secondary,
    '--font-main': tenantUI.typography.fontFamily,
  } as React.CSSProperties;

  return (
    <div style={cssVariables} className={`theme-${tenantUI.themeMode}`}>
      {children}
    </div>
  );
}
```

### 3.3. Painel de Customização
Haverá uma interface de Administração onde o sócio/cliente escolhe a cor utilizando um color picker e altera a logo, pré-visualizando as mudanças no *dashboard* instantaneamente, confirmando e salvando a configuração no backend.
