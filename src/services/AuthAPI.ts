import baseAPI from './BaseAPI';
import type { ApiResponse } from 'types';

interface AuthResponse {
    token: string;
}

export function authenticate(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return baseAPI<ApiResponse<AuthResponse>>('auth/authenticate', { body: formData });
}

export function validateToken(token: string) {
    const formData = new FormData();
    formData.append('token', token);
    return baseAPI<ApiResponse>('auth/validate-token', { body: formData });
}
