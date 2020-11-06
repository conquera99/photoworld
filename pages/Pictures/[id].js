import React from 'react';
import { useRouter } from 'next/router';
import Picture from '../../components/Picture';

const PicturePage = () => {
	const router = useRouter();

	return router.query.id ? <Picture id={router.query.id} standalone /> : null;
};

export default PicturePage;
