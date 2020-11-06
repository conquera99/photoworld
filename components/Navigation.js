import React from 'react';
import Link from 'next/link';
import './style.less';
import { baseURL } from '../utils/constant';

export default function Navigation() {
	return (
		<header className="navigation">
			<div className="nav-left">
				<img alt="nav-logo" className="logo" src={`${baseURL}public/logo.png`} />
			</div>
			<div className="nav-right">
				<Link href="/">
					<a>Home</a>
				</Link>
				<Link href="/Category/[catId]" as="/Category/All">
					<a>Category</a>
				</Link>
				<Link href="/About">
					<a>About</a>
				</Link>
			</div>
		</header>
	);
}
