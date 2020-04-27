import { Component } from "react";
import Head from 'next/head';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { baseURL } from "../utils/constant";
import { detailPictures } from "../services/PicturesAPI";
import { LeftCircleOutlined } from '@ant-design/icons';
import Router from "next/router";
import moment from "moment";

export default class Picture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
        };
    }

    componentDidMount() {
        const { id, image } = this.props;

        if (id) {
            detailPictures(id).then((response) => {
                this.setState({
                    image: response.data,
                });
            });
        } else {
            this.setState({
                image: image,
            });
        }
    }

    render() {
		const { standalone } = this.props;
		const { image } = this.state;

        return (
            <div className={ standalone ? "picture-container" : ""}>
                {standalone && image && 
                    <Head>
                        <title>{image.pic_title}</title>
                        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet" />
                        <link rel="icon" href="/logo.png" />

                        <meta charSet="UTF-8"/>
                        <meta name="description" content="Conquera99 Photoworld, welcome to my website, enjoy all the images, I hope it can give you a stories that can be remembered forever."/>
                        <meta name="keywords" content="Conquera99, photography, portfolio, gallery, benny, conquera99 photoworld"/>
                        <meta name="author" content="Benny"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    </Head>
                }

                <div className="picture-hover" style={{width: standalone ? 500 : "100%", height: 'auto', margin: '0 auto'}}>
                    {image && (
                        <LazyLoadImage
                            key={image.pic_id}
                            style={{ width: "100%" }}
                            delayTime={0}
                            threshold={100}
                            alt={image.pic_title}
                            crossOrigin="anonymous"
                            effect="blur"
                            className="img-card"
                            placeholderSrc={`${baseURL}${image.pic_image}-thumb.${image.pic_ext}`}
                            src={`${baseURL}${image.pic_image}-comp.${image.pic_ext}`}
                        />
                    )}

                    {standalone && image && <div className="picture-captions">

                        <div className="pic-action">
                            <a onClick={() => Router.back()}>
                                <LeftCircleOutlined style={{fontSize: 40}} />
                            </a>
                        </div>
                        <div className="pic-captions-content">
                            <h3>{image.pic_title}</h3>
                            <h4>{image.pic_category_name}</h4>
                            <h5>{image.pic_desc}</h5>
                            <h6>Upload At: {moment(image.pic_create_date).format('DD MMM YYYY HH:mm:ss')}</h6>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}
