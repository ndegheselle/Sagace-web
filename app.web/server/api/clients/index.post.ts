import { Client } from '~~/prisma/generated/client';
import clients from '~~/prisma/repos/clients';

export default defineEventHandler(async (event) => {
    const client = await readBody<Client>(event);

    if (!client.firstName || !client.lastName || !client.email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        })
    }

    return clients.create(client);
})