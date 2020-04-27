import Link from "next/link";
import "./style.less";

export default function Navigation() {
    return (
        <header className="navigation">
            <div className="nav-left">
                <img
                    alt="nav-logo"
                    className="logo"
                    src="http://localhost/portfolio-admin/public/logo.png"
                />
            </div>
            <div className="nav-right">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/Category/All">
                    <a>Category</a>
                </Link>
                <Link href="/About">
                    <a>About</a>
                </Link>
            </div>
        </header>
    );
}
