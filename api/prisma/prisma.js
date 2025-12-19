import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { env } from "prisma/config";
import { PrismaClient } from './generated/client';

const adapter = new PrismaBetterSqlite3({
  url: env("DATABASE_URL")
});
const prisma = new PrismaClient({ adapter });

export { prisma };
