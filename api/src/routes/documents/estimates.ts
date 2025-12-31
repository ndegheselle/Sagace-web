import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '@/database/prisma';
import { registerCrudRoutes } from '@/base/crudRoutes';
import type { Estimate } from '@/database/generated/client';

const clientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    registerCrudRoutes<Estimate>(fastify, {
        table: prisma.estimate,
        searchFields: ['reference' ],
    });
};

export default clientsRoutes;