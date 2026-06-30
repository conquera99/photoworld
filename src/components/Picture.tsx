'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LeftCircleOutlined } from 'components/icons';
import { baseURL } from 'utils/constant';
import { detailPictures } from 'services/PicturesAPI';
import type { Picture as PictureType } from 'types';

interface PictureProps {
    id?: string;
    image?: PictureType;
    standalone?: boolean;
}

export default function Picture({ id, image: initialImage, standalone }: PictureProps) {
    const router = useRouter();
    const [image, setImage] = useState<PictureType | null>(initialImage || null);

    useEffect(() => {
        if (id) {
            detailPictures(id).then((response) => {
                setImage(response.data);
            });
        }
    }, [id]);

    return (
        <div className={standalone ? 'picture-container' : ''}>
            <div
                className="picture-hover"
                style={{ width: standalone ? 500 : '100%', height: 'auto', margin: '0 auto' }}
            >
                {image && (
                    <LazyLoadImage
                        key={image.pic_id}
                        style={{ width: '100%' }}
                        delayTime={0}
                        threshold={100}
                        alt={image.pic_title}
                        crossOrigin="anonymous"
                        effect="blur"
                        className="img-card"
                        placeholderSrc={`${baseURL}${image.pic_image}-thumb.jpeg`}
                        src={`${baseURL}${image.pic_image}-comp.jpeg`}
                    />
                )}

                {standalone && image && (
                    <div className="picture-captions">
                        <div className="pic-action">
                            <a onClick={() => router.back()}>
                                <LeftCircleOutlined style={{ fontSize: 40 }} />
                            </a>
                        </div>
                        <div className="pic-captions-content">
                            <h3>{image.pic_title}</h3>
                            <h4>{image.pic_category_name}</h4>
                            <h5>{image.pic_desc}</h5>
                            <h6>
                                Upload At:&nbsp;
                                {new Intl.DateTimeFormat('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: false,
                                }).format(new Date(image.pic_create_date))}
                            </h6>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
