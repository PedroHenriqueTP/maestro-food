# Catálogo de Workflows n8n (Maestro Food)

Conforme a estratégia traçada por **Hermes (UX)** e balizada por **Grok (Intelligence)**, listamos abaixo os workflows autônomos que operam na borda (edge) do sistema para escalar a capacidade humana do restaurante.

## 1. Flash Sale Explosão (Prioridade Máxima)
- **Gatilho (Trigger):** Botão "Aprovar Execução" clicado no `Maestro Intelligence HQ` ou disparo autônomo baseado na demanda de mercado (via `useIntelligence.ts`).
- **Nó de Decisão:** Filtra a urgência e cruza com a disponibilidade de estoque via Supabase.
- **Nó de Ação:** 
  1. Atualiza a flag de promoção no banco de dados.
  2. Aciona a API do WhatsApp (Twilio/Wati) para avisar o gerente: *"🚨 Flash Sale Ativada! A demanda local subiu 42%. Fila na cozinha esperada."*

## 2. Recomendação Personalizada (Push Engine)
- **Gatilho:** Cron-job diário rodando na hora do almoço (11h) ou jantar (19h).
- **Inteligência:** Analisa o comportamento passado (clientes inativos há >14 dias).
- **Ação:** Dispara notificação PWA ou SMS: *"A IA notou que você faz tempo que não pede seu Wagyu. Toma 15% OFF."*

## 3. Alerta Competitivo (Market Observer)
- **Gatilho:** Webhook recebido dos scripts de Web Scrapping (The Hive).
- **Inteligência:** Se o concorrente X abaixar o preço, o n8n verifica a margem de lucro.
- **Ação:** Cria um Insight Card na UI do `Maestro Intelligence HQ` aguardando a decisão de um humano.

## 4. Kitchen Sync (Automação de Salão)
- **Gatilho:** Novo pedido via Supabase (Row inserted).
- **Ação:** Atualiza painel KDS (`/kitchen`) em realtime e dispara aviso sonoro/API no tablet dos cozinheiros caso seja um "Pedido Muito Grande".
