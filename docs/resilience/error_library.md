# Error Knowledge Base (Biblioteca de Auto-Cura)

> **Agent Sentinel**: Guardião da estabilidade do Maestro.
> Este registro compila a "Memória de Longo Prazo" do sistema, mapeando falhas críticas e suas resoluções estruturais para acelerar o tempo de recuperação (MTTR) em sprints futuras.

## Registros de Falhas (Error Library)

| ID | Padrão do Erro (Stack Trace/Sintoma) | Causa Raiz | Resolução Aplicada (Patch) | Data de Inserção |
| :--- | :--- | :--- | :--- | :--- |
| **ERR-001** | `verbatimModuleSyntax` / `Cannot use import statement outside a module` | Conflito de resolução de tipo de módulo (CJS vs ESM) no compilador do NestJS. | Ajuste no `tsconfig.json` (desativar verbatim e focar em `NodeNext`) e `package.json`. | 2026-07-19 |
| **ERR-002** | `PrismaClient` falha de validação ou não exportado | A versão do CLI do Prisma incompatível (7.x exige `prisma.config.ts`, deprecando a propriedade `url` em `schema.prisma`). | Downgrade cirúrgico para a versão `5.x` em todo o backend. | 2026-07-19 |
| **ERR-003** | Testes E2E (Jest) falhando com `Environment variable not found: DATABASE_URL` | Prisma tenta levantar conexão no ambiente de testes sem o arquivo `.env` injetado na runtime do CI/CD. | Mock local no `PrismaService` (`mockPrismaService`) na suíte de testes `app.e2e-spec.ts`. | 2026-07-19 |

---

## 🛠️ Diretrizes de Operação (Agent Librarian)
1. **Identificação:** Se o erro bater na tela (ex: terminal travou), procure na tabela acima antes de propor refatoração.
2. **Registro:** Se for um erro inédito, isole a causa raiz, consolide a correção (patch) e adicione uma nova linha à tabela.
