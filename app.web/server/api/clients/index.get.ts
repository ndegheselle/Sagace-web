import clients from '~~/prisma/repos/clients';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
    return clients.getAll(page, limit);
})