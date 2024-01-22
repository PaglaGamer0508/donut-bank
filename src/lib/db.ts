"server-only";

import { PrismaClient } from "@prisma/client";

// Create a new type that extends the NodeJS.Global interface with an optional prisma property
type CustomNodeJSGlobal = typeof globalThis & {
  prisma?: PrismaClient;
};

// Then, cast the global variable to the new type
let globalNode = global as CustomNodeJSGlobal;

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalNode.prisma) {
    globalNode.prisma = new PrismaClient();
  }
  prisma = globalNode.prisma;
}

export const db = prisma;
