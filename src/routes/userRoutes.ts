import { FastifyTypedInstance } from '../types';
import { userSchemas } from '../schemas';
import { UserService } from '../services/userService';
import { authenticate } from '../middlewares/authenticate';

export async function userRoutes(fastify: FastifyTypedInstance) {
  const userService = new UserService();

  // Rota para login com schema Zod
  fastify.post(
    '/login',
    {
      schema: userSchemas.login,
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body as { email: string; password: string };
        const authResult = await userService.authenticateUser(email, password);

        return reply.send({
          token: authResult.token,
          user: {
            id: authResult.user.id,
            name: authResult.user.name,
            email: authResult.user.email,
          },
        });
      } catch (error: any) {
        if (error.message === 'Invalid credentials') {
          return reply.code(401).send({ message: 'Email ou senha inválidos' });
        }

        return reply.code(500).send({ message: 'Erro interno do servidor' });
      }
    },
  );

  // Rota GET /users
  fastify.get(
    '/users',
    {
      schema: userSchemas.list,
      preHandler: authenticate,
    },
    async (request, reply) => {
      const users = await userService.getAllUsers();
      return reply.send(users);
    },
  );

  // Rota POST /users (registro)
  fastify.post(
    '/users',
    {
      schema: userSchemas.create,
    },
    async (request, reply) => {
      try {
        await userService.createUser({
          name: request.body.name,
          email: request.body.email,
          password: request.body.password,
        });

        return reply.code(201).send({ message: 'Usuário criado com sucesso' });
      } catch (error: any) {
        if (error.message === 'Email already in use') {
          return reply.code(409).send({ message: 'Email já está em uso' });
        }

        return reply.code(500).send({ message: 'Erro interno do servidor' });
      }
    },
  );

  // Rota protegida de exemplo - perfil do usuário
  fastify.get(
    '/profile',
    {
      schema: userSchemas.profileSchema,
      preHandler: authenticate,
    },
    async (request: any, reply) => {
      try {
        const userId = request.user.id;
        const user = await userService.getUserById(userId);

        if (!user) {
          return reply.code(404).send({ message: 'Usuário não encontrado' });
        }

        return reply.send({
          id: user.id,
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.log({ error });
        return reply.code(500).send({ message: 'Erro interno do servidor' });
      }
    },
  );
}
