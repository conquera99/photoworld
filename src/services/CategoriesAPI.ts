import baseAPI from './BaseAPI';
import type { ApiResponse, PaginatedResponse, Category } from 'types';

export function listCategories(searchKeyword: string, page: number, limit: number) {
    return baseAPI<PaginatedResponse<Category>>('categories', {
        method: 'GET',
        params: { keyword: String(searchKeyword), page: String(page), limit: String(limit) },
    });
}

export function saveCategories(data: Record<string, unknown>) {
    const formData = new FormData();
    formData.append('category_name', data.category_name as string);
    formData.append('category_name_old', data.id as string);
    formData.append('category_status', data.category_status ? '1' : '0');
    return baseAPI<ApiResponse>('categories', { body: formData });
}

export function removeCategories(categoryName: string) {
    return baseAPI<ApiResponse>(`categories/${encodeURIComponent(categoryName)}`, {
        method: 'DELETE',
    });
}

export function activeCategories() {
    return baseAPI<{ data: Category[] } & ApiResponse>('categories/active', { method: 'GET' });
}
