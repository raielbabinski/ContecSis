
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
    - [Listar Todos os Clientes](#listar-todos-os-clientes)
  - [Pedidos](#pedidos)
    - [Criar Pedido](#criar-pedido)
    - [Atualizar Pedido](#atualizar-pedido)
    - [Listar Todos os Pedidos](#listar-todos-os-pedidos)
    - [Buscar Pedido por Código](#buscar-pedido-por-código)
    - [Deletar Pedido](#deletar-pedido)
  - [Serviços](#serviços)
    - [Criar Serviço](#criar-serviço)
    - [Listar Todos os Serviços](#listar-todos-os-serviços)
    - [Buscar Serviço por Código](#buscar-serviço-por-código)
    - [Atualizar Serviço](#atualizar-serviço)
    - [Deletar Serviço](#deletar-serviço)
  - [Instaladores](#instaladores)
    - [Criar Instalador](#criar-instalador)
    - [Listar Todos os Instaladores](#listar-todos-os-instaladores)
    - [Buscar Instalador por CPF](#buscar-instalador-por-cpf)
    - [Atualizar Instalador](#atualizar-instalador)
    - [Deletar Instalador](#deletar-instalador)
  - [Peças](#peças)
    - [Criar Peça](#criar-peça)
    - [Listar Todas as Peças](#listar-todas-as-peças)
    - [Buscar Peça por Código](#buscar-peça-por-código)
    - [Atualizar Peça](#atualizar-peça)
    - [Deletar Peça](#deletar-peça)
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

### Listar Todos os Clientes

- **Endpoint:** `GET /cliente/getall`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  [
    {
      "cpf": "12345678900",
      "nome": "Cliente Exemplo",
      "fone": "11999999999",
      "emai": "cliente@email.com",
      "enderCli": 1
    },
    ...
  ]
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 500: Erro ao buscar clientes.

---

## Pedidos

> **Preencha aqui quando implementar as rotas de pedidos.**

### Criar Pedido

- **Endpoint:** `POST /pedido/create`
- **Headers:**
  ```
  Authorization 
  Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "codcli": "12345678900",
    "valped": 1500.00,
    "dtped": "2024-07-01",
    "enderped": {
      "lgdr": "Rua Exemplo",
      "numero": 100,
      "complmt": "Apto 101",
      "bairro": "Bairro Exemplo",
      "cidade": "Cidade Exemplo",
      "estado": "SP",
      "cep": "01010-000"
    },
    "pecas": [
      {
        "id": 1,
        "quantidade": 2
      },
      ...
    ]
  }
  ```

- **Resposta de sucesso:**
  ```json
  {
    "codped": 1,
    "codcli": "12345678900",
    "valped": 1500.00,
    "dtped": "2024-07-01",
    "enderped": 1,
    "pecas": [
      {
        "id": 1,
        "quantidade": 2
      },
      ...
    ]
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Dados obrigatórios ausentes ou inválidos.
  - 500: Erro ao inserir pedido.

### Atualizar Pedido

- **Endpoint:** `PUT /pedido/update/:codped`
- **Headers:**
- ```
  Authorization Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**
  Envie apenas os campos que deseja atualizar.

  **Exemplo:**
  ```json
  {
    "valped": 1600.00,
    "dtped": "2024-07-02",
    "enderped": {
      "lgdr": "Rua Atualizada",
      "numero": 200,
      "complmt": "Casa",
      "bairro": "Bairro Atualizado",
      "cidade": "Cidade Atualizada",
      "estado": "SP",
      "cep": "02020-000"
    },
    "pecas": [
      {
        "id": 1,
        "quantidade": 3
      }
    ]
  }
  ```

- **Resposta de sucesso:**
  ```json
  {
    "codped": 1,
    "codcli": "12345678900",
    "valped": 1600.00,
    "dtped": "2024-07-02",
    "enderped": 1,
    "pecas": [
      {
        "id": 1,
        "quantidade": 3
      }
    ]
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Nenhum campo para atualizar.
  - 404: Pedido não encontrado.
  - 500: Erro ao atualizar pedido.

### Listar Todos os Pedidos
- **Endpoint:** `GET /pedido/getall`
- **Headers:**
  ```
  Authorization Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  [
    {
      "codped": 10,
      "cliente": "12345678900",
      "statped": "orçamento",
      "valped": "4",
      "comp": "12",
      "altura": "32",
      "dtpdd": null,
      "dtentg": null,
      "enderped": "23"
    },
  ]
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 500: Erro ao buscar pedidos.
  - 404: Nenhum pedido encontrado.
 

### Buscar Pedido por Código

- **Endpoint:** `GET /pedido/get/:codped`
- **Headers:**
  ```  
  Authorization Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json 
  {
    "codped": 1,
    "codcli": "12345678900",
    "valped": 1500.00,
    "dtped": "2024-07-01",
    "enderped": 1
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Pedido não encontrado.
  - 500: Erro ao buscar pedido.


### Deletar Pedido

- **Endpoint:** `DELETE /pedido/delete/:codped`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ``` 

- **Resposta de sucesso:**
  ```json
  {
    "codped": 1,
    "codcli": "12345678900",
    "valped": 1500.00,
    "dtped": "2024-07-01",
    "enderped": 1
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Pedido não encontrado.
  - 500: Erro ao deletar pedido.

---


## Serviços

### Criar Serviço

- **Endpoint:** `POST /servico/create`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "inst": "12345678901",
    "valserv": 350.00,
    "tipserv": "Climatização",
    "dtserv": "2024-07-05"
  }
  ```
  - `inst`: CPF do instalador responsável pelo serviço (string, obrigatório)
  - `valserv`: Valor do serviço (number, obrigatório)
  - `tipserv`: Tipo do serviço (string, obrigatório)
  - `dtserv`: Data do serviço (string, formato `YYYY-MM-DD`, obrigatório)

- **Resposta de sucesso:**
  ```json
  {
    "codserv": 1,
    "inst": "12345678901",
    "valserv": 350.00,
    "tipserv": "Climatização",
    "dtserv": "2024-07-05"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Dados obrigatórios ausentes ou inválidos.
  - 500: Erro ao inserir serviço.

---

### Listar Todos os Serviços

- **Endpoint:** `GET /servico/getall`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  [
    {
      "codserv": 1,
      "inst": "12345678901",
      "valserv": 350.00,
      "tipserv": "Climatização",
      "dtserv": "2024-07-05"
    },
    ...
  ]
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 500: Erro ao buscar serviços.

---

### Buscar Serviço por Código

- **Endpoint:** `GET /servico/get/:codserv`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "codserv": 1,
    "inst": "12345678901",
    "valserv": 350.00,
    "tipserv": "Climatização",
    "dtserv": "2024-07-05"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Serviço não encontrado.
  - 500: Erro ao buscar serviço.

---

### Atualizar Serviço

- **Endpoint:** `PUT /servico/update/:codserv`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**  
  Envie apenas os campos que deseja atualizar.

  **Exemplo:**
  ```json
  {
    "valserv": 400.00,
    "tipserv": "Manutenção",
    "dtserv": "2024-07-10"
  }
  ```

- **Resposta de sucesso:**
  ```json
  {
    "codserv": 1,
    "inst": "12345678901",
    "valserv": 400.00,
    "tipserv": "Manutenção",
    "dtserv": "2024-07-10"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Nenhum campo para atualizar.
  - 404: Serviço não encontrado.
  - 500: Erro ao atualizar serviço.

---

### Deletar Serviço

- **Endpoint:** `DELETE /servico/delete/:codserv`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "codserv": 1,
    "inst": "12345678901",
    "valserv": 350.00,
    "tipserv": "Climatização",
    "dtserv": "2024-07-05"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Serviço não encontrado.
  - 500: Erro ao deletar serviço.

---

## Instaladores

### Criar Instalador

- **Endpoint:** `POST /instalador/create`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "cpf": "12345678901",
    "fone": "11999998888",
    "email": "instalador@email.com",
    "nome": "Carlos Instalador",
    "habilit": "Elétrica"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678901",
    "fone": "11999998888",
    "email": "instalador@email.com",
    "nome": "Carlos Instalador",
    "habilit": "Elétrica"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Dados obrigatórios ausentes ou inválidos.
  - 500: Erro ao inserir instalador.

---

### Listar Todos os Instaladores

- **Endpoint:** `GET /instalador/getall`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  [
    {
      "cpf": "12345678901",
      "fone": "11999998888",
      "email": "instalador@email.com",
      "nome": "Carlos Instalador",
      "habilit": "Elétrica"
    },
    ...
  ]
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 500: Erro ao buscar instaladores.

---

### Buscar Instalador por CPF

- **Endpoint:** `GET /instalador/get/:cpf`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678901",
    "fone": "11999998888",
    "email": "instalador@email.com",
    "nome": "Carlos Instalador",
    "habilit": "Elétrica"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Instalador não encontrado.
  - 500: Erro ao buscar instalador.

---

### Atualizar Instalador

- **Endpoint:** `PUT /instalador/update/:cpf`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**  
  Envie apenas os campos que deseja atualizar.

  **Exemplo:**
  ```json
  {
    "nome": "Novo Nome Instalador",
    "fone": "11988887777",
    "email": "novoemail@exemplo.com",
    "habilit": "Hidráulica"
  }
  ```

- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678901",
    "fone": "11988887777",
    "email": "novoemail@exemplo.com",
    "nome": "Novo Nome Instalador",
    "habilit": "Hidráulica"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Nenhum campo para atualizar.
  - 404: Instalador não encontrado.
  - 500: Erro ao atualizar instalador.

---

### Deletar Instalador

- **Endpoint:** `DELETE /instalador/delete/:cpf`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "cpf": "12345678901",
    "fone": "11999998888",
    "email": "instalador@email.com",
    "nome": "Carlos Instalador",
    "habilit": "Elétrica"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Instalador não encontrado.
  - 500: Erro ao deletar instalador.

---

## Peças

### Criar Peça

- **Endpoint:** `POST /pecas/create`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "descricao": "Peça de Exemplo",
    "valor": 100.00,
    "tipo": "Elétrica",
    "codigo": "PEC123456"
  }
  ```
  - `descricao`: Descrição da peça (string, obrigatório)
  - `valor`: Valor da peça (number, obrigatório)
  - `tipo`: Tipo da peça (string, obrigatório)
  - `codigo`: Código de identificação da peça (string, obrigatório)

- **Resposta de sucesso:**
  ```json
  {
    "id": 1,
    "descricao": "Peça de Exemplo",
    "valor": 100.00,
    "tipo": "Elétrica",
    "codigo": "PEC123456"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Dados obrigatórios ausentes ou inválidos.
  - 500: Erro ao inserir peça.

---

### Listar Todas as Peças

- **Endpoint:** `GET /pecas/getall`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  [
    {
      "id": 1,
      "descricao": "Peça de Exemplo",
      "valor": 100.00,
      "tipo": "Elétrica",
      "codigo": "PEC123456"
    },
    ...
  ]
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 500: Erro ao buscar peças.

---

### Buscar Peça por Código

- **Endpoint:** `GET /pecas/get/:codigo`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "id": 1,
    "descricao": "Peça de Exemplo",
    "valor": 100.00,
    "tipo": "Elétrica",
    "codigo": "PEC123456"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Peça não encontrada.
  - 500: Erro ao buscar peça.

---

### Atualizar Peça

- **Endpoint:** `PUT /pecas/update/:codigo`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  ```
- **Body (JSON):**  
  Envie apenas os campos que deseja atualizar.

  **Exemplo:**
  ```json
  {
    "valor": 120.00,
    "tipo": "Hidráulica"
  }
  ```

- **Resposta de sucesso:**
  ```json
  {
    "id": 1,
    "descricao": "Peça de Exemplo",
    "valor": 120.00,
    "tipo": "Hidráulica",
    "codigo": "PEC123456"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 400: Nenhum campo para atualizar.
  - 404: Peça não encontrada.
  - 500: Erro ao atualizar peça.

---

### Deletar Peça

- **Endpoint:** `DELETE /pecas/delete/:codigo`
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "id": 1,
    "descricao": "Peça de Exemplo",
    "valor": 100.00,
    "tipo": "Elétrica",
    "codigo": "PEC123456"
  }
  ```
- **Possíveis erros:**
  - 401: Token ausente ou inválido.
  - 404: Peça não encontrada.
  - 500: Erro ao deletar peça.

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
