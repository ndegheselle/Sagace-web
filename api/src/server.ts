import AutoLoad from '@fastify/autoload';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify from 'fastify';
import path from 'path';
import jwt from './plugins/jwt';

const app = fastify({ logger: true });

// --- Plugins ---
app.register(cookie);
app.register(cors, {
  // Vue dev server
  origin: process.env.CORS_ORIGIN,
  credentials: true
});
app.register(jwt);

// Routes
app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: {
    prefix: '/api',
  },
  // Use directory name as prefix
  dirNameRoutePrefix: true
});

app.listen({
  host: '0.0.0.0',
  port: Number(process.env.PORT)
});