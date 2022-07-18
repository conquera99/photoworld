import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const baseURL = publicRuntimeConfig.apiUrl || 'http://localhost/portfolio-admin/';
