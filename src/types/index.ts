export interface Picture {
    pic_id: string;
    pic_title: string;
    pic_desc: string;
    pic_category_name: string;
    pic_image: string;
    pic_ext: string;
    pic_status: boolean | number;
    pic_create_date: string;
}

export interface Category {
    category_name: string;
    category_status: boolean | number;
}

export interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    result: T[];
    total: number;
    totalFiltered: number;
}
