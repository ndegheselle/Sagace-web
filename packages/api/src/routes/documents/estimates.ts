import { CrudController } from '@/base/CrudController';
import { type Estimate, estimatesRepo } from '@/models/documents/EstimatesRepository';
import { invoicesRepo } from '@/models/documents/InvoicesRepository';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

const estimatesRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const crud = new CrudController<Estimate>(estimatesRepo);
    fastify.get("/", crud.getAll.bind(crud));
    fastify.get("/search", crud.search.bind(crud));
    fastify.get("/:id", crud.getById.bind(crud));
    fastify.post("/", crud.create.bind(crud));
    fastify.put("/:id", crud.update.bind(crud));
    fastify.delete("/:id", crud.remove.bind(crud));
    
    fastify.post("/:id/to-invoice", async (request, reply) => {
        const { id } = request.params as { id: string };
        var estimate = await estimatesRepo.getById(id);
        if (!estimate) {
            reply.code(404);
            return;
        }

        var invoiceId = await invoicesRepo.fromEstimate(estimate);
        return {id: invoiceId};
    });
};

export default estimatesRoutes;