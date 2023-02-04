import React, { useEffect, useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import Apptheme from './layout/theme';
import AppMainHeader from './layout/header';
import 'antd/dist/reset.css';
import './style/index.less';
import { Router } from '@gatsbyjs/reach-router';
import AppIndexPage from './pages';
import { Auth } from 'aws-amplify';
import AppLoginPage from './pages/login';
import ContactCenterAnalysis from './pages/dashboard/contactCenterAnalysis';
import ContactCenterVisualization from './pages/dashboard/contactCenterVisualization';
import CallStatistics from './pages/dashboard/CallStatistics';
const { Header, Content, Footer } = Layout;


const AppMainPage = (props) => {
    const [state, setState] = useState({
        isLoggedId: true,
    })
    useEffect(() => {
        /* Auth.currentAuthenticatedUser().then((user) => {
            setState({
                isLoggedId: true
            })
        }).catch((err) => {
            console.error({ authErr: err });
        }) */
    }, [])

    return (
        <ConfigProvider prefixCls='dormakaba' theme={Apptheme} >
            <Layout className="app-master">
                <AppMainHeader {...props}  />
                <AppMainHeader secondary={true} {...props}  />
                <Content className='master-content'>
                    {
                        state.isLoggedId ?
                            <Router>
                                <AppIndexPage path="/" />
                                <ContactCenterAnalysis path="/reports/cca" />
                                <ContactCenterVisualization path="/reports/ccv" />
                                <CallStatistics path="/reports/cst" />
                                <AppLoginPage path="/login/*" />
                            </Router>
                            :

                            <AppLoginPage path="/" />

                    }

                </Content>

            </Layout>

        </ConfigProvider>
    )
}

export default AppMainPage