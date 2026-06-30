import { prisma } from 'lib/prisma';
import { apiSuccess, apiError } from 'lib/api-utils';

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await prisma.category.delete({
            where: { categoryName: id },
        });

        return apiSuccess(null);
    } catch (error) {
        return apiError((error as Error).message);
    }
}
