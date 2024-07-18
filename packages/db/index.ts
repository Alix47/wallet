import { PrismaClient, Prisma } from '@prisma/client';
import { OnRampStatus } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
export type { Prisma };
export {PrismaClient}

type OnRampStatusType = OnRampStatus;
export type {OnRampStatusType};

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
