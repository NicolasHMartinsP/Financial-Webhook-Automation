# Financial Webhook Automation

Automação de notificações financeiras utilizando **Google Apps Script (GAS)**, **AppSheet** e **Google Sheets**.

Este projeto foi desenvolvido para automatizar o fluxo de comunicação entre diferentes empresas de uma mesma franqueadora e o escritório responsável pelo setor financeiro.

Sempre que uma nova nota é cadastrada através de uma Automation do AppSheet, um Webhook é enviado para um endpoint desenvolvido em Google Apps Script. O script valida a requisição, evita processamentos duplicados, identifica a empresa de origem e envia automaticamente uma notificação por e-mail para a equipe financeira.

> Projeto baseado em uma solução real atualmente utilizada em ambiente de produção.

---

# Objetivo

Eliminar notificações manuais e garantir que toda nova nota lançada seja comunicada automaticamente ao escritório responsável.

---

# Tecnologias

- Google Apps Script (GAS)
- JavaScript (ES6)
- AppSheet
- Google Sheets
- Gmail (MailApp)
- Webhooks

---

# Arquitetura

```
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

---

# Fluxo

1. Usuário cadastra uma nova nota no AppSheet.
2. A Automation dispara um Webhook.
3. O Google Apps Script recebe a requisição.
4. Os dados são validados.
5. O sistema verifica se o evento já foi processado.
6. A empresa é identificada.
7. O link correto do AppSheet é montado.
8. Um e-mail é enviado automaticamente para a equipe financeira.

---

# Funcionalidades

- Recebimento de Webhooks HTTP
- Validação de payload JSON
- Tratamento de erros
- Controle de eventos duplicados utilizando CacheService
- Roteamento dinâmico por empresa
- Construção dinâmica de links do AppSheet
- Envio automático de e-mails HTML
- Respostas HTTP em formato JSON

---

# Conceitos aplicados

- Webhooks
- Integração entre sistemas
- Idempotência
- Automação de processos
- Regras de negócio
- APIs HTTP
- Validação de entrada
- Tratamento de exceções

---

# Estrutura simplificada

```
Webhook
   │
   ▼
doPost()

├── Parse JSON
├── Validation
├── Duplicate Check
├── Business Rules
├── Store Routing
├── Build URL
└── Send Email
```

---

# Resultado

A solução automatizou o processo de comunicação entre o AppSheet e o setor financeiro.

Atualmente encontra-se em produção atendendo **8 empresas diferentes pertencentes à mesma franqueadora**, enviando notificações automaticamente para o escritório responsável sempre que uma nova nota é registrada.

---

# Possíveis melhorias

- Autenticação do Webhook
- Assinatura HMAC
- Logs estruturados
- Retry automático
- Dashboard de monitoramento
- Integração com Slack ou Discord
- Persistência dos eventos
- Testes automatizados
- Migração para Spring Boot

---

# Licença

Projeto publicado apenas para fins educacionais e de demonstração de arquitetura.

Informações confidenciais da solução original foram removidas ou substituídas por dados fictícios.
