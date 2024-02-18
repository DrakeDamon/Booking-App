// src/server/db.ts

import { PrismaClient } from "@prisma/client";

// Assuming you have a DATABASE_URL environment variable
const databaseUrl = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export { prisma };
