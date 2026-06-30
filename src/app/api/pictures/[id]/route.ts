import { prisma } from 'lib/prisma';
import { apiSuccess, apiError } from 'lib/api-utils';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const picture = await prisma.picture.findUnique({
        where: { id },
        include: { category: true },
    });

    if (!picture) {
        return apiError('Picture not found');
    }

    return apiSuccess(picture);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await prisma.picture.delete({ where: { id } });
        return apiSuccess(null);
    } catch (error) {
        return apiError((error as Error).message);
    }
}
