import AdminContainer from '../../components/AdminContainer';
import Router from 'next/router';
import cookie from 'react-cookies';
import { Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { authenticate } from '../../services/AuthAPI';
import { tokenName } from '../../services/BaseAPI';

export default function Auth() {
    const token = cookie.load(tokenName);

    if(token) {
        Router.push('/Admin/[id]', '/Admin/dashboard');
    }

    const doLogin = (values) => {
        console.log(values);

        authenticate(values.username, values.password).then(response => {
            cookie.save(tokenName, response.token, {path: '/'});
            Router.push('/Admin/[id]', '/Admin/dashboard');
        });
    }

    return (
        <AdminContainer>
            <div className="container">
                <div className="login-form">
                    <img className="logo" src="http://localhost/portfolio-admin/public/logo.png" />
                    
                    <Form
                        layout="vertical"
                        name="auth"
                        onFinish={doLogin}
                    >
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
                            <Input size="large" type="password" placeholder="Password" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <Button block size="large" type="primary" htmlType="submit">
                                Sign In
                            </Button>
                        </Form.Item>

                        <h6 className="text-center">Ver1.0.0</h6>
                    </Form>
                </div>
            </div>
        </AdminContainer>
    )
}