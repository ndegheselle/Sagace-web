import { prisma } from '~~/server/prisma/prisma';
import getAll from '~~/server/utils/crud/getAll';

export default getAll(prisma.client);