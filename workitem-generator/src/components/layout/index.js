import React from "react";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;

function AppLayout({ children }) {
    const menuItems = [
        {
            key: "1",
            icon: <UserOutlined />,
            label: "Dashboard",
        },
        {
            key: "2",
            icon: <UploadOutlined />,
            label: "My Projects",
        },
        {
            key: "3",
            icon: <VideoCameraOutlined />,
            label: "Settings",
        },
    ];
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                // collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <div className="header-container"></div>
                <Content>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            height: "90vh",
                            overflow: "auto",
                            backgroundColor: "rgba(255, 250, 244, 0.651)",
                        }}
                    >
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AppLayout;
