import { notification } from 'antd';

import cookie from 'react-cookies';
import { baseURL } from '../utils/constant';

const tokenHeaderName = 'x-token';
const languageHeaderName = 'x-language';

const AuthEndPoint = 'Auth/';
export const authenticateAPI = `${AuthEndPoint}authenticate`;
export const validateTokenAPI = `${AuthEndPoint}validateToken`;
export const tokenName = 'token';

/**
 * API Request
 *
 * @param URL stringURL *required
 * @param formData FormData *optional
 * @param mode string *optional
 * @returns {Promise<T>}
 * @constructor
 */
export default function APIRequest(URL, formData = null, mode = 'POST') {
	const token = cookie && cookie.load(tokenName);
	const language = 'en';

	return new Promise((resolve) => {
		fetch(baseURL + URL, {
			method: mode,
			headers: {
				[tokenHeaderName]: token,
				[languageHeaderName]: language,
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((responseJSON) => {
				if (responseJSON.error_code === 0) {
					resolve(responseJSON);
				} else {
					notification.error({
						message: 'Error',
						description: responseJSON.error_message,
					});
				}
			})
			.catch((error) => {
				notification.error({
					message: 'Error',
					description: error.message,
				});
			});
	});
}
