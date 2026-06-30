'use client';

import Categories from 'modules/Categories';
import Pictures from 'modules/Pictures';
import Config from 'modules/Config';

interface PageContainerProps {
    page: string;
}

export default function PageContainer({ page }: PageContainerProps) {
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
