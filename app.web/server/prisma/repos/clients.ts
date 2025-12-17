import { prisma } from "../prisma";
import { CrudRepository } from "./CrudRepository";
import type { Client } from "~~/server/prisma/generated/client";

export default new CrudRepository<Client>(prisma.client);