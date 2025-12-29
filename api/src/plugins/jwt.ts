import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET,
    });

    fastify.decorate(
        'authenticate',
        async function (request, reply) {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        }
    );
});