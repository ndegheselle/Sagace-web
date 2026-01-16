import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify from 'fastify';
import jwt from './plugins/jwt.js';
import routes from './routes/index.js';

import { connect } from './database.js';

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

// Routes
app.register(routes, { prefix: '/api' });

app.listen({
  host: '0.0.0.0',
  port: Number(process.env.PORT || 3000)
});