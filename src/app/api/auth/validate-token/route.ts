import { apiSuccess, apiError } from 'lib/api-utils';
import { prisma } from 'lib/prisma';

export async function POST(request: Request) {
    const { get } = await request.formData().then((fd) => ({
        get: (key: string) => fd.get(key) || '',
    }));

    const token = get('token') as string;

    if (!token) {
        return apiError('Token is required');
    }

    try {
        const decoded = Buffer.from(token, 'base64').toString();
        const [userId] = decoded.split(':');

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return apiError('Invalid token');
        }

        return apiSuccess({ valid: true });
    } catch {
        return apiError('Invalid token');
    }
}
