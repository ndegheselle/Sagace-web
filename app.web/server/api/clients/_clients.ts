import { CrudRepository } from "~~/server/prisma/CrudRepository";
import { Client } from "~~/server/prisma/generated/client";
import { prisma } from "~~/server/prisma/prisma";

export default new CrudRepository<Client>(prisma.client);