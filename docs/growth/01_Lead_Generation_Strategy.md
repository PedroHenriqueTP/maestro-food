# 01 - Lead Generation Strategy (Growth-Bot)

## 📌 Visão Geral
Este documento estabelece as diretrizes de operação para os agentes autônomos de Inteligência de Mercado (Growth-Bot). O objetivo é garantir que a prospecção de novos restaurantes e estabelecimentos de *Food Service* ocorra de forma contínua, ética e qualificada, integrando-se perfeitamente ao nosso CRM.

## 🤖 Arquitetura de Agentes

### 1. Agent Scout (WebScraping)
- **Função:** Patrulhar as fronteiras digitais e extrair dados primários de negócios.
- **Fontes de Dados (Alvos):**
  - Diretórios Empresariais (Yelp, Foursquare).
  - Google Maps API (Places).
  - Web scraping passivo de agregadores públicos de Food Service.
- **Limites Éticos e Técnicos:**
  - Respeito absoluto ao `robots.txt`.
  - Backoff exponencial de `Rate Limiting` (mínimo de 3 segundos entre requisições ao mesmo domínio).
  - *Fingerprint* rotativo para evitar detecção como tráfego malicioso (quando aplicável).
- **Dados Alvo:** Nome, Endereço, Categoria, Telefone/WhatsApp, Presença Digital (Site/Instagram).

### 2. Agent CRM-Sync
- **Função:** Absorver os dados do *Scout*, higienizar, deduzir conflitos e persistir no Prisma.
- **Higienização:**
  - Padronização de telefones (E.164 / +55).
  - Normalização de categorias (ex: "Lancheria", "Burgers" -> "Fast-Food").
- **Upsert:** Ignorar ou mesclar registros para evitar duplicidade de CNPJ/Telefone.

### 3. Agent Quality-Control (Lead Scoring)
- **Função:** Pontuar o lead para orientar a equipe de vendas.
- **Matriz de Score (0 a 100):**
  - Tem WhatsApp detectado? (+30 pts)
  - É de uma categoria "Core" do Maestro (Burger, Pizza, Sushi)? (+20 pts)
  - Tem site próprio/app (indica maturidade técnica)? (+25 pts)
  - Tem alta densidade de avaliações online? (+25 pts)
- **Gatekeeper:** O disparo de abordagem via WhatsApp **só ocorre** após aprovação humana no Painel de Controle (Fila "Aguardando Aprovação").

## 🚀 Fluxo de Ativação (Payload)
A esteira de growth pode ser engatilhada a qualquer momento enviando um webhook (MCP Payload) para o endpoint `/growth/webhook`.
