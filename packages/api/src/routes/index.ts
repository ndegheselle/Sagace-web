import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

import clientsRoutes from '@/routes/clients.js';
import authRoutes from '@/routes/auth.js';

import articlesRoutes from '@/routes/billables/articles.js';
import servicesRoutes from '@/routes/billables/services.js';
import estimatesRoutes from '@/routes/documents/estimates.js';
import invoicesRoutes from '@/routes/documents/invoices.js';

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.register(authRoutes, { prefix: '/auth' });
    fastify.register(clientsRoutes, { prefix: '/clients' });

    fastify.register(articlesRoutes, { prefix: '/billables/articles' });
    fastify.register(servicesRoutes, { prefix: '/billables/services' });
    fastify.register(estimatesRoutes, { prefix: '/documents/estimates' });
    fastify.register(invoicesRoutes, { prefix: '/documents/invoices' });
};

export default routes;