import React from 'react';
import { baseURL } from '../utils/constant';

export default function Image({ src, alt, ext, isThumb, style, height }) {
	let type = ext;
	if (ext === 'jpg') type = 'jpeg';

	let filename = `${baseURL}${src}-comp.jpeg`;

	if (isThumb) {
		filename = `${baseURL}${src}-thumb.jpeg`;
	}

	return (
		<picture>
			{!isThumb && <source srcSet={`${baseURL}${src}-webp.webp`} type="image/webp" />}
			<source srcSet={filename} type={`image/${type}`} />
			<img src={filename} alt={alt} className="img-preview" style={style} height={height} />
		</picture>
	);
}
