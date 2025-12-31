import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '@/database/prisma';
import { registerCrudRoutes } from '@/base/crudRoutes';
import type { Invoice } from '@/database/generated/client';

const clientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    registerCrudRoutes<Invoice>(fastify, {
        table: prisma.invoice,
        searchFields: [ 'invoiceNumber' ],
    });
};

export default clientsRoutes;