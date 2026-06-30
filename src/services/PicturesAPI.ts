import baseAPI from './BaseAPI';
import type { ApiResponse, PaginatedResponse, Picture } from 'types';

export function listPictures(searchKeyword: string, page: number, limit: number) {
    return baseAPI<PaginatedResponse<Picture>>('pictures', {
        method: 'GET',
        params: { keyword: String(searchKeyword), page: String(page), limit: String(limit) },
    });
}

export function savePictures(data: Record<string, unknown>) {
    const formData = new FormData();
    formData.append('pic_title', data.pic_title as string);
    formData.append('pic_title_old', data.id as string);
    formData.append('pic_category_name', data.pic_category_name as string);
    formData.append('pic_image', data.pic_image as string);
    formData.append('pic_desc', data.pic_desc as string);
    formData.append('pic_status', data.pic_status ? '1' : '0');
    return baseAPI<ApiResponse>('pictures', { body: formData });
}

export function removePictures(picID: string) {
    return baseAPI<ApiResponse>(`pictures/${picID}`, { method: 'DELETE' });
}

export function activePictures() {
    return baseAPI<{ data: Picture[] } & ApiResponse>('pictures/active', { method: 'GET' });
}

export function activePicturesByCategory(categoryName: string) {
    return baseAPI<{ data: Picture[] } & ApiResponse>(`pictures/category/${categoryName}`, {
        method: 'GET',
    });
}

export function detailPictures(picID: string) {
    return baseAPI<{ data: Picture } & ApiResponse>(`pictures/${picID}`, { method: 'GET' });
}
