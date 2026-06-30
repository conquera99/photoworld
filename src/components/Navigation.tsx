'use client';

import Link from 'next/link';
import { baseURL } from 'utils/constant';

export default function Navigation() {
    return (
        <header className="navigation">
            <div className="nav-left">
                <img alt="nav-logo" className="logo" src="/logo.png" />
            </div>
            <div className="nav-right">
                <Link href="/">Home</Link>
                <Link href="/category/All">Category</Link>
                <Link href="/about">About</Link>
            </div>
        </header>
    );
}
