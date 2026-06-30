'use client';

import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Modal } from 'antd';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import 'react-lazy-load-image-component/src/effects/blur.css';

import Navigation from 'components/Navigation';
import Picture from 'components/Picture';
import { baseURL } from 'utils/constant';
import { activePicturesByCategory } from 'services/PicturesAPI';
import { activeCategories } from 'services/CategoriesAPI';
import type { Picture as PictureType, Category } from 'types';

function CategoryContent({ catId }: { catId: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modalId = searchParams.get('id');

    const [categories, setCategories] = useState<Category[]>([]);
    const [images, setImages] = useState<PictureType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        activeCategories().then((response) => setCategories(response.data));
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        activePicturesByCategory(catId).then((response) => {
            setImages(response.data);
            setLoading(false);
        });
    }, [catId]);

    return (
        <>
            <Navigation />

            <section className="section" style={{ paddingTop: 120 }}>
                <div className="section-header">
                    <p className="section-label animate-fade-in-up">Browse</p>
                    <h2 className="section-title animate-fade-in-up delay-100">Gallery</h2>
                </div>

                <div className="category-pills animate-fade-in-up delay-200">
                    <Link
                        href="/category/All"
                        className={`category-pill${catId === 'All' ? ' active' : ''}`}
                    >
                        All
                    </Link>
                    {categories.map((item) => (
                        <Link
                            key={item.category_name}
                            href={`/category/${item.category_name}`}
                            className={`category-pill${catId === item.category_name ? ' active' : ''}`}
                        >
                            {item.category_name}
                        </Link>
                    ))}
                </div>

                <Modal
                    centered
                    open={!!modalId}
                    onCancel={() => router.push(`/category/${catId}`)}
                    footer={null}
                    styles={{ body: { padding: 0, background: 'transparent' } }}
                    width={900}
                    closable={false}
                >
                    {modalId && <Picture id={modalId} />}
                </Modal>

                {loading ? (
                    <div className="loading-spinner" />
                ) : images.length === 0 ? (
                    <div className="empty-state">No photos found</div>
                ) : (
                    <Masonry
                        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                        className="masonry-grid"
                        columnClassName="masonry-column"
                    >
                        {images.map((item) => (
                            <div key={item.pic_id} className="masonry-item">
                                <Link href={`/category/${catId}?id=${item.pic_id}`}>
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
        </>
    );
}

export default function CategoryPage({ params }: { params: { catId: string } }) {
    return (
        <Suspense>
            <CategoryContent catId={params.catId} />
        </Suspense>
    );
}
