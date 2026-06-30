'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
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

export default function AdminDashboard({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { status } = useSession();
    const [activeMenu, setActiveMenu] = useState(params.id);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin');
        }
    }, [status, router]);

    const handleClick = (e: { key: string }) => {
        if (e.key === 'home') {
            router.push('/');
        } else if (e.key === 'signout') {
            signOut({ callbackUrl: '/admin' });
        } else {
            setActiveMenu(e.key);
        }
    };

    if (status === 'loading') {
        return null;
    }

    return (
        <AdminContainer>
            <div className="logo-container">
                <img alt="nav-logo" className="logo" src={`${baseURL}public/logo.png`} />
            </div>
            <div className="home-container">
                <div className="home-nav">
                    <Menu
                        theme="dark"
                        selectedKeys={[activeMenu]}
                        onClick={handleClick}
                        items={[
                            { label: 'Dashboard', key: 'dashboard', icon: <HomeOutlined /> },
                            { label: 'Categories', key: 'categories', icon: <TagsOutlined /> },
                            { label: 'Pictures', key: 'pictures', icon: <PictureOutlined /> },
                            { label: 'Config', key: 'config', icon: <SettingOutlined /> },
                            {
                                label: 'Portfolio',
                                key: 'home',
                                icon: <BorderlessTableOutlined />,
                            },
                            { label: 'Sign Out', key: 'signout', icon: <LogoutOutlined /> },
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
