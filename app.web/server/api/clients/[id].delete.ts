import { prisma } from '~~/server/prisma/prisma';
import remove from '~~/server/utils/crud/remove';

export default remove(prisma.client);