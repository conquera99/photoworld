import Router from "next/router";
import AdminContainer from "../../components/AdminContainer";
import { Menu } from "antd";
import {
    HomeOutlined,
    TagsOutlined,
    PictureOutlined,
    BorderlessTableOutlined,
    LogoutOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Component } from "react";
import PageContainer from "../../components/PageContainer";
import { baseURL } from '../../utils/constant';

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

    handleClick(e) {
        if (e.key === "home") {
            Router.push("/");
        } else if (e.key === "signout") {
            Router.push("/Admin");
        } else {
            Router.push(`/Admin/${e.key}`, `/Admin/${e.key}`, { shallow: true });

            this.setState({
                activeMenu: e.key,
            });
        }
    };

    render() {
        const { activeMenu } = this.state;

        return (
            <AdminContainer>
                <div className="logo-container">
                    <img
                        alt="nav-logo"
                        className="logo"
                        src={`${baseURL}public/logo.png`}
                    />
                </div>
                <div className="home-container">
                    <div className="home-nav">
                        <Menu theme="dark" selectedKeys={activeMenu} onClick={this.handleClick}>
                            <Menu.Item key="dashboard">
                                <HomeOutlined /> Dashboard
                            </Menu.Item>
                            <Menu.Item key="categories">
                                <TagsOutlined /> Categories
                            </Menu.Item>
                            <Menu.Item key="pictures">
                                <PictureOutlined /> Pictures
                            </Menu.Item>
                            <Menu.Item key="config">
                                <SettingOutlined /> Config
                            </Menu.Item>
                            <Menu.Item key="home">
                                <BorderlessTableOutlined /> Portfolio
                            </Menu.Item>
                            <Menu.Item key="signout">
                                <LogoutOutlined /> Sign Out
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="home-content">
                        <PageContainer page={activeMenu} />
                    </div>
                </div>
            </AdminContainer>
        );
    }
}
