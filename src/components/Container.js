import Head from 'next/head';

export default function Container({ children }) {
	return (
		<div>
			<Head>
				<title>Portfolio</title>
				<link rel="icon" href="/logo.png" />

				<meta charSet="UTF-8" />
				<meta
					name="description"
					content="Conquera99 Photoworld, welcome to my website, enjoy all the images, I hope it can give you a stories that can be remembered forever."
				/>
				<meta
					name="keywords"
					content="Conquera99, photography, portfolio, gallery, benny, conquera99 photoworld"
				/>
				<meta name="author" content="Benny" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			{children}
		</div>
	);
}
