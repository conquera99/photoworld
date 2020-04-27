import Router from 'next/router'
import Link from "next/link";
import Container from "../../components/Container";
import Navigation from "../../components/Navigation";
import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Picture from "../../components/Picture";
import { Modal } from "antd";
import { Component } from "react";
import { activePicturesByCategory } from '../../services/PicturesAPI';
import { baseURL } from '../../utils/constant';
import { activeCategories } from '../../services/CategoriesAPI';

export default class Category extends Component {
    
    static getInitialProps({query}) {
        return {query}
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
        }
    }

    componentDidMount() {
        this.loadCategories();
        this.loadImages();

        Router.events.on('routeChangeComplete', this.handleRouteChange);
    }

    handleRouteChange(url) {
        this.loadImages();
    }

    loadImages() {
        const { query } = this.props;

        activePicturesByCategory(query.catId).then(response => {
            this.setState({
                images: response.data,
            });
        });
    }

    loadCategories() {
        activeCategories().then(response => {
            this.setState({
                categories: response.data,
            });
        });
    }

    render() {
        const { query } = this.props;
        const { images, categoryName, categories } = this.state;

        return (
            <Container>
                <div className="cover" style={{ backgroundImage: `url(${baseURL}public/cover/cover.jpg)` }} />
    
                <Navigation />
                <div className="content">
                    <h1>{categoryName}</h1>

                    <div className="category-container">
                        {categories.map(item => {
                            const name = item.category_name;
                            const active = query.catId === name ? 'active' : '';

                            return (
                                <Link key={name} href={`/Category/[catId]?catId=${name}`} as={`/Category/${name}`}>
                                    <a className={`category-link ${active}`}>{name}</a>
                                </Link>
                            )
                        })}
                    </div>
    
                    <Modal
                        centered
                        visible={!!query.id}
                        onCancel={() => Router.push(`/Category/[catId]?catId=${query.catId}`, `/Category/${query.catId}`)}
                        footer={null}
                        bodyStyle={{ padding: 0 }}
                    >
                        {query.id && <Picture id={query.id} modal />}
                    </Modal>
    
                    <div style={{marginTop: '5%'}}>
                        <Masonry
                            breakpointCols={{
                                default: 4,
                                1100: 3,
                                700: 2,
                                500: 1
                            }}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {images.map(item => {
                                return (
                                    <Link
                                        key={item.pic_id}
                                        href={`/Category/[catId]?catId=${query.catId}&id=${item.pic_id}`}
                                        as={`/Pictures/${item.pic_id}`}
                                    >
                                        <a>
                                            <LazyLoadImage
                                                key={item.pic_id}
                                                style={{ width: "100%", marginBottom: 20 }}
                                                delayTime={50}
                                                threshold={100}
                                                alt={item.pic_title}
                                                crossOrigin="anonymous"
                                                effect="blur"
                                                className="img-card img-card-hover"
                                                src={`${baseURL}${item.pic_image}-comp.${item.pic_ext}`}
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
