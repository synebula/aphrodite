import React from 'react';
import './index.less';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';
import logo from '@/public/logo.png';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import settings from '@/settings';

@connect(({ globle }) => ({
    globle: globle
}))
export default class BackendLayout extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        collapsed: false,
    };

    onCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onChangeTheme = theme => {
        this.setState({
            theme: theme
        })
    }

    render() {
        const { globle: { theme }, children } = this.props;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsed={this.state.collapsed} className={`sider ${theme.name}`} style={{ background: `${theme.color}` }} >
                    <div className='logo' >
                        <a>
                            <div className='img'>
                                <img src={logo} alt="logo" />
                            </div>
                            <h1>{settings.title}</h1>
                        </a>
                    </div>
                    <Menu theme={theme.name} defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>User</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="team" />
                                    <span>Team</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.onCollapse}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: '0px 16px',
                            background: '#fff',
                            minHeight: 280,
                        }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Aphrodite UI Solution</Footer>
                </Layout>
            </Layout>
        );
    }
}