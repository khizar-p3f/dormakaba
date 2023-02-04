import React, { useState } from 'react'
import { Avatar, Breadcrumb, Button, Layout, Menu, Space, theme, Typography } from 'antd';
import logo from '../images/logo.png';
import { UserOutlined } from '@ant-design/icons'
import './header.less';
import { VideoCameraOutlined  } from '@ant-design/icons';
import { Link } from '@gatsbyjs/reach-router';
import recordingImg from '../images/rec.gif'
const { Header, Content, Footer } = Layout;

const AppMainHeader = (props) => {
    const { secondary, location, supervisor } = props
    const { useToken } = theme
    const { token } = useToken()
    const defaultKey = location.pathname.split('/')
    console.log({ defaultKey });
    const [active, setActive] = useState('home')
    const [recording, setRecording] = useState(false)



    return (
        <section className='app-main-header'>
            {!secondary ?
                <Header style={{ backgroundColor: token.colorBgBase }}  >
                    <div className="logo" > <Link to="/"><img src={logo} alt="logo" height={30} /></Link></div>
                    <div className='menu'>
                        {
                            supervisor &&
                            <Menu

                                theme="light"
                                mode="horizontal"
                                defaultSelectedKeys={['home']}
                                items={[
                                    {
                                        key: 'home',
                                        label: <Link to="/">Agent call Center</Link>,
                                    },
                                    {
                                        key: 'ContactSearch',
                                        label: <a href="https://p3fusion-dormakaba.my.connect.aws/contact-search" target='_blank'>Contact Search</a>,
                                    },
                                    {
                                        key: 'Forecasting',
                                        label: <a href="https://p3fusion-dormakaba.my.connect.aws/optimization/forecasting#/forecasts" target='_blank'>Forecasting</a>,
                                    },
                                    {
                                        key: 'Scheduling',
                                        label: <a href="https://p3fusion-dormakaba.my.connect.aws/agent-app-v2/scheduling#/schedule?date=1675036800" target='_blank'>Scheduling</a>,
                                    }
                                ]}

                            />
                        }
                    </div>
                    <div className='app-main-header-right'>
                        <Space size={10}>
                            {
                                recording ?
                                <Button onClick={()=>setRecording(false)}  type='default'  icon={<img src={recordingImg} height={25} />} shape='round'  >&nbsp;Recording </Button>
                               :
                            <Button onClick={()=>setRecording(true)}  type='default' icon={<VideoCameraOutlined />} shape='round'  >Record</Button>
                            }
                          
                        <Button type='link'>
                            <Space>
                                <Avatar style={{ backgroundColor: token.colorError }} icon={<UserOutlined />} />
                                {
                                    supervisor ? <Typography.Text strong>Amy</Typography.Text> : <Typography.Text strong>John Doe</Typography.Text>
                                }
                            </Space>
                        </Button>
                                </Space>
                    </div>
                </Header>
                :
                <Header className={'shadow'} style={{ backgroundColor: token.colorPrimary }}  >
                    <div className='menu'>
                        <Menu
                            style={{ backgroundColor: token.colorPrimary }}
                            onClick={(e) => setActive(e.key)}

                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['home']}
                            items={
                                supervisor ?
                                    [
                                        {
                                            key: 'home',
                                            label: <Link to="/">Agent Call Center</Link>,
                                        },
                                        {
                                            key: 'ContactCenterAnalysis',
                                            label: <Link to={supervisor ? "/supervisor/reports/cca" : "/reports/cca"}>Contact Center Analysis</Link>,
                                        },
                                        {
                                            key: 'ContactCenterVisualization',
                                            label: <Link to={supervisor ? "/supervisor/reports/ccv" : "/reports/ccv"}>Contact Center Visualization</Link>,
                                        },
                                        {
                                            key: 'CallStatistics',
                                            label: <Link to={supervisor ? "/supervisor/reports/cst" : "/reports/cst"}>Call Statistics</Link>,

                                        }
                                    ]
                                    :
                                    [
                                        {
                                            key: 'home',
                                            label: <Link to="/">Agent Call Center</Link>,
                                        }]
                            }

                        />
                    </div>
                </Header>
            }
        </section>
    )
}

export default AppMainHeader


