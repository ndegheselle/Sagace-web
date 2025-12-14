import clients from '~~/prisma/repos/clients';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Client ID is required',
        })
    }
    
    await clients.deleteById(id);
    return { success: true }
})