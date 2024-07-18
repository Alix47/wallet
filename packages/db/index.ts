import { PrismaClient, Prisma } from '@prisma/client';
import { type OnRampStatus } from '@prisma/client';


export {OnRampStatus};
export type { Prisma };
export {PrismaClient};

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
