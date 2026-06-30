import { prisma } from 'lib/prisma';
import { apiSuccess } from 'lib/api-utils';

export async function GET() {
    const categories = await prisma.category.findMany({
        where: { categoryStatus: true },
        orderBy: { categoryName: 'asc' },
    });

    return apiSuccess(categories);
}
