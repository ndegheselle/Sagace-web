import clients from '~~/server/prisma/repos/clients';
import { createDeleteHandler } from '~~/server/utils/crudHandlers';

export default createDeleteHandler(clients);