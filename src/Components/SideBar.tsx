import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Home from './Home';

const { Content, Footer, Sider } = Layout;

const SideBar: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                        (icon, index) => ({
                            key: String(index + 1),
                            icon: React.createElement(icon),
                            label: `Home ${index + 1}`,
                        }),
                    )}
                />
            </Sider>
            <Layout>
                <Content >
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <Home></Home>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>Algo Bulls ©2023 Assignment</Footer>
            </Layout>

        </Layout>
    );
};

export default SideBar;