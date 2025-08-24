import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { CallLogin } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './login-page.scss';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        try {
            const { username, password } = values;
            setIsSubmit(true);
            const res = await CallLogin(username, password);
            setIsSubmit(false);
            if (res?.data) {
                localStorage.setItem('access_token', res.data.access_token)
                dispatch(doLoginAction(res.data.user))
                message.success("Đăng nhập thành công!")
                navigate('/');
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description:
                        res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5
                })
            }
        } catch (error) {
            message.error("Đăng nhập thất bại, vui lòng thử lại!")
        }
    }
    //UI
    return (
        <div className='Login-page'>
            <div className="login-container">
                <h2 className="login-title">Đăng nhập</h2>
                <Divider />
                <Form
                    name="login"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="username"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input placeholder="Nhập email" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" size="large" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 7, span: 17 }}>
                        <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            // loading={isSubmit} //trang thai xoay khi setIsSubmit = true
                            size="large"
                            style={{
                                width: '100%',
                                background: 'linear-gradient(90deg, #1677ff 0%, #69c0ff 100%)',
                                border: 'none',
                                fontWeight: 600,
                                letterSpacing: 1
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <Divider plain>Hoặc</Divider>
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <span style={{ color: '#888' }}>Chưa có tài khoản? </span>
                        <Link to='/register' style={{ fontWeight: 600, color: '#1677ff' }}>Đăng ký</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;