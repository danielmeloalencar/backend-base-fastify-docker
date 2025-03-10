import { FastifyTypedInstance } from '../types';
import { userRoutes } from './userRoutes';
// import { otherRoutes } from './otherRoutes' // Adicione outras categorias conforme necessário

export async function routes(fastify: FastifyTypedInstance) {
  // Registra as rotas de usuário
  await userRoutes(fastify);

  // Registra outras categorias de rotas
  // await otherRoutes(fastify, options)
}
