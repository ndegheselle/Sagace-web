import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import AutoLoad from '@fastify/autoload';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify from 'fastify';
import path from 'node:path';
import jwt from './plugins/jwt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify({ logger: true });

// Plugins
app.register(cookie);
app.register(cors, {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});
app.register(jwt);

// Routes
app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: {
    prefix: '/api',
  },
  dirNameRoutePrefix: true,
  maxDepth: 4,
});

app.listen({
  host: '0.0.0.0',
  port: Number(process.env.PORT)
});