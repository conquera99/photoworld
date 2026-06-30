'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from 'components/icons';
import AdminContainer from 'components/AdminContainer';
import { baseURL } from 'utils/constant';

export default function AdminLogin() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated' && session) {
            router.push('/admin/dashboard');
        }
    }, [session, status, router]);

    const doLogin = async (values: { username: string; password: string }) => {
        const result = await signIn('credentials', {
            username: values.username,
            password: values.password,
            redirect: false,
        });

        if (result?.ok) {
            router.push('/admin/dashboard');
        }
    };

    return (
        <AdminContainer>
            <div className="container">
                <div className="login-form">
                    <Link href="/">
                        <img className="logo" alt="logo" src={`${baseURL}public/logo.png`} />
                    </Link>

                    <Form layout="vertical" name="auth" onFinish={doLogin}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input
                                size="large"
                                type="password"
                                placeholder="Password"
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button block size="large" type="primary" htmlType="submit">
                                Sign In
                            </Button>
                        </Form.Item>

                        <h6 className="text-center">Ver2.0.0</h6>
                    </Form>
                </div>
            </div>
        </AdminContainer>
    );
}
