import React, { useEffect, useRef, useState } from 'react'

import SplitPane, { Pane } from 'react-split-pane';

import AgentDashboardPage from './dashboard';
import '../../aws-streams/connect-streams'
import './customCCP/index.less'
import AgentOnCall from './dashboard/onCall';
const AppIndexPage = (props) => {
    const { supervisor } = props
    const ccp = useRef(null);
    const [ccpInitiated, setCcpInitiated] = useState(false);
    const [onCall, setonCall] = useState(false);

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
    return (
        <SplitPane split="vertical">
            <div>
                <div className='custom-ccp'>
                    <div className='hide-header'></div>
                    <div ref={ccp} id="iframe1" className="ccp-panel" >

                    </div>
                </div>
            </div>
            <div>
                {
                    !onCall ?

                        <AgentDashboardPage  supervisor={supervisor} />
                        :
                        <AgentOnCall />
                }

            </div>



        </SplitPane>
    )
}

export default AppIndexPage