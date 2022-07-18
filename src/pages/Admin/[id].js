import Router from 'next/router';
import cookie from 'react-cookies';
import { Component } from 'react';
import { Menu } from 'antd';

import {
	HomeOutlined,
	TagsOutlined,
	PictureOutlined,
	BorderlessTableOutlined,
	LogoutOutlined,
	SettingOutlined,
} from 'components/icons';
import AdminContainer from 'components/AdminContainer';
import PageContainer from 'components/PageContainer';

import { baseURL } from 'utils/constant';

import { tokenName } from 'services/BaseAPI';

export default class Dashboard extends Component {
	static getInitialProps({ query }) {
		return { query };
	}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			activeMenu: props.query.id,
		};
	}

	componentDidMount() {
		const token = cookie.load(tokenName);

		if (!token) {
			Router.push('/Admin');
		}
	}

	handleClick(e) {
		if (e.key === 'home') {
			Router.push('/');
		} else if (e.key === 'signout') {
			cookie.remove(tokenName, { path: '/' });

			Router.push('/Admin');
		} else {
			Router.push(`/Admin/[id]?id=${e.key}`, `/Admin/${e.key}`, { shallow: true });

			this.setState({
				activeMenu: e.key,
			});
		}
	}

	render() {
		const { activeMenu } = this.state;

		return (
			<AdminContainer>
				<div className="logo-container">
					<img alt="nav-logo" className="logo" src={`${baseURL}public/logo.png`} />
				</div>
				<div className="home-container">
					<div className="home-nav">
						<Menu
							theme="dark"
							selectedKeys={activeMenu}
							onClick={this.handleClick}
							items={[
								{
									label: 'Dashboard',
									key: 'dashboard',
									icon: <HomeOutlined />,
								},
								{
									label: 'Categories',
									key: 'categories',
									icon: <TagsOutlined />,
								},
								{
									label: 'Pictures',
									key: 'pictures',
									icon: <PictureOutlined />,
								},
								{
									label: 'Config',
									key: 'config',
									icon: <SettingOutlined />,
								},
								{
									label: 'Portfolio',
									key: 'home',
									icon: <BorderlessTableOutlined />,
								},
								{
									label: 'Sign Out',
									key: 'signout',
									icon: <LogoutOutlined />,
								},
							]}
						/>
					</div>
					<div className="home-content">
						<PageContainer page={activeMenu} />
					</div>
				</div>
			</AdminContainer>
		);
	}
}
