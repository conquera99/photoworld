'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
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

    if (standalone && image) {
        return (
            <div className="picture-detail">
                <button className="picture-detail-back" onClick={() => router.back()}>
                    &larr;
                </button>

                <div className="picture-detail-image">
                    <LazyLoadImage
                        alt={image.pic_title}
                        delayTime={0}
                        threshold={100}
                        crossOrigin="anonymous"
                        effect="blur"
                        placeholderSrc={`${baseURL}${image.pic_image}-thumb.jpeg`}
                        src={`${baseURL}${image.pic_image}-comp.jpeg`}
                    />
                </div>

                <div className="picture-detail-info">
                    <p className="picture-detail-category">{image.pic_category_name}</p>
                    <h1 className="picture-detail-title">{image.pic_title}</h1>
                    {image.pic_desc && <p className="picture-detail-desc">{image.pic_desc}</p>}
                    <p className="picture-detail-date">
                        {new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        }).format(new Date(image.pic_create_date))}
                    </p>
                </div>
            </div>
        );
    }

    return image ? (
        <LazyLoadImage
            alt={image.pic_title}
            delayTime={0}
            threshold={100}
            crossOrigin="anonymous"
            effect="blur"
            style={{ width: '100%', borderRadius: 8 }}
            placeholderSrc={`${baseURL}${image.pic_image}-thumb.jpeg`}
            src={`${baseURL}${image.pic_image}-comp.jpeg`}
        />
    ) : null;
}
