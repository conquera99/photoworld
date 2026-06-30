import { prisma } from 'lib/prisma';
import { apiSuccess, apiError, readFormData } from 'lib/api-utils';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const where = keyword ? { picTitle: { contains: keyword } } : {};

    const [pictures, total] = await Promise.all([
        prisma.picture.findMany({
            where,
            include: { category: true },
            orderBy: { picCreateDate: 'desc' },
            skip,
            take: limit,
        }),
        prisma.picture.count({ where }),
    ]);

    return apiSuccess(pictures, {
        result: pictures,
        total,
        totalFiltered: total,
    });
}

export async function POST(request: Request) {
    const { get } = await readFormData(request);

    const picTitle = get('pic_title') as string;
    const picTitleOld = get('pic_title_old') as string;
    const picCategoryName = get('pic_category_name') as string;
    const picDesc = get('pic_desc') as string;
    const picImage = get('pic_image') as string;
    const picStatus = get('pic_status') === '1';

    if (!picTitle) {
        return apiError('Picture title is required');
    }

    try {
        if (picTitleOld) {
            const existing = await prisma.picture.findFirst({
                where: { picTitle: picTitleOld },
            });

            if (existing) {
                await prisma.picture.update({
                    where: { id: existing.id },
                    data: {
                        picTitle,
                        picCategoryName,
                        picDesc,
                        picImage: picImage || existing.picImage,
                        picStatus,
                    },
                });
            }
        } else {
            await prisma.picture.create({
                data: {
                    picTitle,
                    picCategoryName,
                    picDesc,
                    picImage,
                    picStatus,
                },
            });
        }

        return apiSuccess(null);
    } catch (error) {
        return apiError((error as Error).message);
    }
}
