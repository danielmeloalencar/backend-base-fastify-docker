import z from 'zod';

// Schemas de usuário
export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const usersResponseSchema = z.array(userResponseSchema);

export const createUserBodySchema = z.object({
  name: z.string().min(3, 'Min 3 caracteres').max(255),
  email: z.string().email('Email Obrigatorio').max(255),
  password: z.string().min(6).max(255),
});

// Schema para login - utilizando Zod
export const loginBodySchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const loginResponseSchema = z.object({
  user: userResponseSchema,
  token: z.string(),
});

// Mapeamento de schemas para documentação
export const userSchemas = {
  list: {
    description: 'List all users',
    tags: ['users'],
    security: [{ bearerAuth: [] }], // Adicione esta linha
    response: {
      200: usersResponseSchema,
    },
  },
  create: {
    description: 'Create a new user',
    tags: ['users'],
    body: createUserBodySchema,
    response: {
      201: z.object({ message: z.string() }), // Created
      409: z.object({ message: z.string() }), // Conflict
      500: z.object({ message: z.string() }), // Internal Server Error
    },
  },

  login: {
    description: 'Authenticate user and get token',
    tags: ['auth'],
    body: loginBodySchema,
    response: {
      200: loginResponseSchema,
      401: z.object({ message: z.string() }), // Unauthorized
      500: z.object({ message: z.string() }), // Internal Server Error
    },
  },

  // Adicione um schema para a rota de perfil
  profileSchema: {
    description: 'Get user profile',
    tags: ['users'],
    security: [{ bearerAuth: [] }],
    response: {
      200: userResponseSchema,
      401: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
  },
};
