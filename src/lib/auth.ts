import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { baseURL } from 'utils/constant';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const formData = new FormData();
                formData.append('username', credentials.username as string);
                formData.append('password', credentials.password as string);

                const res = await fetch(`${baseURL}auth/authenticate`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();

                if (data.code === 0 && data.data?.token) {
                    return {
                        id: '1',
                        name: credentials.username as string,
                        token: data.data.token,
                    };
                }

                return null;
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/admin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = (user as Record<string, unknown>).token;
            }
            return token;
        },
        async session({ session, token }) {
            session.token = token.token as string;
            return session;
        },
    },
});
