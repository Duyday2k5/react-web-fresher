import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa'
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Avatar, Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './header.scss';
import { Link } from 'react-router-dom';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const Header = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            useDispatch(doLogoutAction);
            message.success("Logout Successfully!");
            navigate('/');
        }
    }

    const itemsDropDownHeader = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to={'/'}>Lịch sử mua hàng</Link>,
            key: 'history',
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
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">

                        <div className='page-header__logo'>
                            <span className='logo'>
                                <span onClick={() => navigate('/')}> <FaReact className='rotate icon-react' />Duy Store</span>
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                                value={props.searchTerm}
                                onChange={(e) => props.setSearchTerm(e.target.value)}
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items: itemsDropDownHeader }} trigger={['click']}>
                                        <Space >
                                            <Avatar src={urlAvatar} />
                                            {user?.fullName}
                                        </Space>
                                    </Dropdown>
                                }

                            </li>
                        </ul>
                    </nav>
                </header>
            </div>

        </>
    )
};


export default Header;