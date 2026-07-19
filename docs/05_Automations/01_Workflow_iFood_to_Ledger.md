# Blueprint Executável: Fluxo de Pedido Autônomo

Para evitar o "espaguete de automações", este diagrama orienta a construção dos nós no **n8n**. Ele descreve o ciclo de vida completo de um pedido externo (iFood) sendo processado pelo Maestro.

```mermaid
graph TD
    %% Entradas
    iFood(iFood Webhook) -->|Payload do Pedido| n8n_Webhook
    WhatsApp(WhatsApp Webhook) -->|Pedido via Chat| n8n_Webhook

    %% n8n Orchestration
    subgraph Orquestração n8n
        n8n_Webhook(Catch Webhook) --> Normalize[Normalizar Dados do Pedido]
        Normalize --> API_Core(Disparar API do Maestro Core)
        
        API_Core --> Await_Core{Processado com Sucesso?}
        Await_Core -->|Sim| AI_Analysis(Enviar p/ Análise Preditiva)
        Await_Core -->|Não| Error_Alert(Alerta de Erro no Discord/WhatsApp)
        
        AI_Analysis --> Stock_Check{Estoque Baixo?}
        Stock_Check -->|Sim - Ex: Bacon| Warn_Purchase(Acionar Alerta de Compra)
        Stock_Check -->|Não| End_Workflow(Finalizar Workflow n8n)
    end

    %% Maestro Core
    subgraph Maestro Core (NestJS)
        API_Core -.->|REST POST| Controller(Order Controller)
        Controller --> Validate(Validar Tenant & Edge Token)
        Validate --> Ledger(Double-Entry Ledger)
        Ledger --> DB[(PostgreSQL)]
        Ledger --> WebSocket(Emitir Evento p/ KDS na Cozinha)
    end

    %% Integrações de Saída
    Warn_Purchase -->|WhatsApp API| Manager(Dono do Restaurante)
    WebSocket -->|Socket.io| KDS(Tela da Cozinha/Frontend)

    %% Estilos (Black Gold)
    classDef n8n fill:#D4AF37,stroke:#0B0C10,stroke-width:2px,color:#0B0C10,font-weight:bold;
    classDef core fill:#1A1A1A,stroke:#D4AF37,stroke-width:1px,color:#fff;
    classDef external fill:#0B0C10,stroke:#555,stroke-dasharray: 5 5,color:#ccc;
    
    class n8n_Webhook,Normalize,API_Core,Await_Core,AI_Analysis,Stock_Check,Warn_Purchase,End_Workflow,Error_Alert n8n;
    class Controller,Validate,Ledger,DB,WebSocket core;
    class iFood,WhatsApp,Manager,KDS external;
```

## Diretrizes de Implementação no n8n
1. **Credenciais**: Utilizaremos o módulo interno de credenciais do n8n (criptografado) para a API Key do NestJS e a Secret do WhatsApp.
2. **Resiliência**: O nó `Disparar API do Maestro Core` terá configuração de Retry (3 tentativas, backoff exponencial).
3. **Analytics**: Cada etapa de erro fará push para um nó de observabilidade.
