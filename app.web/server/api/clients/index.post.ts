import clients from '~~/server/prisma/repos/clients';
import { createCreateHandler } from '~~/server/utils/crudHandlers';

export default createCreateHandler(clients);