import type { Metadata } from 'next';
import AuthProvider from 'components/AuthProvider';
import 'styles/globals.css';

export const metadata: Metadata = {
    title: 'Portfolio',
    description:
        'Conquera99 Photoworld, welcome to my website, enjoy all the images, I hope it can give you a stories that can be remembered forever.',
    keywords: 'Conquera99, photography, portfolio, gallery, benny, conquera99 photoworld',
    authors: [{ name: 'Benny' }],
    icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
