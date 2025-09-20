import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Avatar, message } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotPermitted } from '../ProtectedRoute/NotPermitted';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';


const { Content, Footer, Sider } = Layout;


export const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const user = useSelector(state => state.account.user);
    const userRole = (user?.role || '').toLowerCase();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction);
            message.success("Logout Successfully!");
            navigate('/');
        }
    }

    if (userRole !== 'admin') {
        return <NotPermitted />
    }

    const items = [
        {
            label: <Link to='/admin'>Dashboard</Link>,
            key: 'dashboard',
            icon: <AppstoreOutlined />
        },
        {
            label: <span>Manage Users</span>,
            // key: 'user',
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to='/admin/user'>CRUD</Link>,
                    key: 'crud',
                    icon: <TeamOutlined />,
                },
                // {
                //     label: 'Files1',
                //     key: 'file1',
                //     icon: <TeamOutlined />,
                // }
            ]
        },
        {
            label: <Link to='/admin/book'>Manage Books</Link>,
            key: 'book',
            icon: <ExceptionOutlined />
        },
        {
            label: <Link to='/admin/order'>Manage Orders</Link>,
            key: 'order',
            icon: <DollarCircleOutlined />
        },

    ];
    const itemsDropdown = [
        {
            label: <Link to={'/'}>Trang chủ page</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => { handleLogout() }}
            >Đăng xuất</label>,
            key: 'logout',
        }
    ];

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    return (
        <>
            <Layout
                style={{ minHeight: '100vh' }}
                className="layout-admin"
            >
                <Sider   //canh ben
                    theme='light'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 32, margin: 16, fontWeight: 'bold', textAlign: 'center' }}>
                        Admin Page
                    </div>
                    <Menu
                        defaultSelectedKeys={[activeMenu]}
                        mode="inline"
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    />
                </Sider>
                <Layout>
                    <div className='admin-header'>
                        <span>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                style: { marginRight: 8, marginLeft: 8, fontSize: 16, cursor: 'pointer' },
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </span>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: "pointer" }}>
                                <Avatar src={urlAvatar} />
                                {user?.fullName}
                            </Space>
                        </Dropdown>
                    </div>
                    <Content style={{ padding: '15px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ padding: 0, textAlign: 'center' }}>
                        @Duy Store Test <HeartTwoTone />
                    </Footer>
                </Layout>
            </Layout>

        </>
    );
};

