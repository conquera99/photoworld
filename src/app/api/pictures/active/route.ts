import { prisma } from 'lib/prisma';
import { apiSuccess } from 'lib/api-utils';

export async function GET() {
    const pictures = await prisma.picture.findMany({
        where: { picStatus: true },
        include: { category: true },
        orderBy: { picCreateDate: 'desc' },
    });

    return apiSuccess(pictures);
}
