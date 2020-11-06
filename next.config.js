const path = require('path');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = withImages(
	withFonts(
		withCSS(
			withLess({
				webpack: (config, { isServer }) => {
					if (isServer) {
						const antStyles = /antd\/.*?\/style.*?/;
						const origExternals = [...config.externals];
						config.externals = [
							(context, request, callback) => {
								if (request.match(antStyles)) return callback();
								if (typeof origExternals[0] === 'function') {
									origExternals[0](context, request, callback);
								} else {
									callback();
								}
							},
							...(typeof origExternals[0] === 'function' ? [] : origExternals),
						];

						config.module.rules.unshift({
							test: antStyles,
							use: 'null-loader',
						});
					} else {
						config.resolve.alias = {
							...config.resolve.alias,
							'@ant-design/icons/lib/dist$': path.resolve(`./icons/index.js`),
						};
					}

					config.plugins.push(new DuplicatePackageCheckerPlugin());
					config.plugins.push(new MomentLocalesPlugin());

					return config;
				},
				loader: 'less-loader',
				lessLoaderOptions: {
					javascriptEnabled: true,
				},
				assetPrefix: '',
				poweredByHeader: false,
			}),
		),
	),
);
