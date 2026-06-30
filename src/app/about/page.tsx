'use client';

import {
    InstagramOutlined,
    FacebookOutlined,
    TwitterOutlined,
    GithubOutlined,
} from 'components/icons';
import Navigation from 'components/Navigation';
import { baseURL } from 'utils/constant';

export default function About() {
    return (
        <>
            <Navigation />

            <main className="about-page">
                <img
                    className="about-avatar"
                    src={`${baseURL}public/profile.jpg`}
                    alt="Photographer"
                />

                <h1 className="about-name">Benny</h1>
                <p className="about-role">Photographer</p>

                <p className="about-bio">
                    Passionate about capturing fleeting moments and transforming them into timeless
                    stories. Every frame is an opportunity to preserve beauty, emotion, and the
                    essence of life.
                </p>

                <div className="about-social">
                    <a href="https://instagram.com/conquera99" rel="noreferrer" target="_blank">
                        <InstagramOutlined />
                    </a>
                    <a href="https://facebook.com/conquera99" rel="noreferrer" target="_blank">
                        <FacebookOutlined />
                    </a>
                    <a href="https://twitter.com/conquera99" rel="noreferrer" target="_blank">
                        <TwitterOutlined />
                    </a>
                    <a href="https://github.com/conquera99" rel="noreferrer" target="_blank">
                        <GithubOutlined />
                    </a>
                </div>
            </main>

            <footer className="footer">
                &copy; {new Date().getFullYear()} Conquera99 Photoworld
            </footer>
        </>
    );
}
