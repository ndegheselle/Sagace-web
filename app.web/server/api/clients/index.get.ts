import clients from '~~/prisma/repos/clients';
import { createListHandler } from '~~/server/utils/crudHandlers';

export default createListHandler(clients);