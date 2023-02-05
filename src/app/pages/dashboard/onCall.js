import {
    Avatar, Breadcrumb, Tabs, Button, Card, Col, Divider, Empty, Input, Row, Space, Statistic, Table, Typography,
    Form, Radio

} from 'antd'
import { HomeOutlined, UserOutlined, InfoCircleOutlined, ShopOutlined, AimOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import './onCall.less'
import '../../../aws-streams/amazon-connect-customer-profiles'
import '../../../aws-streams/amazon-connect-wisdomjs'

const instanceUrl = 'https://p3fusion-dormakaba.my.connect.aws'
const AgentOnCall = () => {
    const ccp = useRef(null);

    useEffect(() => {
        initiateCCP();
    }, [])

    const initiateCCP = () => {
        if (ccp.current) {

            let client = new connect.CustomerProfilesClient(instanceUrl);
        }
    }
    const initialItems = [
        {
            label: 'Customer Profile',
            children: <Row gutter={[16, 16]}><Divider /><div id={`customerprofiles-container`} ref={ccp} /> </Row>,
            key: 'customerProfile',
        },
        {
            label: 'Wisdom',
            children: <WisdomWidget />,
            key: 'wisdom',
        }
    ];


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


            <section className='content-area'>
                <Tabs
                    type="editable-card"

                    items={initialItems}
                />

            </section>


        </section>
    )
}

const WisdomWidget = () => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    useEffect(() => {
        initiateWisdom()
    }, [])

    const initiateWisdom = () => {

        const wisdomClient = new connect.wisdomjs.Client({
            instanceUrl: "https://p3fusion-dormakaba.my.connect.aws",                                        // REQUIRED
            endpoint: "https://p3fusion-dormakaba.my.connect.aws/connect/api",  // optional, defaults to '<instanceUrl>'
            callSource: "agent-app",                                         // optional, defaults to 'agent-app'
            serviceId: 'Wisdom',                                             // optional, defaults to 'Wisdom'
            maxAttempts: 3,                                                  // optional, defaults to 3
            logger: {},                                                      // optional, if provided overrides default logger
            headers: {},                                                     // optional, if provided overrides request headers
            requestHandler: {},                                              // optional, if provided overrides the default request handler
        });
    }

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
        >
            <Form.Item label="Required Mark" name="requiredMarkValue">
                <Radio.Group>
                    <Radio.Button value="optional">Whole Term</Radio.Button>
                    <Radio.Button value>Wildcard Search</Radio.Button>
                    <Radio.Button value={false}>Match Term</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Search Query Here" required tooltip="This is a required field">
                <Input placeholder="input your Query Here" />
            </Form.Item>

            <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    )

}
export default AgentOnCall