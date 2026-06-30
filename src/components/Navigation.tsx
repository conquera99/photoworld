'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`navigation${scrolled ? ' scrolled' : ''}`}>
            <div className="nav-left">
                <Link href="/">
                    <img alt="logo" className="logo" src="/logo.png" />
                </Link>
            </div>
            <nav className="nav-right">
                <Link href="/">Home</Link>
                <Link href="/category/All">Gallery</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
