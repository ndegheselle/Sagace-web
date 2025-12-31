import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '@/database/prisma';
import { registerCrudRoutes } from '@/base/crudRoutes';
import type { Service } from '@/database/generated/client';

const clientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    registerCrudRoutes<Service>(fastify, {
        table: prisma.service,
        searchFields: ['name', 'code'],
    });
};

export default clientsRoutes;