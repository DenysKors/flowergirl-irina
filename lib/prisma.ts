// import { PrismaClient } from "../prisma/generated/client";

// const prismaClientSingleton = () => {
//   const basePrisma = new PrismaClient();

//   return basePrisma.$extends({
//     result: {
//       product: {
//         price: {
//           needs: { price: true },
//           compute(product) {
//             return product.price.toNumber();
//           },
//         },
//       },
//     },
//   });
// };

// export type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

// declare global {
//   var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// export default prisma;

// import { PrismaClient } from "../prisma/generated/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// export default prisma;

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../prisma/generated/client";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 1,
});

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
