import { prisma } from 'lib/prisma';
import { apiSuccess, apiError, readFormData } from 'lib/api-utils';

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { categoryName: 'asc' },
    });

    return apiSuccess(categories);
}

export async function POST(request: Request) {
    const { get } = await readFormData(request);

    const categoryName = get('category_name') as string;
    const categoryNameOld = get('category_name_old') as string;
    const categoryStatus = get('category_status') === '1';

    if (!categoryName) {
        return apiError('Category name is required');
    }

    try {
        if (categoryNameOld) {
            await prisma.category.update({
                where: { categoryName: categoryNameOld },
                data: { categoryName, categoryStatus },
            });
        } else {
            await prisma.category.create({
                data: { categoryName, categoryStatus },
            });
        }

        return apiSuccess(null);
    } catch (error) {
        return apiError((error as Error).message);
    }
}
