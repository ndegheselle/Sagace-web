import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import path from 'node:path';
import jwt from './plugins/jwt';
import routes from './routes/index';

import { connect } from './database';

connect().catch(console.error);

const app = fastify({ logger: true });

// Plugins
app.register(cookie);
app.register(cors, {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
});
app.register(jwt);
app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  }
});
app.register(fastifyStatic, {
  root: path.join(process.cwd(), 'uploads'),
  prefix: '/api/images/', // exposed route
});

// Routes
app.register(routes, { prefix: '/api' });

app.listen({
  host: '0.0.0.0',
  port: Number(process.env.PORT || 3000)
});