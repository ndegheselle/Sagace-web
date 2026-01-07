import { CrudController } from '@/base/CrudController';
import { type Client, clientsRepo } from '@/models/ClientsRepository';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

const clientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const controller = new CrudController<Client>(clientsRepo);
    controller.registerRoutes(fastify);
};

export default clientsRoutes;