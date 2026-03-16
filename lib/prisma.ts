// Si tu utilises le client généré par défaut :
import { PrismaClient } from './generated/prisma';

// SI tu génères ton client spécifiquement dans lib/generated/prisma,
// commente la ligne du dessus et décommente celle du dessous :
// import { PrismaClient } from './generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;