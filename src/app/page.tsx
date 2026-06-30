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
        <>
            <Navigation />

            <section className="hero">
                <div
                    className="hero-bg"
                    style={{ backgroundImage: `url(${baseURL}public/cover/cover.jpg)` }}
                />
                <div className="hero-overlay" />
                <div className="hero-content">
                    <p className="hero-subtitle animate-fade-in-up">Photography Portfolio</p>
                    <h1 className="hero-title animate-fade-in-up delay-200">Capturing Moments</h1>
                    <p className="hero-description animate-fade-in-up delay-300">
                        Every photograph tells a story. A frozen moment in time that evokes emotion
                        and preserves memories forever.
                    </p>
                </div>
                <div className="hero-scroll animate-fade-in delay-600">
                    <span>Scroll</span>
                    <div className="hero-scroll-line" />
                </div>
            </section>

            <Modal
                centered
                open={!!modalId}
                onCancel={() => router.push('/')}
                footer={null}
                styles={{ body: { padding: 0, background: 'transparent' } }}
                width={900}
                closable={false}
            >
                {modalId && <Picture id={modalId} />}
            </Modal>

            <section className="section">
                <div className="section-header">
                    <p className="section-label animate-fade-in-up">Portfolio</p>
                    <h2 className="section-title animate-fade-in-up delay-100">Latest Work</h2>
                </div>

                {images.length > 0 && (
                    <Masonry
                        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                        className="masonry-grid"
                        columnClassName="masonry-column"
                    >
                        {images.map((item) => (
                            <div key={item.pic_id} className="masonry-item">
                                <Link href={`/?id=${item.pic_id}`}>
                                    <LazyLoadImage
                                        alt={item.pic_title}
                                        delayTime={0}
                                        threshold={100}
                                        crossOrigin="anonymous"
                                        effect="blur"
                                        placeholderSrc={`${baseURL}${item.pic_image}-thumb.jpeg`}
                                        src={`${baseURL}${item.pic_image}-comp.jpeg`}
                                    />
                                    <div className="masonry-item-overlay">
                                        <span className="masonry-item-title">{item.pic_title}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Masonry>
                )}
            </section>

            <footer className="footer">
                &copy; {new Date().getFullYear()} Conquera99 Photoworld
            </footer>
        </>
    );
}

export default function Home() {
    return (
        <Suspense>
            <HomeContent />
        </Suspense>
    );
}
