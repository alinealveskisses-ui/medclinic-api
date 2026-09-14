# MedClinic API — Etapa 1: Autenticação e Autorização

Base de autenticação, autorização baseada em funções (RBAC) e persistência relacional da API para gerenciamento de clínica médica.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18+) & **Express.js**
- **TypeScript** (tipagem estática em todas as camadas)
- **PostgreSQL** & **TypeORM** (ORM e Data Source)
- **JWT (JSON Web Token)** (autenticação stateless)
- **Bcrypt** (criptografia irreversível de senhas com salt)
- **Docker** (containerização do banco de dados)

---

## 🏛️ Arquitetura do Projeto

A aplicação adota o padrão arquitetural **MVC em camadas**:

```text
src/
├── @types/          # Extensão de tipos nativos (Express Request)
├── config/          # Configuração do TypeORM (data-source.ts)
├── controllers/     # Recepção de requisições HTTP e entrega de respostas
├── dtos/            # Data Transfer Objects (validação de payloads)
├── entities/        # Mapeamento objeto-relacional (ORM) e decorators
├── middlewares/     # Interceptadores: autenticação JWT, RBAC e handler de erros
├── repositories/    # Abstração de acesso a dados do PostgreSQL
├── routes/          # Definição e roteamento de endpoints
├── services/        # Regras de negócio, hashing e orquestração
├── utils/           # Funções utilitárias (hash e jwt)
└── server.ts        # Ponto de inicialização do servidor Express
database/
└── init.sql         # Script DDL com tipos enum e criação da tabela users
```

## Perfis de Acesso (RBAC)
O controle de acesso baseado em papéis implementa dois perfis:

ADMIN: Acesso irrestrito a todas as operações, visualização do próprio perfil e acesso exclusivo a rotas administrativas restritas.

ATENDENTE: Acesso operacional básico. Permite login e consulta do próprio perfil, sendo bloqueado com erro 403 Forbidden em rotas administrativas.

## ⚙️ Pré-requisitos e Variáveis de Ambiente
Pré-requisitos

Node.js (v18+)
Docker ativo

Arquivo .env
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```Snippet de código
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=123456
DB_NAME=medclinic_db
JWT_SECRET=super_secret_jwt_key_medclinic_2026
```

## Instalação e Execução
Subir o banco PostgreSQL via Docker:

```bash
docker start medclinic-postgres
```

(Caso ainda não exista o container: docker run --name medclinic-postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=medclinic_db -p 5432:5432 -d postgres)

Instalar dependências:

```bash
npm install
```

Executar em modo de desenvolvimento:
```bash
npm run dev
```
## Documentação dos Endpoints

# 1. Cadastro de Usuário
Cadastra um novo usuário com senha criptografada via bcrypt.

Método / Rota: POST /auth/register

Autenticação: Pública (não requer token)

Body (JSON):

```json
{
  "name": "Dr. Carlos Silva",
  "email": "carlos@medclinic.com",
  "password": "senhaSegura123",
  "role": "ADMIN"
}
```
Resposta Sucesso (201 Created):

```json

{
  "id": "a5d098e2-c439-4458-8b92-5645bf0970db",
  "name": "Dr. Carlos Silva",
  "email": "carlos@medclinic.com",
  "role": "ADMIN",
  "createdAt": "2026-09-14T18:00:00.000Z"
}
```
Respostas de Erro:

400 Bad Request: Campos obrigatórios ausentes.

409 Conflict: E-mail já cadastrado.

# 2. Login (Autenticação)
Valida credenciais e retorna o token JWT assinado.

Método / Rota: POST /auth/login

Autenticação: Pública

Body (JSON):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
Resposta Erro:

401 Unauthorized: "Credenciais inválidas."

# 3. Perfil do Usuário Autenticado
Retorna os dados do usuário com base no token fornecido.

Método / Rota: GET /users/me

Headers: Authorization: Bearer <SEU_TOKEN_JWT>

Resposta Sucesso (200 OK):

```json
{
  "id": "a5d098e2-c439-4458-8b92-5645bf0970db",
  "name": "Dr. Carlos Silva",
  "email": "carlos@medclinic.com",
  "role": "ADMIN",
  "createdAt": "2026-09-14T18:00:00.000Z"
}
```
Resposta Erro:

401 Unauthorized: Token ausente, inválido ou expirado.


# 4. Verificação de Acesso Restrito (RBAC)
Endpoint de teste restrito ao perfil de Administrador.

Método / Rota: GET /users/admin/ping

Headers: Authorization: Bearer <SEU_TOKEN_JWT>

Resposta Sucesso (200 OK - Perfil ADMIN):
```json
{
  "message": "Acesso concedido: você possui permissões de Administrador."
}
```
Resposta Bloqueio (403 Forbidden - Perfil ATENDENTE):
```json
{
  "message": "Acesso negado: permissão insuficiente para este recurso."
}
```