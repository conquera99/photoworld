declare module 'react-lazy-load-image-component' {
    import { ComponentType, CSSProperties } from 'react';

    interface LazyLoadImageProps {
        alt?: string;
        className?: string;
        crossOrigin?: string;
        delayTime?: number;
        effect?: string;
        height?: number;
        placeholderSrc?: string;
        src: string;
        style?: CSSProperties;
        threshold?: number;
        width?: number | string;
        key?: string | number;
    }

    export const LazyLoadImage: ComponentType<LazyLoadImageProps>;
}

declare module 'react-lazy-load-image-component/src/effects/blur.css' {}
