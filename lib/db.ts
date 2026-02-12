import { PrismaClient } from "@prisma/client";

// Keep a global reference to the PrismaClient instance so that during
// hot-reloads in development we don't create many instances which can
// exhaust database connections. This pattern is recommended by Prisma.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create or reuse the PrismaClient singleton. Export `db` for app-wide use.
// Usage: import { db } from "@/lib/db" and call `db.<model>` to query.
export const db = globalThis.prisma || new PrismaClient();

// In development, attach the instance to the global object so it can be reused
// across module reloads. In production we don't attach it to global to avoid
// keeping the instance around unnecessarily in certain environments.
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;