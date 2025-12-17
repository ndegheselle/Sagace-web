import clients from '~~/prisma/repos/clients';
import { createGetAllHandler } from '~~/server/utils/crudHandlers';

export default createGetAllHandler(clients);