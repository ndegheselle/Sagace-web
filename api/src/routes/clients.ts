import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '@/database/prisma';
import { CrudController } from '@/base/CrudController';
import type { Client } from '@/database/generated/client';

const clientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const controller = new CrudController<Client>(
        prisma.client,
        ["email", "name"]
    );
    controller.registerRoutes(fastify);
};

export default clientsRoutes;