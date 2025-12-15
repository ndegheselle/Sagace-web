import { prisma } from "../prisma";
import type { Client } from '../generated/client';
import { Paginated } from "~~/shared/base/paginated";
import { BaseRepository } from "./BaseRepository";

async function create(client: Client): Promise<Client> {
    return await prisma.client.create({
      data: client,
    })
}

async function getAll(page: number = 1, limit: number = 10): Promise<Paginated<Client>> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
    prisma.client.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.client.count(),
  ])
  return new Paginated<Client>(data, total, page, limit);
}

async function deleteById(id: string): Promise<Client> {
    return await prisma.client.delete({
        where: { id }
    });
}

const clientRepository = new BaseRepository<Client>(prisma.client);

export default clientRepository;