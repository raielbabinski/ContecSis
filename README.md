# ContecSis

Sistema de Gestão de Clientes, Pedidos, Serviços, Instaladores, Peças e Usuários

## Sumário
- [ContecSis](#contecsis)
  - [Sumário](#sumário)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Backend](#backend)
  - [Como Rodar Backend](#como-rodar-backend)
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Documentação da API](#documentação-da-api)
    - [Principais Endpoints](#principais-endpoints)
  - [Exemplos de Requisições](#exemplos-de-requisições)
    - [Login](#login)
    - [Cadastro de Cliente](#cadastro-de-cliente)
  - [Contato](#contato)

---

## Sobre o Projeto
O ContecSis é um sistema backend desenvolvido em Node.js/Express com PostgreSQL para gerenciar clientes, pedidos, serviços, instaladores, peças e usuários. O objetivo é fornecer uma API robusta, segura e bem documentada para facilitar a gestão e integração com sistemas frontend.

## Funcionalidades
- Cadastro, consulta, atualização e remoção de clientes, endereços, instaladores, serviços, peças e usuários
- Autenticação JWT (login seguro, geração e verificação de token)
- Atualização dinâmica e incremental de entidades
- Sincronização de itens de pedido sem perda de dados
- Busca por CPF, atualização de endereço, verificação de existência de pedidos
- Tratamento de erros detalhado e mensagens personalizadas

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- pg-promise
- JWT (jsonwebtoken)
- dotenv
- cors
- passport

## Como Rodar Backend
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ContecSis.git
   ```
2. Instale as dependências do backend:
   ```bash
   cd Sistema/Backend
   npm install
   ```
3. Configure o arquivo `.env` com as variáveis de ambiente:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=contec_db
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Estrutura de Pastas
```
Sistema/
  Backend/
    src/
      server.js
      config/
      controllers/
      model/
      routes/
    package.json
  Frontend/
    contec-app/
    imagens-contec/
    server/
Documentos/
  Requisitos_Usuário.pdf.pdf
  BD/
```

## Documentação da API
A documentação completa dos endpoints, exemplos de requisições e respostas, bodies esperados e erros comuns está disponível em `Sistema/Backend/README.md`.

### Principais Endpoints
- `/api/users` — Usuários
- `/api/clients` — Clientes
- `/api/installers` — Instaladores
- `/api/services` — Serviços
- `/api/parts` — Peças
- `/api/orders` — Pedidos
- `/api/addresses` — Endereços


## Exemplos de Requisições
### Login
```json
POST /api/auth/login
{
  "username": "admin",
  "password": "123456"
}
```

### Cadastro de Cliente
```json
POST /api/clients
{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "endereco": {
    "rua": "Rua A",
    "numero": "100",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000"
  }
}
```

## Contato
- Responsável: Raiel
- Email: raiel@email.com
- LinkedIn: [Seu LinkedIn](https://www.linkedin.com/in/seu-linkedin)

---

> Para mais detalhes técnicos, consulte o README do backend em `Sistema/Backend/README.md`.
