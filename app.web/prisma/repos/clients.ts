import type { Client } from '../generated/client';
import { prisma } from "../prisma";
import { CrudRepository } from "./CrudRepository";

export default new CrudRepository<Client>(prisma.client);;