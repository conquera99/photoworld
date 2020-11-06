import React, { Component } from 'react';
import { Avatar } from 'antd';
import {
	InstagramOutlined,
	FacebookOutlined,
	TwitterOutlined,
	GithubOutlined,
} from '@ant-design/icons';
import Container from '../components/Container';
import Navigation from '../components/Navigation';
import { baseURL } from '../utils/constant';

export default class About extends Component {
	render() {
		return (
			<Container>
				<div
					className="cover"
					style={{ backgroundImage: `url(${baseURL}public/cover/cover.jpg)` }}
				/>

				<Navigation />
				<div className="content">
					<Avatar size={128} src={`${baseURL}public/profile.jpg`} />

					<div className="bio">
						<h2>Benny</h2>

						<br />
						<br />
						<br />
						<h4>Find me at:</h4>
						<div className="social-media">
							<a
								href="https://instagram.com/conquera99"
								rel="noreferrer"
								target="_blank"
							>
								<InstagramOutlined className="instagram" />
							</a>
							<a
								href="https://facebook.com/conquera99"
								rel="noreferrer"
								target="_blank"
							>
								<FacebookOutlined className="facebook" />
							</a>
							<a
								href="https://twitter.com/conquera99"
								rel="noreferrer"
								target="_blank"
							>
								<TwitterOutlined className="twitter" />
							</a>
							<a
								href="https://github.com/conquera99"
								rel="noreferrer"
								target="_blank"
							>
								<GithubOutlined className="github" />
							</a>
						</div>
					</div>
				</div>
			</Container>
		);
	}
}
