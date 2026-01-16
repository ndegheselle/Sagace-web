import { usersRepo } from '@/models/UsersRepository.js';
import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const usersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.get('/current', async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = request.user.id;
        const entity = await usersRepo.getById(userId);

        if (!entity) {
            reply.code(404);
            return;
        }

        return entity;
    });
};

export default usersRoutes;