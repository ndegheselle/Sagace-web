import { authenticate } from '@/plugins/jwt';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

import authRoutes from '@/routes/auth';
import articlesRoutes from '@/routes/billables/articles';
import servicesRoutes from '@/routes/billables/services';
import clientsRoutes from '@/routes/clients';
import estimatesRoutes from '@/routes/documents/estimates';
import invoicesRoutes from '@/routes/documents/invoices';
import usersRoutes from '@/routes/users';

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