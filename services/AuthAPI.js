import baseAPI from './BaseAPI';
import {authenticateAPI, validateTokenAPI} from "./BaseAPI";

export function authenticate(username, password) {
    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    return baseAPI(authenticateAPI, formData);
}

export function validateToken(token) {
    let formData = new FormData();

    formData.append('token', token);

    return baseAPI(validateTokenAPI, formData);
}
