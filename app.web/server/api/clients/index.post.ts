import { prisma } from '~~/server/prisma/prisma';
import create from '~~/server/utils/crud/create';

export default create(prisma.client);