# Task App CRUD

Projeto desenvolvido para a disciplina de **Fundamentos de React** da **Pós Graduação JAVA com IA**.

## Sobre o projeto

Aplicação web full-stack de gerenciamento de tarefas (CRUD) com autenticação de usuários. O projeto demonstra na prática os fundamentos do React integrado a um backend Node.js com banco de dados relacional.

### Funcionalidades

- Cadastro de usuários
- Login com autenticação via JWT
- Listagem, criação e exclusão de tarefas
- Conclusão de tarefas (`PUT /tasks/:id/complete`)
- Tasks concluídas exibidas ao final da lista
- Indicação visual de tarefa concluída (texto riscado e opacidade reduzida)
- Botão de deletar e checkbox desabilitados para tasks já concluídas

### Tecnologias utilizadas

**Frontend**
- [Next.js 16](https://nextjs.org) com App Router
- React 19
- TypeScript
- Tailwind CSS

**Backend**
- Node.js com Express
- TypeScript
- PostgreSQL
- JWT (`jsonwebtoken`) para autenticação
- `bcrypt` para hash de senhas

**Infraestrutura**
- Docker e Docker Compose para orquestração do banco de dados e backend

## Estrutura do projeto

```
├── app/               # Páginas do Next.js (frontend)
│   ├── page.tsx       # Página inicial
│   ├── login/         # Tela de login
│   ├── register/      # Tela de cadastro
│   └── tasks/         # Tela de tarefas
├── backend/           # API REST (Express + PostgreSQL)
│   └── src/
│       ├── index.ts   # Entrypoint do servidor
│       ├── db.ts      # Conexão com o banco de dados
│       └── routes/    # Rotas da API
├── components/        # Componentes React reutilizáveis
└── docker-compose.yml # Orquestração dos serviços
```

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+
- [Docker](https://www.docker.com) e Docker Compose

### 1. Subir o backend e o banco de dados

```bash
docker compose up -d
```

Isso iniciará o PostgreSQL na porta `5432` e o backend na porta `3001`.

### 2. Rodar o servidor de desenvolvimento do frontend

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para acessar a aplicação.

## Scripts disponíveis

| Comando         | Descrição                              |
|-----------------|----------------------------------------|
| `npm run dev`   | Inicia o servidor de desenvolvimento   |
| `npm run build` | Gera o build de produção               |
| `npm run start` | Inicia o servidor em modo produção     |
| `npm run lint`  | Executa o linter no projeto            |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
