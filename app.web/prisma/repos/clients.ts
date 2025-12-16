import { prisma } from "../prisma";
import type { Client } from '../generated/client';
import { BaseRepository } from "./BaseRepository";

export default new BaseRepository<Client>(prisma.client);;