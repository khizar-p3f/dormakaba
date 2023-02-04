import { Avatar, Breadcrumb, Button, Card, Col, Divider, Empty, Input, Row, Space, Statistic, Table, Typography } from 'antd'
import { HomeOutlined, UserOutlined, CaretDownOutlined, ShopOutlined, AimOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react'
import './index.less'
import ReactHighcharts from 'react-highcharts';

const AgentDashboardPage = () => {

    const columns = [
        {
            title: 'Case ID',
            dataIndex: 'caseId',
            key: 'caseId',
        },
        {
            title: 'Urgency',
            dataIndex: 'urgency',
            key: 'urgency',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
        },
        {
            title: 'Task Type',
            dataIndex: 'type',
            key: 'type',
        }

    ]
    const dataSource = [
        {
            key: '1',
            caseId: 'CID-123',
            customer: 'Jim Green',
            urgency: 32,
            status: 'Pending',
            due: '5 Months',
            type: 'chat',
        },
        {
            key: '2',
            caseId: 'CID-477',
            customer: 'Jim Green',
            urgency: 42,
            status: 'Pending',
            due: '3 Months',
            type: 'Incoming Call',
        },
        {
            key: '3',
            caseId: 'CID-899',
            customer: 'Joe Black',
            urgency: 32,
            status: 'Pending',
            due: '5 Months',
            type: 'chat',
        }

    ]



    return (
        <section className='agent-dashboard'>

            <div className='bread-crumbs'>
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <UserOutlined />
                        <span>Agent</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="user-info">
                <Space direction='horizontal'>
                    <Avatar icon={<UserOutlined />} size={64} />
                    <Space direction='vertical' size={0}>
                        <Typography.Title level={5}>Welcome, John Doe</Typography.Title>
                        <Typography.Title level={3}>Pleasee review your action items</Typography.Title>
                    </Space>
                </Space>


            </div>
            <div className="statistics">
                <Statistic title="Active Cases" value={10} prefix={<ShopOutlined />} />
                <Statistic title="Pending Tasks" value={20} prefix={<CaretDownOutlined />} />
                <Statistic title="Notifications" value={33} prefix={<AimOutlined />} />
                <Statistic title="Calls taken" value={25} prefix={<UserOutlined />} />
                <Statistic title="Calls taken" value={25} prefix={<UserOutlined />} />
            </div>

            <section className='content-area'>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Divider orientation='left'>
                            <Typography.Title level={4}>My Work</Typography.Title>
                        </Divider>
                    </Col>
                    <Col span={8}>
                        <Card className='shadow-box' title="Messages and coaching"
                            extra={<Button type='default' icon={<SettingOutlined />} />}  >
                            <ReactHighcharts config={chart1} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className='shadow-box' title="Performance & AHT"
                            extra={<Button type='default' icon={<SettingOutlined />} />}  >
                            <ReactHighcharts config={chart2} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className='shadow-box' title="Messages and coaching"
                            extra={<Button type='default' icon={<SettingOutlined />} />}  >
                            <Empty description='No messages' />
                        </Card>
                    </Col>


                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24} style={{ marginTop: 30 }}>
                        <Card extra={<Space>
                            <Input.Search />
                            <Button type='default' icon={<PlusOutlined />}>Add Case</Button>
                        </Space>}>
                            <Table columns={columns} dataSource={dataSource} />
                        </Card>
                    </Col>

                </Row>
            </section>


        </section>
    )
}

const chart1 = {
    chart: {
        polar: true
    },
    title: false,
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        xAxis: {
            title: {
                text: 'Number of Employees'
            }
        },




    },
    series: [{
        name: "cases",
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    },
    {
        name: "Tasks",
        data: [39.9, 61.5, 56.4, 109.2, 114.0, 126.0, 100.6, 178.5, 226.4, 294.1, 195.6, 34.4]
    }
    ]
};
const chart2 = {
    chart: {
        polar: true
    },
    title: false,
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        xAxis: {
            title: {
                text: 'Number of Employees'
            }
        },




    },
    series: [{
        name: 'OOSLA',
        data: [631, 727, 3202, 721, 26]
    }, {
        name: 'WITHIN SLA',
        data: [814, 841, 3714, 726, 31]
    }, {
        name: 'Traiged',
        data: [1044, 944, 4170, 735, 40]
    }, {
        name: 'Pending',
        data: [1276, 1007, 4561, 746, 42]
    }]

};


export default AgentDashboardPage