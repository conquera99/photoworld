import React from 'react';
import Categories from '../modules/Categories';
import Pictures from '../modules/Pictures';
import Config from '../modules/Config';

export default function PageContainer({ page }) {
	return (
		<div>
			{page === 'dashboard' && (
				<div>
					<h1 className="text-center">Welcome to Admin Page.</h1>
				</div>
			)}

			{page === 'categories' && <Categories />}

			{page === 'pictures' && <Pictures />}

			{page === 'config' && <Config />}
		</div>
	);
}
