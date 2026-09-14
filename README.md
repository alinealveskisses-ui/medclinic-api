# MedClinic API — Etapa 1: Autenticação e Autorização

Base de autenticação e controle de permissões (RBAC) da API para gerenciamento de clínica médica.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **Express.js**
- **TypeScript** (Tipagem estática em todas as camadas)
- **PostgreSQL** & **TypeORM**
- **JWT (JSON Web Token)**
- **Bcrypt** (Hash de senhas)
- **Docker**

---

## 🏛️ Arquitetura do Projeto

Organizado em arquitetura em camadas (MVC):

```text
src/
├── @types/          # Definições de tipos personalizadas (Express Request)
├── config/          # Conexão com o banco de dados (TypeORM DataSource)
├── controllers/     # Recebimento de requisições e respostas HTTP
├── dtos/            # Data Transfer Objects
├── entities/        # Modelagem das entidades relacionais
├── middlewares/     # Middlewares de Auth, RBAC e Erro Centralizado
├── repositories/    # Camada de abstração de dados do TypeORM
├── routes/          # Definição e mapeamento dos endpoints
├── services/        # Regras de negócio da aplicação
├── utils/           # Utilitários de Hash e JWT
└── server.ts        # Ponto de entrada do servidor