import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './routes';
import { darkTheme } from './utils/swaggerTheme';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    /* usamos o padrão openapi */
    info: {
      title: 'Backend API',
      version: '2.0.0',
      description: 'Backend API criada usando Fastify, Zod, TypeScript, Swagger, Prisma e JWT. Utiliza o padrão Repository Pattern e Dependency Injection, tudo pensado em ser organizado e produtivo.',
      contact: {
        name: 'Daniel Alencar',
        email: 'danielmalencar2011@gmail.com',
        url: 'https://www.linkedin.com/in/daniel-melo-alencar/',
      },

      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  theme: {
    title: 'ApiFyClone API Docs',
    js: [
      // Add any custom JavaScript if needed
    ],
    css: [darkTheme],
  },
  routePrefix: '/docs',
});

app.get('/', async (_, reply) => {
  reply.send({ health: 'ok' });
});

app.register(routes);

app.register(fastifyCors, {
  origin: '*',
});

app.listen({ port: 3333 }, () => {
  console.log('Server is running on port 3333');
});
