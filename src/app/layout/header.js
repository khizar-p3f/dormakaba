import React, { useState } from 'react'
import { Avatar, Breadcrumb, Button, Layout, Menu, Space, theme, Typography } from 'antd';
import logo from '../images/logo.png';
import { UserOutlined } from '@ant-design/icons'
import './header.less';
import { Link } from '@gatsbyjs/reach-router';
const { Header, Content, Footer } = Layout;

const AppMainHeader = (props) => {
    const {secondary,location} = props
    const { useToken } = theme
    const { token } = useToken()
    const defaultKey=location.pathname.split('/')
    console.log({defaultKey});
    const [active,setActive]=useState('home')
    return (
        <section className='app-main-header'>
            {!secondary ?
                <Header style={{ backgroundColor: token.colorBgBase }}  >
                    <div className="logo" ><img src={logo} alt="logo" height={30} /></div>
                    <div className='menu'>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['home']}
                            items={[
                                {
                                    key: 'home',
                                    label: <Link to="/">Home</Link>,
                                }
                            ]}

                        />
                    </div>
                    <div className='app-main-header-right'>
                        <Button type='ghost'>
                            <Space>
                                <Avatar style={{ backgroundColor: token.colorError }} icon={<UserOutlined />} />
                                <Typography.Text strong>John Doe</Typography.Text>
                            </Space>
                        </Button>
                    </div>
                </Header>
                :
                <Header className={'shadow'} style={{ backgroundColor: token.colorPrimary }}  >
                    <div className='menu'>
                        <Menu
                            style={{ backgroundColor: token.colorPrimary }}
                            onClick={(e)=>setActive(e.key)}
                            
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['home']}
                            items={[
                                {
                                    key: 'home',
                                    label: <a href="/">Agent Call Center</a>,
                                },
                                {
                                    key: 'ContactCenterAnalysis',
                                    label: <a href="/reports/cca">Contact Center Analysis</a>,
                                },
                                {
                                    key: 'ContactCenterVisualization',
                                    label: <a href="/reports/ccv">Contact Center Visualization</a>,
                                },
                                {
                                    key: 'CallStatistics',
                                    label: <a href="/reports/cst">Call Statistics</a>,

                                }
                            ]}

                        />
                    </div>
                </Header>
            }
        </section>
    )
}

export default AppMainHeader