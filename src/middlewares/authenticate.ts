import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/auth';

interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    id: string;
  };
}

export async function authenticate(request: AuthenticatedRequest, reply: FastifyReply): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      reply.code(401).send({ message: 'Token não fornecido' });
      return;
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      reply.code(401).send({ message: 'Token mal formatado' });
      return;
    }

    const decoded = verifyToken(token);

    // Adicionar o ID do usuário decodificado à requisição para uso posterior
    request.user = {
      id: decoded.id,
    };
  } catch (error) {
    console.log({ error });
    reply.code(401).send({ message: 'Token inválido' });
  }
}
