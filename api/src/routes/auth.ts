import type { FastifyInstance, FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';

// Replace with real DB logic
async function fakeUserLookup(email: string, password: string) {
    if (email !== 'admin@test.com') return null

    return {
        id: '1',
        email,
        password: 'password',
        role: 'admin',
    }
}

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        const { email, password } = request.body as {
            email: string
            password: string
        };

        if (!email || !password) {
            return reply.code(400).send({ message: 'Missing credentials' });
        }

        const user = await fakeUserLookup(email, password);
        if (!user) {
            return reply.code(401).send({ message: 'Invalid email or password' });
        }

        const token = fastify.jwt.sign({
            id: user.id
        });

        return reply.send({ token });
    })
};

export default authRoutes;