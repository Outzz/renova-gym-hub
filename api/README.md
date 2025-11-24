# Renova Academia API

Backend API para o sistema Renova Academia desenvolvido com Node.js, Express e TypeScript.

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`
2. Configure as variáveis de ambiente:
   - `PORT`: Porta do servidor (padrão: 3001)
   - `SUPABASE_URL`: URL do projeto Supabase
   - `SUPABASE_KEY`: Chave de API do Supabase

## Scripts

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run build`: Compila o código TypeScript para JavaScript
- `npm start`: Inicia o servidor em produção
- `npm run lint`: Verifica o código com ESLint

## Endpoints

### Vendas
- `GET /api/vendas` - Lista todas as vendas
- `POST /api/vendas` - Cria uma nova venda
- `PUT /api/vendas/:id` - Atualiza uma venda
- `DELETE /api/vendas/:id` - Remove uma venda

### Tarefas
- `GET /api/tarefas` - Lista todas as tarefas
- `POST /api/tarefas` - Cria uma nova tarefa
- `PUT /api/tarefas/:id` - Atualiza uma tarefa
- `DELETE /api/tarefas/:id` - Remove uma tarefa

### Interações
- `GET /api/interacoes` - Lista todas as interações
- `POST /api/interacoes` - Cria uma nova interação
- `PUT /api/interacoes/:id` - Atualiza uma interação
- `DELETE /api/interacoes/:id` - Remove uma interação

### Usuários
- `GET /api/usuarios` - Lista todos os usuários

### Planos
- `GET /api/planos` - Lista todos os planos
- `POST /api/planos` - Cria um novo plano
- `PUT /api/planos/:id` - Atualiza um plano
- `DELETE /api/planos/:id` - Remove um plano

### Alunos
- `GET /api/alunos` - Lista todos os alunos
- `POST /api/alunos` - Cria um novo aluno
- `PUT /api/alunos/:id` - Atualiza um aluno
- `DELETE /api/alunos/:id` - Remove um aluno

### Matrículas
- `GET /api/matriculas` - Lista todas as matrículas
- `POST /api/matriculas` - Cria uma nova matrícula
- `PUT /api/matriculas/:id` - Atualiza uma matrícula
- `DELETE /api/matriculas/:id` - Remove uma matrícula

## Estrutura do Projeto

```
api/
├── src/
│   ├── config/
│   │   └── supabase.ts      # Configuração do Supabase
│   ├── controllers/         # Controladores das rotas
│   ├── routes/              # Definição das rotas
│   └── server.ts            # Arquivo principal do servidor
├── package.json
└── tsconfig.json
```
