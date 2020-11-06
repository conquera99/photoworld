import baseAPI, { authenticateAPI, validateTokenAPI } from './BaseAPI';

export function authenticate(username, password) {
	const formData = new FormData();

	formData.append('username', username);
	formData.append('password', password);

	return baseAPI(authenticateAPI, formData);
}

export function validateToken(token) {
	const formData = new FormData();

	formData.append('token', token);

	return baseAPI(validateTokenAPI, formData);
}
