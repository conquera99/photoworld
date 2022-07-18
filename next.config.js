const path = require('path');
const withAntdLess = require('next-plugin-antd-less');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = withBundleAnalyzer(
	withAntdLess({
		webpack: (config, { isServer }) => {
			if (isServer) {
				const antStyles = /antd\/.*?\/style.*?/;

				config.module.rules.unshift({
					test: antStyles,
					use: 'null-loader',
				});
			} else {
				config.resolve.alias = {
					...config.resolve.alias,
					'@ant-design/icons/lib/dist$': path.resolve(`./src/components/icons.js`),
				};
			}

			config.plugins.push(new MomentLocalesPlugin());

			return config;
		},
		productionBrowserSourceMaps: true,
		assetPrefix: '',
		poweredByHeader: false,
		swcMinify: true,
		compiler: {
			removeConsole: process.env.NODE_ENV === 'production',
		},
		publicRuntimeConfig: {
			apiUrl: process.env.API_URL || '',
		},
	}),
);
