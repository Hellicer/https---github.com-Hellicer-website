"use strict";
exports.__esModule = true;
exports.getPrismaClient = void 0;
var adapter_pg_1 = require("@prisma/adapter-pg");
var client_1 = require("@prisma/client");
require("server-only");
var globalForPrisma = globalThis;
function createPrismaClient() {
    var _a, _b;
    console.log('🔥 createPrismaClient called');
    var connectionString = (_b = (_a = process.env.DIRECT_URL) !== null && _a !== void 0 ? _a : process.env.DATABASE_URL) !== null && _b !== void 0 ? _b : process.env.PRISMA_DATABASE_URL;
    console.log('DATABASE_URL exists:', !!connectionString);
    if (!connectionString) {
        throw new Error('Missing database connection string in environment.');
    }
    var adapter = new adapter_pg_1.PrismaPg({ connectionString: connectionString });
    console.log('🔥 PrismaPg adapter created');
    return new client_1.PrismaClient({ adapter: adapter });
}
function getPrismaClient() {
    console.log('🔥 getPrismaClient called');
    if (globalForPrisma.prisma) {
        console.log('♻️ existing prisma returned');
        return globalForPrisma.prisma;
    }
    console.log('🆕 creating prisma');
    var prisma = createPrismaClient();
    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma;
    }
    return prisma;
}
exports.getPrismaClient = getPrismaClient;
// function createPrismaClient() {
//     const connectionString =
//         process.env.DATABASE_URL ??
//         process.env.PRISMA_DATABASE_URL ??
//         process.env.DIRECT_URL
//     if (!connectionString) {
//         throw new Error('Missing database connection string in environment.')
//     }
//     const adapter = new PrismaPg({ connectionString })
//     return new PrismaClient({ adapter })
// }
// export function getPrismaClient(): PrismaClient {
//     if (globalForPrisma.prisma) {
//         return globalForPrisma.prisma
//     }
//     const prisma = createPrismaClient()
//     if (process.env.NODE_ENV !== 'production') {
//         globalForPrisma.prisma = prisma
//     }
//     return prisma
// }
