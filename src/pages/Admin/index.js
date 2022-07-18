import Router from 'next/router';
import cookie from 'react-cookies';
import { Input, Button, Form } from 'antd';

import { UserOutlined, LockOutlined } from 'components/icons';
import AdminContainer from 'components/AdminContainer';

import { authenticate } from 'services/AuthAPI';
import { tokenName } from 'services/BaseAPI';

import { baseURL } from 'utils/constant';
import Link from 'next/link';

export default function Auth() {
	const token = cookie.load(tokenName);

	if (token) {
		Router.push('/Admin/[id]', '/Admin/dashboard');
	}

	const doLogin = (values) => {
		authenticate(values.username, values.password).then((response) => {
			cookie.save(tokenName, response.token, { path: '/' });
			Router.push('/Admin/[id]', '/Admin/dashboard');
		});
	};

	return (
		<AdminContainer>
			<div className="container">
				<div className="login-form">
					<Link href="/">
						<img className="logo" src={`${baseURL}public/logo.png`} />
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
