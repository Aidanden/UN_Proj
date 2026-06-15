import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const globalForDb = globalThis as unknown as {
  pool?: Pool;
  prisma?: PrismaClient;
};

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString,
    max: 10,
  });

const adapter = new PrismaPg(pool);

const prisma =
  globalForDb.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
  globalForDb.prisma = prisma;
}

export { prisma, pool };
