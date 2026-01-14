import { CrudController } from '@/base/CrudController.js';
import { type Client, clientsRepo } from '@/models/ClientsRepository.js';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

const clientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const crud = new CrudController<Client>(clientsRepo);
    fastify.get("/", crud.getAll.bind(crud));
    fastify.get("/search", crud.search.bind(crud));
    fastify.get("/:id", crud.getById.bind(crud));
    fastify.post("/", crud.create.bind(crud));
    fastify.put("/:id", crud.update.bind(crud));
    fastify.delete("/:id", crud.remove.bind(crud));
};

export default clientsRoutes;