import baseAPI from './BaseAPI';

export function listCategories(searchKeyword, page, limit) {
    const formData = new FormData();

    formData.append('keyword', searchKeyword);

    formData.append('page', page);

    formData.append('limit', limit);

    return baseAPI('Categories/list', formData);
}

export function saveCategories(data) {
    const formData = new FormData();

    formData.append('category_name', data.category_name);

    formData.append('category_name_old', data.id);

    formData.append('category_status', data.category_status ? 1 : 0);

    return baseAPI('Categories/save', formData);
}

export function removeCategories(categoryName) {
    const formData = new FormData();

    formData.append('category_name', categoryName);

    return baseAPI('Categories/remove', formData);
}

export function activeCategories() {
    const formData = new FormData();

    return baseAPI('Categories/activeList', formData);
}