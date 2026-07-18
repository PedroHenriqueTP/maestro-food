# API Contracts (v1.0) - Enterprise Core

## 1. Visão Geral
Este documento descreve os principais contratos de integração REST/JSON para os módulos de SaaS do Maestro.

## 2. Padrões Globais
- **Base URL**: `/api/v1`
- **Autenticação**: Bearer Token (JWT) e validação de `tenantId` baseada no token (Multi-tenant).
- **Formatos**: Requisições e Respostas sempre em `application/json`.
- **Paginação**: Endpoints de listagem usam query params `?page=1&limit=50`.

## 3. Endpoints de CRM (Clientes)

### 3.1. Criar Cliente
- **Endpoint**: `POST /crm/customers`
- **Request Body**:
```json
{
  "name": "Acme Corp",
  "document": "12.345.678/0001-90",
  "email": "contato@acme.com",
  "phone": "+5511999999999"
}
```
- **Response**: `201 Created`

### 3.2. Listar Clientes
- **Endpoint**: `GET /crm/customers`
- **Response**: `200 OK` (Array of Customers + Pagination Meta)

## 4. Endpoints Financeiros (Ledger)

### 4.1. Registrar Transação Financeira
- **Endpoint**: `POST /finance/ledger/transaction`
- **Request Body**:
```json
{
  "description": "Pagamento de Serviço",
  "date": "2026-07-18T10:00:00Z",
  "entries": [
    {
      "accountId": "uuid-caixa-geral",
      "type": "DEBIT",
      "amount": 150000 
    },
    {
      "accountId": "uuid-receita-servicos",
      "type": "CREDIT",
      "amount": 150000 
    }
  ],
  "metadata": {
    "invoiceId": "INV-102"
  }
}
```
> Nota: O valor de 150000 equivale a R$ 1.500,00 (armazenado em centavos para evitar quebra de precisão).

### 4.2. Consultar Saldo da Conta
- **Endpoint**: `GET /finance/ledger/account/{accountId}/balance`
- **Response**:
```json
{
  "accountId": "uuid-caixa-geral",
  "balance": 250000,
  "currency": "BRL"
}
```
