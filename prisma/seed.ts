import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data: [
            { categoryName: 'Nature', categoryStatus: true },
            { categoryName: 'Portrait', categoryStatus: true },
            { categoryName: 'Street', categoryStatus: true },
        ],
    });

    console.log('Seeded categories');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
