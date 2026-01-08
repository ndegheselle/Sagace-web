import { CrudController } from '@/base/CrudController';
import { type Service, servicesRepo } from '@/models/billables/ServicesRepository';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

const servicesRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const crud = new CrudController<Service>(servicesRepo);
    fastify.get("/", crud.getAll.bind(crud));
    fastify.get("/search", crud.search.bind(crud));
    fastify.get("/:id", crud.getById.bind(crud));
    fastify.post("/", crud.create.bind(crud));
    fastify.put("/:id", crud.update.bind(crud));
    fastify.delete("/:id", crud.remove.bind(crud));
};

export default servicesRoutes;