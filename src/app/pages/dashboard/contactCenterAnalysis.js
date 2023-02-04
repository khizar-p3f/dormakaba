import { Breadcrumb, Button, Card, Col, Divider, Empty, Input, Row, Space, Statistic, Table, Typography } from 'antd'
import { HomeOutlined, UserOutlined, CaretDownOutlined, ShopOutlined, AimOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react'

const ContactCenterAnalysis = () => {
    return (
        <div style={{ minHeight: '100vh', width: '100%'}}>
            <div className='bread-crumbs'>
                <Breadcrumb >
                    <Breadcrumb.Item href="">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <UserOutlined />
                        <span>Supervisor</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Contact Center Analysis</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{ minHeight: '100vh', width: '100%', padding: 24, background:'#fff'}}>
            <iframe style={{ minHeight: '100vh', width: '100%', border: 0 }} src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/039289871235/dashboards/316080db-1067-490c-8a43-73f15f38b449?directory_alias=ctrvisualizationdormakabagroupdemo">

            </iframe>
        </div>
        </div>
    )
}

export default ContactCenterAnalysis