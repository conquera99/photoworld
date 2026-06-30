import { prisma } from 'lib/prisma';
import { apiSuccess } from 'lib/api-utils';

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;

    const where = name === 'All' ? { picStatus: true } : { picCategoryName: name, picStatus: true };

    const pictures = await prisma.picture.findMany({
        where,
        include: { category: true },
        orderBy: { picCreateDate: 'desc' },
    });

    return apiSuccess(pictures);
}
