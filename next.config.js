const path = require('path');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withImages(
    withFonts(
        withCSS(
            withLess({
                webpack: {
                    rules: [
                        {
                            test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
                            use: [
                                {
                                    loader: 'url-loader',
                                    options: {
                                        limit: 1,
                                        size: 16,
                                        hash: 'sha512',
                                        digest: 'hex',
                                        name: '[hash].[ext]',
                                        publicPath: '/',
                                    },
                                },
                            ],
                        },
                    ],
                    resolve: {
                        alias: {
                            rsuite: path.resolve(__dirname, '../rsuite'),
                        },
                    },
                },
                lessLoaderOptions: {
                    javascriptEnabled: true,
                },
                assetPrefix: '',
            }),
        ),
    ),
);
