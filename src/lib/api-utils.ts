import { NextResponse } from 'next/server';

export function apiSuccess<T>(data: T, extra?: Record<string, unknown>) {
    return NextResponse.json({
        code: 0,
        message: 'Success',
        data,
        ...extra,
    });
}

export function apiError(message: string, code = 1) {
    return NextResponse.json({
        code,
        message,
        data: null,
    });
}

export async function readFormData(request: Request) {
    const formData = await request.formData();
    const get = (key: string) => formData.get(key) || '';
    return { formData, get };
}
