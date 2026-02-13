// lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Just create PrismaClient without any options.
// Prisma 7 will automatically read DATABASE_URL from .env or prisma.config.ts
export const db = globalThis.prisma || new PrismaClient();

// In development, attach to globalThis to prevent multiple clients on hot reload
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
