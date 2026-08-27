![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-GAS-blue)
![AppSheet](https://img.shields.io/badge/AppSheet-Integration-green)
![Status](https://img.shields.io/badge/Status-Production-success)
![License](https://img.shields.io/badge/License-MIT-blue)

# Financial Webhook Automation

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-GAS-blue)![AppSheet](https://img.shields.io/badge/AppSheet-Integration-green)![Status](https://img.shields.io/badge/Status-Production-success)
[License](https://img.shields.io/badge/License-MIT-blue)

> Automação de notificações financeiras utilizando **Google Apps Script (GAS)**, **AppSheet** e **Google Sheets**.

---

## Objetivo / O Problema e a Solução

Eliminar notificações manuais e garantir que toda nova nota lançada seja comunicada automaticamente ao escritório responsável. Este projeto foi desenvolvido para automatizar o fluxo de comunicação entre diferentes empresas de uma mesma franqueadora e o escritório responsável pelo setor financeiro.
Projeto baseado em uma solução real atualmente utilizada em ambiente de produção.

---

## 🛠 Tecnologias

- Google Apps Script (GAS)
- JavaScript (ES6)
- AppSheet
- Google Sheets
- Gmail (MailApp)
- Webhooks

---

## 🏗 Arquitetura

```text
                 AppSheet Automation
                        │
                        │ HTTP POST
                        ▼
            Google Apps Script (Webhook)
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   Validação JSON   Controle Cache   Identificação da empresa
        │               │                │
        └───────────────┼────────────────┘
                        ▼
             Geração dinâmica do link
                        │
                        ▼
             Envio de e-mail (Gmail)
                        │
                        ▼
                Equipe Financeira
```

## Fluxo

Usuário cadastra uma nova nota no AppSheet.
A Automation do AppSheet dispara um Webhook.
O Google Apps Script recebe a requisição HTTP POST.
Os dados são validados (Validação JSON).
O sistema verifica se o evento já foi processado (Controle Cache).
A empresa de origem é identificada.
O link correto de redirecionamento para o AppSheet é montado.
Um e-mail é enviado automaticamente para a equipe financeira com os dados da nota.

## Funcionalidades

Recebimento de Webhooks: Endpoint HTTP customizado.
Validação de Payload: Checagem e segurança na entrada de dados JSON.
Prevenção de Duplicidade: Controle de eventos duplicados utilizando CacheService.
Roteamento Dinâmico: Identificação e roteamento baseado na empresa emissora.
Automação de E-mails: Envio de e-mails em formato HTML via MailApp.
Integração Fluida: Construção dinâmica de links para acesso rápido no AppSheet.

## Como Usar

Pré-requisitos
Conta Google e acesso ao Google Apps Script.
Acesso de editor ao AppSheet.
Instalação e Execução
Crie um script novo no GAS e cole o código do webhook.js.
Faça o deploy (Implantação) como um Aplicativo da Web e copie a URL pública gerada.
No AppSheet, vá até Automations, crie um Call a webhook, defina como POST, insira a URL copiada do GAS e o Payload em formato JSON.

## Conceitos Aplicados

Webhooks e Integração entre sistemas
Idempotência (Prevenção de duplicidade)
Automação de processos (RPA na Nuvem)
Regras de negócio e Roteamento
APIs HTTP (Requisição e Resposta JSON)
Validação de entrada e Tratamento de exceções

## Estrutura do Projeto

```
Webhook Entrypoint
│
▼
doPost()
├── 1. Parse JSON
├── 2. Validation
├── 3. Duplicate Check
├── 4. Business Rules
├── 5. Store Routing
├── 6. Build URL
└── 7. Send Email
```

## Resultado

A solução automatizou o processo de comunicação entre o AppSheet e o setor financeiro. Atualmente encontra-se em produção atendendo 8 empresas diferentes pertencentes à mesma franqueadora, enviando notificações automaticamente para o escritório responsável sempre que uma nova nota é registrada.

Possíveis Melhorias
Autenticação avançada do Webhook e Assinatura HMAC.
Logs estruturados e Dashboard de monitoramento.
Retry automático em caso de falha de envio.
Integração com mensageria corporativa (Slack ou Discord).
Persistência dos eventos (Banco de Dados).
Licença
Projeto publicado apenas para fins educacionais e de demonstração de arquitetura sob licença MIT. Informações confidenciais da solução original foram removidas ou substituídas por dados fictícios.
