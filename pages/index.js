import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Modal } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Masonry from 'react-masonry-css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Container from '../components/Container';
import Navigation from '../components/Navigation';
import Picture from '../components/Picture';
import { baseURL } from '../utils/constant';

const Home = ({ images }) => {
	const router = useRouter();

	return (
		<Container>
			<div
				className="cover"
				style={{ backgroundImage: `url(${baseURL}public/cover/cover.jpg)` }}
			/>

			<Navigation />
			<div className="content">
				<h1>Conquera99 Photoworld</h1>
				<h5>
					&quot;Shot a moment that has a story and make people happy as it sees a real
					picture&quot;
				</h5>

				<Modal
					centered
					visible={!!router.query.id}
					onCancel={() => router.push('/')}
					footer={null}
					bodyStyle={{ padding: 0 }}
				>
					{router.query.id && <Picture id={router.query.id} />}
				</Modal>

				<div style={{ marginTop: '5%' }}>
					<h3>Latest Pics</h3>
					<br />
					<Masonry
						breakpointCols={{
							default: 4,
							1100: 3,
							700: 2,
							500: 1,
						}}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{images.map((item) => {
							return (
								<Link
									key={item.pic_id}
									href={`/?id=${item.pic_id}`}
									as={`/Pictures/${item.pic_id}`}
								>
									<a>
										<LazyLoadImage
											key={item.pic_id}
											style={{ width: '100%', marginBottom: 20 }}
											delayTime={0}
											threshold={100}
											alt={item.pic_title}
											crossOrigin="anonymous"
											effect="blur"
											className="img-card img-card-hover"
											placeholderSrc={`${baseURL}${item.pic_image}-thumb.jpeg`}
											src={`${baseURL}${item.pic_image}-comp.jpeg`}
										/>
									</a>
								</Link>
							);
						})}
					</Masonry>
				</div>
			</div>
		</Container>
	);
};

export async function getStaticProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	const res = await fetch(`${baseURL}Pictures/activeList`);
	const images = await res.json();

	// By returning { props: posts }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			images: images.data,
		},
	};
}

export default Home;
