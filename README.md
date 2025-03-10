![Backend Produtivo Banner](/assets/header.png)

  <p align="center">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/danielmeloalencar/danielmeloalencar/backend-base-fastify-docker">
    <img alt="stars" src="https://img.shields.io/github/stars/danielmeloalencar/backend-base-fastify-docker?logo=github">
    <img alt="size" src="https://img.shields.io/github/repo-size/danielmeloalencar/backend-base-fastify-docker">
    <img alt="license" src="https://img.shields.io/github/license/danielmeloalencar/backend-base-fastify-docker">
  </p>

> :pushpin:
>
> ## Uma API backend **ROBUSTA**, porém **PRODUTIVA**
>
> Construída com **Fastify**, **Prisma**, **TypeScript**, e **Zod** para validação de esquemas. Este projeto segue padrões modernos de desenvolvimento como **Dependency Injection**, **Repository Pattern**, e inclui documentação automática com **Swagger**.
> .

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Docker](#-docker)
- [Qualidade de Código](#-qualidade-de-código)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Desenvolvimento](#-desenvolvimento)
  - [Adicionando Novas Rotas](#adicionando-novas-rotas)
  - [Adicionando Novas Tabelas](#adicionando-novas-tabelas)
  - [Relacionamentos no Prisma](#relacionamentos-no-prisma)
- [Documentação da API](#-documentação-da-api)
- [Contribuindo](#-contribuindo)

## 🚀 Tecnologias

- **[Fastify](https://www.fastify.io/)**: Framework web rápido e eficiente
- **[Prisma](https://www.prisma.io/)**: ORM moderno para acesso ao banco de dados
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado de JavaScript
- **[Zod](https://zod.dev/)**: Validação de esquemas com tipagem TypeScript
- **[JWT](https://jwt.io/)**: Autenticação baseada em tokens
- **[Husky](https://typicode.github.io/husky/)**: Hooks Git para automação
- **[Commitizen](https://commitizen-tools.github.io/commitizen/)**: Padronização de commits
- **[Jest](https://jestjs.io/)**: Framework de testes
- **[Swagger](https://swagger.io/)**: Documentação automática da API

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seunome/ApifyCloneV2.git
cd ApifyCloneV2/backend
```

> ⚠️ **Importante**: Este projeto funcionará melhor com **`YARN`** para rodar os scripts automáticos de **padronização de commit**, **padronização de código** e **formatação**.

Para instalar o YARN execute no seu terminal o comando abaixo

```bash
npm install yarn -g
```

2. Instale as dependências:

```bash
yarn install # ou apenas yarn
```

3. Configure o Husky (importante!):

```bash
yarn prepare
```

> ⚠️ **Importante**: O comando `prepare` configura o Husky, que gerencia os hooks Git para garantir qualidade do código e padronização de commits.

4. Configure o arquivo `.env` na raiz do projeto:
   Renomeie o arquivo .env.example para .env e configure de acordo com suas informações

```env
DATABASE_URL="file:./backendApiFy.db"
JWT_SECRET="sua_chave_jwt_secreta_aqui"
```

5. Execute as migrações do banco de dados:

```bash
yarn db:migrate
```

6. Gere o cliente Prisma:

```bash
yarn run db:generate
```

## 🔧 Docker

Se desejar usar docker, execute o comando abaixo na raiz do projeto.

```bash
docker compose up -d
```

## ✅ Qualidade de Código

Para garantir que seu código e mensagens de commit sempre seguirão o padrão do projeto, use sempre o comando abaixo quando for commitar alterações, caso contrário será retornado um erro.

```bash
yarn commit
```

## 🛠 Configuração

### Banco de Dados

O projeto está configurado para usar SQLite por padrão, mas você pode mudar para PostgreSQL ou qualquer outro banco suportado pelo Prisma alterando o provider no arquivo `prisma/schema.prisma`.

```prisma
datasource db {
  provider = "postgresql" // Altere de "sqlite" para "postgresql"
  url      = env("DATABASE_URL")
}
```

Em seguida, atualize sua variável de ambiente `DATABASE_URL` no arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```

## 📁 Estrutura do Projeto

```
src/
  ├── config/         # Configurações do projeto
  ├── middlewares/    # Middlewares como autenticação
  ├── repositories/   # Camada de acesso a dados
  ├── routes/         # Definição de rotas da API
  ├── services/       # Lógica de negócios
  ├── utils/          # Funções utilitárias
  ├── schemas.ts      # Schemas Zod para validação
  ├── server.ts       # Ponto de entrada do servidor
  └── types.ts        # Tipos TypeScript
```

## 📜 Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento
- **`npm run db:migrate`**: Executa migrações do Prisma
- **`npm run db:studio`**: Abre o Prisma Studio para visualizar o banco de dados
- **`npm run db:generate`**: Gera o cliente Prisma
- **`npm run test`**: Executa os testes
- **`npm run prepare`**: Configura o Husky
- **`npm run check`**: Executa o ESLint para verificar o código
- **`npm run check:fix`**: Corrige automaticamente problemas de linting
- **`npm run prettier`**: Formata o código com Prettier
- **`npm run commit`**: Adiciona e comita alterações

## 💻 Desenvolvimento

### Adicionando Novas Rotas

1. Crie um novo arquivo em `src/routes/` para o recurso (ex: `productRoutes.ts`):

```typescript
// filepath: src/routes/productRoutes.ts
import { FastifyTypedInstance } from '../types';
import { ProductService } from '../services/productService';
import { authenticate } from '../middlewares/authenticate';

export async function productRoutes(fastify: FastifyTypedInstance) {
  const productService = new ProductService();

  // Rota pública
  fastify.get(
    '/products',
    {
      schema: {
        description: 'List all products',
        tags: ['products'],
        response: {
          200: /* seu schema Zod aqui */
        }
      }
    },
    async (request, reply) => {
      const products = await productService.getAllProducts();
      return reply.send(products);
    }
  );

  // Rota protegida
  fastify.post(
    '/products',
    {
      schema: {
        description: 'Create a new product',
        tags: ['products'],
        security: [{ bearerAuth: [] }], // Indica que requer autenticação
        body: /* seu schema Zod aqui */,
        response: {
          201: /* seu schema Zod aqui */
        }
      },
      preHandler: authenticate, // Middleware de autenticação
    },
    async (request, reply) => {
      // Implementação da rota
    }
  );
}
```

2. Registre as novas rotas em `src/routes/index.ts`:

```typescript
// filepath: src/routes/index.ts
import { FastifyTypedInstance } from '../types';
import { userRoutes } from './userRoutes';
import { productRoutes } from './productRoutes';

export async function routes(fastify: FastifyTypedInstance) {
  await userRoutes(fastify);
  await productRoutes(fastify);
}
```

### Adicionando Novas Tabelas

1. Edite o arquivo `prisma/schema.prisma` para adicionar seu novo modelo:

```prisma
// filepath: prisma/schema.prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}
```

2. Atualize o modelo `User` para incluir o relacionamento:

```prisma
// filepath: prisma/schema.prisma
model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  products  Product[]
}
```

3. Execute o comando de migração:

```bash
yarn db:migrate
```

4. Crie um repositório para o novo modelo:

```typescript
// filepath: src/repositories/productRepository.ts
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  userId: string;
}

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async create(data: CreateProductData): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: { userId },
    });
  }
}
```

### Relacionamentos no Prisma

O Prisma suporta vários tipos de relacionamentos:

1. **Um para Um (1:1)**:

```prisma
// filepath: prisma/schema.prisma
model User {
  id       String    @id @default(uuid())
  profile  Profile?
}

model Profile {
  id       String    @id @default(uuid())
  bio      String
  userId   String    @unique
  user     User      @relation(fields: [userId], references: [id])
}
```

2. **Um para Muitos (1:N)**:

```prisma
// filepath: prisma/schema.prisma
model User {
  id       String    @id @default(uuid())
  posts    Post[]
}

model Post {
  id       String    @id @default(uuid())
  title    String
  content  String
  userId   String
  user     User      @relation(fields: [userId], references: [id])
}
```

3. **Muitos para Muitos (N:M)**:

```prisma
// filepath: prisma/schema.prisma
model Post {
  id        String     @id @default(uuid())
  title     String
  categories Category[] @relation("PostToCategory")
}

model Category {
  id    String  @id @default(uuid())
  name  String
  posts Post[]  @relation("PostToCategory")
}
```

## 📖 Documentação da API

A documentação da API é gerada automaticamente usando Swagger. Após iniciar o servidor, acesse:

```
http://localhost:3333/docs
```

A interface do Swagger mostrará todas as rotas disponíveis, seus parâmetros, corpo de requisição e respostas.

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/minha-feature`)
3. Execute `yarn prepare` para configurar o Husky
4. Faça suas alterações
5. Execute os testes (`yarn test`)
6. Use `yarn commit` para fazer commits padronizados
7. Envie para o branch (`git push origin feature/minha-feature`)
8. Abra um Pull Request

---

Desenvolvido por [Seu Nome](https://github.com/seunome)
