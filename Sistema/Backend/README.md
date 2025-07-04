# 📚 API Backend - Documentação

## Como rodar o backend

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o arquivo `.env` na raiz do projeto com as seguintes variáveis:**
   ```
   # Banco de dados
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=nome_do_banco

   # JWT e Passport
   JWT_SECRET=sua_chave_jwt_super_secreta
   PASSPORT_USERNAME_FIELD=username
   PASSPORT_PASSWORD_FIELD=password
   ```

3. **Inicie o servidor:**
   ```bash
   npm start
   ```
   ou, para desenvolvimento com recarregamento automático:
   ```bash
   npm run dev
   ```

4. **A API estará disponível em:**  
   ```
   http://localhost:3012/
   ```

---

Este documento descreve as rotas disponíveis na API do Backend, seus métodos, parâmetros esperados e exemplos de resposta.  
Preencha as seções de **Clientes**, **Pedidos** e **Serviços** conforme for implementando as rotas.

---

## Índice

- [📚 API Backend - Documentação](#-api-backend---documentação)
  - [Como rodar o backend](#como-rodar-o-backend)
  - [Índice](#índice)
  - [Usuários](#usuários)
    - [Criar Usuário](#criar-usuário)
    - [Login](#login)
    - [Listar Todos os Usuários](#listar-todos-os-usuários)
  - [Clientes](#clientes)
    - [Criar Cliente](#criar-cliente)
    - [Buscar Cliente por CPF](#buscar-cliente-por-cpf)
    - [Atualizar Cliente](#atualizar-cliente)
    - [Deletar Cliente](#deletar-cliente)
  - [Pedidos](#pedidos)
    - [Criar Pedido](#criar-pedido)
  - [Serviços](#serviços)
    - [Criar Serviço](#criar-serviço)
  - [Autenticação](#autenticação)
  - [Erros Comuns](#erros-comuns)

---

## Usuários

### Criar Usuário

- **Endpoint:** `POST /users/create`
- **Body (JSON):**
  ```json
  {
    "nome": "João da Silva",
    "senha": "minhasenha123",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "cargo": "Administrador"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "codusuario": 1,
    "nome": "João da Silva",
    "senha": "$2b$10$...",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "cargo": "Administrador"
  }
  ```
- **Possíveis erros:**
  - 400: Usuário ou e-mail já cadastrado.
  - 500: Erro interno no servidor.

---

### Login

- **Endpoint:** `POST /users/login`
- **Body (JSON):**
  ```json
  {
    "username": "João da Silva",
    "password": "minhasenha123"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "token": "jwt_token_aqui",
    "user": {
      "nome": "João da Silva"
    }
  }
  ```
- **Possíveis erros:**
  - 401: Usuário incorreto.
  - 401: Senha incorreta.
  - 401: Credenciais inválidas.

---

### Listar Todos os Usuários

- **Endpoint:** `GET /users/getall`
- **Resposta de sucesso:**
  ```json
  [
    {
      "codusuario": 1,
      "nome": "João da Silva",
      "email": "joao@email.com",
      "telefone": "11999999999",
      "cargo": "Administrador"
    },
    ...
  ]
  ```
- **Possíveis erros:**
  - 500: Erro ao buscar usuários.

---

## Clientes

### Criar Cliente

- **Endpoint:** `POST /cliente/create`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Body (JSON):**
  ```json
  {
    "cpf": "12345678900",
    "nome": "Cliente Exemplo",
    "fone": "11999999999",
    "emai": "cliente@email.com",
    "enderCli": {
      "lgdr": "Rua das Flores",
      "numero": 123,
      "complmt": "Apto 45",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01001-000"
    }
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678900",
    "nome": "Cliente Exemplo",
    "fone": "11999999999",
    "emai": "cliente@email.com",
    "enderCli": 1
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Dados obrigatórios ausentes ou inválidos.
  - 500: Erro ao inserir cliente.

---

### Buscar Cliente por CPF

- **Endpoint:** `GET /cliente/get/:cpf`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678900",
    "nome": "Cliente Exemplo",
    "fone": "11999999999",
    "emai": "cliente@email.com",
    "enderCli": 1
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Cliente não encontrado.
  - 500: Erro ao buscar cliente.

---

### Atualizar Cliente

- **Endpoint:** `PUT /cliente/update/:cpf`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**  
  Envie apenas os campos que deseja atualizar.  
  Para atualizar dados do endereço, inclua o objeto `enderCli` com os campos desejados.

  **Exemplo (atualizando nome e telefone):**
  ```json
  {
    "nome": "Novo Nome",
    "fone": "11988887777"
  }
  ```

  **Exemplo (atualizando nome e endereço):**
  ```json
  {
    "nome": "Novo Nome",
    "enderCli": {
      "lgdr": "Rua Nova",
      "numero": 456,
      "complmt": "Casa",
      "bairro": "Jardim Primavera",
      "cidade": "Campinas",
      "estado": "SP",
      "cep": "13000-000"
    }
  }
  ```

- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678900",
    "nome": "Novo Nome",
    "fone": "11988887777",
    "emai": "cliente@email.com",
    "enderCli": 1
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Nenhum campo para atualizar.
  - 404: Cliente não encontrado.
  - 500: Erro ao atualizar cliente.

---

### Deletar Cliente

- **Endpoint:** `DELETE /cliente/delete/12345678900` -> cpf
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678900",
    "nome": "Cliente Exemplo",
    "fone": "11999999999",
    "emai": "cliente@email.com",
    "enderCli": 1
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Cliente não encontrado.
  - 500: Erro ao deletar cliente.

---

## Pedidos

> **Preencha aqui quando implementar as rotas de pedidos.**

### Criar Pedido

- **Endpoint:** `POST /pedidos/create`
- **Body (JSON):**
  ```json
  {
    "clienteId": 1,
    "descricao": "Pedido de exemplo"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "id": 1,
    "clienteId": 1,
    "descricao": "Pedido de exemplo"
  }
  ```

---

## Serviços

> **Preencha aqui quando implementar as rotas de serviços.**

### Criar Serviço

- **Endpoint:** `POST /servicos/create`
- **Body (JSON):**
  ```json
  {
    "nome": "Instalação",
    "preco": 100.0
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "id": 1,
    "nome": "Instalação",
    "preco": 100.0
  }
  ```

---

## Autenticação

- **JWT:**  
  Após o login bem-sucedido, o token JWT deve ser enviado no header das requisições protegidas:
  ```
  Authorization: Bearer <token>
  ```

---

## Erros Comuns

- **401 Unauthorized:** Credenciais inválidas ou token ausente/expirado.
- **400 Bad Request:** Dados obrigatórios ausentes ou inválidos.
- **500 Internal Server Error:** Erro inesperado no servidor.

---