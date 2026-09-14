-- Garante a extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Criação do enum de perfis de acesso
DO $$ BEGIN
    CREATE TYPE users_role_enum AS ENUM ('ADMIN', 'ATENDENTE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role users_role_enum NOT NULL DEFAULT 'ATENDENTE',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);