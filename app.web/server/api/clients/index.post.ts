import clients from '~~/prisma/repos/clients';
import { createCreateHandler } from '~~/server/utils/crudHandlers';

export default createCreateHandler(clients);