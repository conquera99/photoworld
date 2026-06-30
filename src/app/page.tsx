'use client';

import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { Modal } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Navigation from 'components/Navigation';
import Picture from 'components/Picture';
import { baseURL } from 'utils/constant';
import { activePictures } from 'services/PicturesAPI';
import type { Picture as PictureType } from 'types';

function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modalId = searchParams.get('id');
    const [images, setImages] = useState<PictureType[]>([]);

    useEffect(() => {
        activePictures().then((response) => {
            setImages(response.data);
        });
    }, []);

    return (
        <div>
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
                    open={!!modalId}
                    onCancel={() => router.push('/')}
                    footer={null}
                    styles={{ body: { padding: 0 } }}
                >
                    {modalId && <Picture id={modalId} />}
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
                        {images.map((item) => (
                            <Link key={item.pic_id} href={`/?id=${item.pic_id}`}>
                                <LazyLoadImage
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
                            </Link>
                        ))}
                    </Masonry>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <Suspense>
            <HomeContent />
        </Suspense>
    );
}
