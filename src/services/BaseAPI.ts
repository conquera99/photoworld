import { notification } from 'antd';
import { getSession } from 'next-auth/react';
import { baseURL } from 'utils/constant';

export default async function APIRequest<T = unknown>(
    URL: string,
    options: {
        method?: string;
        body?: FormData | null;
        params?: Record<string, string>;
    } = {},
): Promise<T> {
    const session = await getSession();
    const token = session?.token || '';

    const { method = 'POST', body = null, params } = options;

    let url = baseURL + URL;

    if (params) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'x-token': token,
                'x-language': 'en',
            },
            body: method === 'GET' ? undefined : body,
        });

        const responseJSON = await response.json();

        if (responseJSON.code === 0) {
            return responseJSON;
        } else {
            notification.error({
                message: 'Error',
                description: responseJSON.message,
            });
        }
    } catch (error) {
        notification.error({
            message: 'Error',
            description: (error as Error).message,
        });
    }

    return undefined as T;
}
