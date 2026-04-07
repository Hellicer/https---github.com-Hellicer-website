import 'server-only'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    const connectionString =
        process.env.DATABASE_URL ??
        process.env.PRISMA_DATABASE_URL ??
        process.env.DIRECT_URL

    if (!connectionString) {
        throw new Error('Missing database connection string in environment.')
    }

    const adapter = new PrismaPg({ connectionString })
    return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
