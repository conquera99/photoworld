import { prisma } from 'lib/prisma';
import { apiSuccess, apiError } from 'lib/api-utils';

export async function POST(request: Request) {
    const { get } = await request.formData().then((fd) => ({
        get: (key: string) => fd.get(key) || '',
    }));

    const username = get('username') as string;
    const password = get('password') as string;

    if (!username || !password) {
        return apiError('Username and password are required');
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || user.password !== password) {
        return apiError('Invalid credentials');
    }

    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    return apiSuccess({ token });
}
