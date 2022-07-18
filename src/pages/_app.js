import App from 'next/app';

require('styles/globals.less');

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}
