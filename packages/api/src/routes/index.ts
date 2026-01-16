import { authenticate } from '@/plugins/jwt.js';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

import authRoutes from '@/routes/auth.js';
import articlesRoutes from '@/routes/billables/articles.js';
import servicesRoutes from '@/routes/billables/services.js';
import clientsRoutes from '@/routes/clients.js';
import estimatesRoutes from '@/routes/documents/estimates.js';
import invoicesRoutes from '@/routes/documents/invoices.js';
import usersRoutes from '@/routes/users.js';

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.register(authRoutes, { prefix: '/auth' });

    fastify.register(async (protectedRoutes) => {
        protectedRoutes.addHook('preHandler', authenticate);

        protectedRoutes.register(clientsRoutes, { prefix: '/clients' });
        protectedRoutes.register(usersRoutes, { prefix: '/users' });
        protectedRoutes.register(articlesRoutes, { prefix: '/billables/articles' });
        protectedRoutes.register(servicesRoutes, { prefix: '/billables/services' });
        protectedRoutes.register(estimatesRoutes, { prefix: '/documents/estimates' });
        protectedRoutes.register(invoicesRoutes, { prefix: '/documents/invoices' });
    });
};

export default routes;