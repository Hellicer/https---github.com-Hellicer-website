import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import 'server-only'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    console.log('🔥 createPrismaClient called')

    const connectionString =
        process.env.DIRECT_URL ??
        process.env.DATABASE_URL ??
        process.env.PRISMA_DATABASE_URL

    console.log('DATABASE_URL exists:', !!connectionString)

    if (!connectionString) {
        throw new Error('Missing database connection string in environment.')
    }

    const adapter = new PrismaPg({ connectionString })

    console.log('🔥 PrismaPg adapter created')

    return new PrismaClient({ adapter })
}

export function getPrismaClient(): PrismaClient {
    console.log('🔥 getPrismaClient called')

    if (globalForPrisma.prisma) {
        console.log('♻️ existing prisma returned')
        return globalForPrisma.prisma
    }

    console.log('🆕 creating prisma')

    const prisma = createPrismaClient()

    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma
    }

    return prisma
}
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
