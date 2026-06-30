'use client';

import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Modal, Empty, Spin } from 'antd';
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
        <div>
            <div
                className="cover"
                style={{ backgroundImage: `url(${baseURL}public/cover/cover.jpg)` }}
            />

            <Navigation />
            <div className="content">
                <h1>All Category</h1>

                <div className="category-container">
                    {categories.map((item) => {
                        const name = item.category_name;
                        const active = catId === name ? 'active' : '';

                        return (
                            <Link
                                key={name}
                                href={`/category/${name}`}
                                className={`category-link ${active}`}
                            >
                                {name}
                            </Link>
                        );
                    })}
                </div>

                <Modal
                    centered
                    open={!!modalId}
                    onCancel={() => router.push(`/category/${catId}`)}
                    footer={null}
                    styles={{ body: { padding: 0 } }}
                >
                    {modalId && <Picture id={modalId} />}
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
                        {images.map((item) => (
                            <Link key={item.pic_id} href={`/category/${catId}?id=${item.pic_id}`}>
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

export default function CategoryPage({ params }: { params: { catId: string } }) {
    return (
        <Suspense>
            <CategoryContent catId={params.catId} />
        </Suspense>
    );
}
