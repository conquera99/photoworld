import Router from 'next/router'
import Link from "next/link";
import Container from "../components/Container";
import Navigation from "../components/Navigation";
import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Picture from "../components/Picture";
import { Modal } from "antd";
import { Component } from "react";
import { activePictures } from '../services/PicturesAPI';
import { baseURL } from '../utils/constant';

export default class Home extends Component {
    
    static getInitialProps({query}) {
        return {query}
    }

    constructor(props) {
        super(props);

        this.loadImages = this.loadImages.bind(this);

        this.state = {
            images: [],
        }
    }

    componentDidMount() {
        this.loadImages();
    }

    loadImages() {
        activePictures().then(response => {
            this.setState({
                images: response.data,
            });
        });
    }

    render() {
        const { query } = this.props;
        const { images } = this.state;

        return (
            <Container>
                <div className="cover" style={{ backgroundImage: `url(${baseURL}public/cover/cover.jpg)` }} />
    
                <Navigation />
                <div className="content">
                    <h1>Conquera99 Photoworld</h1>
                    <h5>
                        "Shot a moment that has a story and make people happy as it sees a real picture"
                    </h5>
    
                    <Modal
                        centered
                        visible={!!query.id}
                        onCancel={() => Router.push("/")}
                        footer={null}
                        bodyStyle={{ padding: 0 }}
                    >
                        {query.id && <Picture id={query.id} />}
                    </Modal>
    
                    <div style={{ marginTop: "5%", marginBottom: 20 }}>
                        <h3>Latest Pics</h3>
                        <br />
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
                                        href={`/?id=${item.pic_id}`}
                                        as={`/Pictures/${item.pic_id}`}
                                    >
                                        <a>
                                            <LazyLoadImage
                                                key={item.pic_id}
                                                style={{ width: "100%" }}
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
