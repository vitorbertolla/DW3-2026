# API Futebol — Times, Estados, Estádios e Títulos

Projeto acadêmico desenvolvido para a disciplina de **Desenvolvimento Web 3 (DW3)**.

Este repositório contém **apenas a API** (backend), construída com [Fastify](https://fastify.dev/) e documentada com **Swagger/OpenAPI**. Não há front-end — a interação com a API deve ser feita via Swagger UI, Insomnia, Postman ou similar.

## Sobre o domínio

A API modela dados do futebol brasileiro, relacionando:

- **Estados** — unidades federativas (nome e sigla).
- **Times** — clubes de futebol, vinculados a um estado.
- **Estádios** — cada time possui um único estádio (relação 1:1).
- **Títulos** — competições/troféus existentes (ex: Brasileirão, Copa do Brasil).
- **Time_has_Titulo** — tabela de relacionamento que registra qual time conquistou qual título em qual ano (relação N:N entre Times e Títulos).

A API permite consultar, cadastrar, atualizar e remover registros dessas entidades, além de consultas mais elaboradas, como detalhes de um time (com estado, estádio e total de títulos) e os campeões de um título específico.

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/) (versão 20.6 ou superior — necessário para a flag `--env-file`)
- [Fastify 5](https://fastify.dev/)
- [PostgreSQL](https://www.postgresql.org/) (via [`pg`](https://node-postgres.com/))
- [@fastify/swagger](https://github.com/fastify/fastify-swagger) + [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui) — documentação interativa da API
- [@fastify/cors](https://github.com/fastify/fastify-cors)

## Pré-requisitos

Antes de começar, tenha instalado:

- **Node.js** versão **20.6+** ([download](https://nodejs.org/))
- **PostgreSQL** instalado e rodando localmente (ou acesso a uma instância remota)
- Um cliente de banco de dados (ex: `psql`, DBeaver, pgAdmin) para rodar o script de criação das tabelas

## Passo a passo para rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/vitorbertolla/Trabalho_DW_Api.git
cd Trabalho_DW_Api/backend
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Criar o banco de dados

Crie um banco de dados no PostgreSQL (o nome fica a seu critério, ex: `futebol_db`):

```sql
CREATE DATABASE futebol_db;
```

Em seguida, rode o script de criação das tabelas (schema), localizado na raiz do projeto em `database.sql` — ele cria as tabelas `estados`, `times`, `estadios`, `titulos` e `time_has_titulo`, além das chaves primárias, estrangeiras e constraints de unicidade:

```bash
psql -U <SEU_USUARIO> -d futebol_db -f database.sql
```

> Se preferir, você também pode colar o conteúdo do `database.sql` diretamente em uma aba de query do seu cliente de banco de dados (DBeaver, pgAdmin, etc).

> **Usando Neon (PostgreSQL na nuvem):** se você utiliza o [Neon](https://neon.tech/) como banco de dados (projeto `Trabalho_DW_Api`), não é necessário instalar o PostgreSQL localmente. Basta:
> 1. Acessar o [Neon Console](https://console.neon.tech/) e abrir o projeto `Trabalho_DW_Api`.
> 2. Usar o **SQL Editor** do próprio Neon para colar e executar o conteúdo do `database.sql`.
> 3. Copiar a connection string disponibilizada pelo Neon (aba **Connection Details**) e usá-la como `DATABASE_URL` no passo 4 — ela já vem pronta, geralmente no formato `postgresql://usuario:senha@ep-xxxxx.neon.tech/nome_do_banco?sslmode=require`.

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `backend` (mesmo nível do `server.js`) com a seguinte variável:

```dotenv
DATABASE_URL=postgresql://<usuario>:<senha>@localhost:5432/futebol_db
```

Substitua `<usuario>`, `<senha>` e o nome do banco (`futebol_db`) pelos dados da sua instalação local do PostgreSQL.

**Formato da `DATABASE_URL`:**

```
postgresql://[usuario]:[senha]@[host]:[porta]/[nome_do_banco]
```

### 5. Iniciar o servidor

Modo desenvolvimento (reinicia automaticamente a cada alteração de arquivo):

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

Se tudo estiver correto, você verá no terminal uma mensagem semelhante a:

```
Conectado ao PostgreSQL com sucesso
Servidor rodando na porta 3000
```

### 6. Acessar a documentação Swagger

Com o servidor rodando, abra no navegador:

```
http://localhost:3000/docs
```

Lá é possível visualizar todos os endpoints disponíveis, agrupados por entidade (Times, Estados, Estádios, Títulos, Time-Titulos), testar requisições diretamente pela interface, e ver os formatos esperados de body, parâmetros e respostas (sucesso e erro) de cada rota.

## Endpoints disponíveis

| Entidade | Rota base | Métodos |
|---|---|---|
| Times | `/times` | GET, GET /:id, GET /:id/detalhes, GET /:id/titulos, POST, PATCH /:id, DELETE /:id |
| Estados | `/estados` | GET, GET /:id, POST, PATCH /:id, DELETE /:id |
| Estádios | `/estadios` | GET, GET /:id, POST, PATCH /:id, DELETE /:id |
| Títulos | `/titulos` | GET, GET /:id, GET /:id/campeoes, POST, PATCH /:id, DELETE /:id |
| Time-Titulos | `/time-has-titulos` | GET, GET /:id, POST, PATCH /:id, DELETE /:id |

Todos os detalhes de cada rota (schemas de body, parâmetros e respostas) estão disponíveis na documentação Swagger em `/docs`.

## Solução de problemas comuns

- **Erro de conexão com o banco (`ECONNREFUSED`)**: verifique se o PostgreSQL está rodando e se a `DATABASE_URL` no `.env` está correta.
- **Erro `relation "times" does not exist`**: o script de criação das tabelas não foi executado no banco configurado na `DATABASE_URL`.
- **Porta 3000 já em uso**: encerre o processo que está usando a porta ou altere a porta no `server.js` (`server.listen({ port: 3000 })`).