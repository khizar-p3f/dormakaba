import React, { useEffect, useRef, useState } from 'react'

import SplitPane, { Pane } from 'react-split-pane';

import AgentDashboardPage from './dashboard';
import '../../aws-streams/connect-streams'
import './customCCP/index.less'
import AgentOnCall from './dashboard/onCall';
import { Button, Dropdown, notification, Space,theme } from 'antd';
import { UserOutlined, InfoCircleOutlined, UsergroupDeleteOutlined, AlertOutlined } from '@ant-design/icons';



const AppIndexPage = (props) => {
    const { supervisor } = props
    const ccp = useRef(null);
    const [ccpInitiated, setCcpInitiated] = useState(false);
    const [onCall, setonCall] = useState(false);
    const [agent, setAgent] = useState(null);
    const [state, setState] = useState({
        status: null
    })
    const {useToken} =theme
    const {token} =useToken()

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
    return (
        <SplitPane split="vertical">
            <div>
                <div className='custom-ccp'>
                    <div className='hide-header' style={{background:state.status =="Available" ? token.colorBgBase : token.colorWarningBg}} >
                        <Dropdown menu={{ items, }}>
                            <Button style={{ marginTop: 10, fontSize:16 }} type='link' icon={<AlertOutlined />} >{state.status}</Button>
                        </Dropdown>
                    </div>
                    <div ref={ccp} id="iframe1" className="ccp-panel" >

                    </div>
                </div>
            </div>
            <div>
                {!onCall ? <AgentDashboardPage supervisor={supervisor} /> : <AgentOnCall />}
            </div>



        </SplitPane>
    )
}

export default AppIndexPage