import Router from 'next/router';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Modal, Empty, Spin } from 'antd';
import { Component } from 'react';

import 'react-lazy-load-image-component/src/effects/blur.css';

import Container from 'components/Container';
import Navigation from 'components/Navigation';
import Picture from 'components/Picture';

import { baseURL } from 'utils/constant';

import { activePicturesByCategory } from 'services/PicturesAPI';
import { activeCategories } from 'services/CategoriesAPI';

export default class Category extends Component {
	static getInitialProps({ query }) {
		return { query };
	}

	constructor(props) {
		super(props);

		this.loadImages = this.loadImages.bind(this);
		this.loadCategories = this.loadCategories.bind(this);
		this.handleRouteChange = this.handleRouteChange.bind(this);

		this.state = {
			categoryName: 'All Category',
			categories: [],
			images: [],
			latestUrl: '',
			loading: true,
		};
	}

	componentDidMount() {
		this.loadCategories();
		this.loadImages();

		Router.events.on('routeChangeComplete', this.handleRouteChange);
	}

	handleRouteChange(url) {
		const { latestUrl } = this.state;

		// console.log('currentURL', url);
		// console.log('latestURL', latestUrl);

		if (url.toString().includes('Category') && !latestUrl.includes('Pictures')) {
			this.setState(
				{
					images: [],
					latestUrl: url,
					loading: true,
				},
				() => {
					this.loadImages();
				},
			);
		} else {
			this.setState({
				latestUrl: url,
			});
		}
	}

	loadImages() {
		const { query } = this.props;

		activePicturesByCategory(query.catId).then((response) => {
			this.setState({
				images: response.data,
				loading: false,
			});
		});
	}

	loadCategories() {
		activeCategories().then((response) => {
			this.setState({
				categories: response.data,
			});
		});
	}

	render() {
		const { query } = this.props;
		const { images, categoryName, categories, loading } = this.state;

		return (
			<Container>
				<div
					className="cover"
					style={{ backgroundImage: `url(${baseURL}public/cover/cover.jpg)` }}
				/>

				<Navigation />
				<div className="content">
					<h1>{categoryName}</h1>

					<div className="category-container">
						{categories.map((item) => {
							const name = item.category_name;
							const active = query.catId === name ? 'active' : '';

							return (
								<Link
									key={name}
									href={`/Category/[catId]?catId=${name}`}
									as={`/Category/${name}`}
								>
									<a className={`category-link ${active}`}>{name}</a>
								</Link>
							);
						})}
					</div>

					<Modal
						centered
						visible={!!query.id}
						onCancel={() =>
							Router.push(
								`/Category/[catId]?catId=${query.catId}`,
								`/Category/${query.catId}`,
							)
						}
						footer={null}
						bodyStyle={{ padding: 0 }}
					>
						{query.id && <Picture id={query.id} modal />}
					</Modal>

					<div style={{ marginTop: '5%' }}>
						{loading && <Spin size="large" />}

						{!loading && images.length === 0 && <Empty />}

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
										href={`/Category/[catId]?catId=${query.catId}&id=${item.pic_id}`}
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
	}
}
