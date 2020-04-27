import baseAPI from './BaseAPI';

export function listPictures(searchKeyword, page, limit) {
    const formData = new FormData();

    formData.append('keyword', searchKeyword);

    formData.append('page', page);

    formData.append('limit', limit);

    return baseAPI('Pictures/list', formData);
}

export function savePictures(data) {
    const formData = new FormData();

    formData.append('pic_title', data.pic_title);

    formData.append('pic_title_old', data.id);

    formData.append('pic_category_name', data.pic_category_name);

    formData.append('pic_image', data.pic_image);

    formData.append('pic_desc', data.pic_desc);

    formData.append('pic_status', data.pic_status ? 1 : 0);

    return baseAPI('Pictures/save', formData);
}

export function removePictures(picID) {
    const formData = new FormData();

    formData.append('pic_id', picID);

    return baseAPI('Pictures/remove', formData);
}

export function activePictures() {
    const formData = new FormData();

    return baseAPI('Pictures/activeList', formData);
}

export function activePicturesByCategory(categoryName) {
    const formData = new FormData();

    if(categoryName !== 'All') {
        formData.append('pic_category_name', categoryName);
    }

    return baseAPI('Pictures/loadByCategory', formData);
}

export function detailPictures(picID) {
    const formData = new FormData();

    formData.append('pic_id', picID);

    return baseAPI('Pictures/detail', formData);
}