import React, { useEffect, useRef, useState } from 'react'

import SplitPane, { Pane } from 'react-split-pane';

import AgentDashboardPage from './dashboard';
import '../../aws-streams/connect-streams'
import './customCCP/index.less'
import AgentOnCall from './dashboard/onCall';
import { Button, Dropdown, List, Modal, notification, Skeleton, Space, theme, Avatar, Spin, Typography, Input } from 'antd';
import { UserOutlined, InfoCircleOutlined, UsergroupDeleteOutlined, AlertOutlined, TeamOutlined } from '@ant-design/icons';
import teams from '../images/teams.png'
import { getTopCallRequest } from '../api';
import axios from 'axios';


const AppIndexPage = (props) => {
    const { supervisor } = props
    const [MSTeamsUsers, setMSTeamsUsers] = useState([])
    const ccp = useRef(null);
    const [ccpInitiated, setCcpInitiated] = useState(false);
    const [onCall, setonCall] = useState(false);
    const [contact, setContact] = useState(null)
    const [agent, setAgent] = useState(null);
    const [showTeamsModal, setShowTeamsModal] = useState(false)
    const [state, setState] = useState({
        status: null,
        teamsInitiated: false,
    })
    const { useToken } = theme
    const { token } = useToken()

    useEffect(() => {
        initiateCCP();
    }, [])

    const initiateCCP = () => {

        const ccpUrl = "https://p3fusion-dormakaba.my.connect.aws/ccp-v2";
        if (ccp.current) {
            const ccps = connect.core.initCCP(ccp.current, {
                ccpUrl,
                loginPopup: true,
                softphone: {
                    allowFramedSoftphone: true
                }
            });
            isCCpInitiated()
        }
    }

    const isCCpInitiated = () => {
        let i = 0;
        const PollInterval = setInterval(() => {
            console.log(`Presolved::CCP::Polling to get the login status ${i}`);
            if (connect.agent.initialized) {
                clearInterval(PollInterval)
                listenIncomingActivities()
                console.log(`Presolved::CCP::Login success stoppping the poll`);
                setCcpInitiated(true)
                connect.agent((agent) => {
                    setAgent(agent)
                    setState({ ...state, status: agent.getStatus().name })
                })
            }
            if (i > 30) {
                clearInterval(PollInterval)
                console.log(`Presolved::CCP::Login failed stoppping the poll`);
            }
            i++;
        }, 1000);
    }
    const listenIncomingActivities = () => {


        connect.contact(function (contact) {
            let persistContact = contact
            setContact(persistContact)
            contact.onConnecting(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onConnecting::");
                setonCall(true)
            })

            contact.onIncoming(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onIncoming::");

            });

            contact.onRefresh(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log({ contactAttributes });
            });

            contact.onAccepted(function (ctx) {
                console.log("Presolved::connect::contact::onAccepted::");
                let contactAttributes = ctx._getData()

            });

            contact.onEnded(function (ctx) {
                console.log("Presolved::connect::contact::onEnded::");
                let contactAttributes = ctx._getData()
                setonCall(false)
                setContact(null)
            });

            contact.onConnected(function (ctx) {
                console.log("Presolved::connect::contact::onConnected::",);

            });
            contact.onMissed(function (ctx) {
                console.log("Presolved::connect::contact::onMissed::", ctx);
            })
        });

    }
    const goOffline = () => {
        var offlineState = agent.getAgentStates().filter(function (state) {
            return state.type === connect.AgentStateType.OFFLINE;
        })[0];

        agent.setState(offlineState, {
            success: function () {
                notification.success({ message: "Set agent status to Offline." })
                setState({ ...state, status: "Offline" })
            },
            failure: function () {
                notification.info({ message: "Failed to set agent status to Offline." })
            }
        });
    }
    const goAvailable = () => {
        var availableState = agent.getAgentStates().filter(function (state) {
            return state.type === connect.AgentStateType.ROUTABLE;
        })[0];

        agent.setState(availableState, {
            success: function () {
                notification.success({ message: "Set agent status to Available." })
                setState({ ...state, status: "Available" })
            },
            failure: function () {
                notification.info({ message: "Failed to set agent status to Available." })
            }
        });
    }
    const searchTeamsUsers = (e) => {
        axios.get(`https://td7y4pmq4a.execute-api.us-east-1.amazonaws.com/staging/api/users?displayName=${e.target.value}&tenantId=4aed8dae-5d5c-4a2f-a6c8-64f94dfa89f6`).then((res) => {
            if (res.data.users?.value) {
                setMSTeamsUsers(res.data.users.value)
            }
        })
    }
    const searchTeamsUsersKeyUp = (e) => {
        if (e.target.value.length > 2) {
            console.log({ e: e.target.value });
            searchTeamsUsers(e)
        }

    }
    const items = [
        {
            key: '1',
            label: <Space><UserOutlined />Available</Space>,
            onClick: () => goAvailable()

        },
        {
            key: '2',
            label: <Space><UsergroupDeleteOutlined />Offline</Space>,
            onClick: () => goOffline()
        },

    ];


    const checkTeamsAvailibility = (payload) => {
        console.log({ payload });
        // showig the pipup to the user to select the teams user
        setState({ ...state, teamsInitiated: true })
        let pollints = setInterval(() => {
            getTopCallRequest().then((res) => {
                console.log({ result: res.data.listTransferToTeams.items });
                let items = res.data?.listTransferToTeams?.items?.length || 0
                if (items == 0) {
                    clearInterval(pollints)
                    makeTeamsCall(payload)
                }
            })
        }, 3000);
    }

    const makeTeamsCall = (payload) => {
        console.log({ payload });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "from": "connect1",
                "to": {
                    "displayname": payload.displayName,
                    "id": payload.id,
                    "tenantId": "4aed8dae-5d5c-4a2f-a6c8-64f94dfa89f6"
                }
            }),
        };
        const request = new Request('https://td7y4pmq4a.execute-api.us-east-1.amazonaws.com/staging/api/requestTransfer', options);
        try {
            fetch(request).then((response) => {
                response.json().then((data) => {
                    console.log("Response from the API: ", data);
                    performQuickConnect(data)
                })
            })

        } catch (error) {
            console.log("Error calling API: ", error);
            return error;
        }

    }

    const performQuickConnect = (item) => {
        var endpoint = connect.Endpoint.byPhoneNumber('+16028122928');
        contact.addConnection(endpoint, {
            success: function () {
                console.log("Presolved::connect::contact::addConnection::success::",);
                setState({ ...state, teamsInitiated: false })
                setShowTeamsModal(false)
                notification.success({
                    message: "Call transfered to Teams",
                    description: "Call transfered to Teams",
                })
            },
            failure: function (err) {
                console.log("Presolved::connect::contact::addConnection::failure::", err);
            }
        });
    }

    return (
        <SplitPane split="vertical">
            <div style={{ backgroundColor: '#f2f2f2' }}>
                <div className='custom-ccp' style={{ backgroundColor: '#f2f2f2' }}>
                    {/*   <div className='hide-header' style={{background:state.status =="Available" ? token.colorBgBase : token.colorWarningBg}} >
                        <Dropdown menu={{ items, }}>
                            <Button style={{ marginTop: 10, fontSize:16 }} type='link' icon={<AlertOutlined />} >{state.status}</Button>
                        </Dropdown>
                    </div> */}
                    <div ref={ccp} id="iframe1" className="ccp-panel" style={{ backgroundColor: '#f2f2f2' }} >

                    </div>

                    {ccpInitiated && <div style={{ padding: '10px 20px' }}>
                        <Button size='large' style={{ height: 45 }} onClick={() => setShowTeamsModal(!showTeamsModal)} block type='default' icon={<img src={teams} height={30} style={{ margin: '0 10px ' }} />} >
                            Connect Teams
                        </Button>
                    </div>}
                </div>
                <Modal width={640} title="Connect to Teams" open={showTeamsModal} closable onCancel={() => setShowTeamsModal(!showTeamsModal)}>
                    {
                        state.teamsInitiated ?
                            <div style={{ padding: '50px 0' }}>
                                <Space direction='vertical' align='center'>
                                    <Spin size='large' />
                                    <Typography.Title level={3}>Please wait while we Connect to MS Team . . .</Typography.Title>
                                </Space>
                            </div>
                            :
                            <div>
                                <div style={{padding:'15px 0'}}>
                                <Input.Search placeholder='Search Teams Users' onSearch={searchTeamsUsers} onKeyDown={searchTeamsUsersKeyUp} enterButton allowClear />
                                </div>
                                {/* 
                                    "businessPhones": ["919052234524"], 
                                    "displayName": "Sai Krishnan",
                                     "givenName": "Sai", 
                                     "jobTitle": null, 
                                     "mail": "saikrishnan@rn0j.onmicrosoft.com", 
                                     "mobilePhone": null, 
                                     "officeLocation": null, 
                                     "preferredLanguage": null,
                                      "surname": "Krishnan", 
                                      "userPrincipalName": 
                                      "saikrishnan@rn0j.onmicrosoft.com", 
                                      "id": "84d63063-0892-426f-96ed-da78b2097e60" 
                                */}
                                <List
                                    className="demo-loadmore-list"
                                    itemLayout="horizontal"
                                    dataSource={MSTeamsUsers}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[<Button onClick={() => checkTeamsAvailibility(item)} size='large' block type='default' icon={<img src={teams} height={20} style={{ margin: '0 10px ' }} />} >
                                                Connect
                                            </Button>]}
                                        >
                                            <Skeleton avatar title={false} loading={item.loading} active>
                                                <List.Item.Meta
                                                    avatar={<Avatar size={70} icon={<UserOutlined />} />}
                                                    title={`${item.displayName}`}                                                    
                                                    description={item.jobTitle ? <Space>
                                                        <span> {item.jobTitle} </span>
                                                        <span> {item.officeLocation} </span>

                                                    </Space>: false }
                                                />

                                            </Skeleton>
                                        </List.Item>
                                    )}
                                />
                            </div>
                    }
                </Modal>
            </div>
            <div>
                {!onCall ? <AgentDashboardPage supervisor={supervisor} /> : <AgentOnCall />}
            </div>



        </SplitPane>
    )
}

export default AppIndexPage



// +1 602-812-2928

