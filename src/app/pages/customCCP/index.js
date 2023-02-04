import React, { useEffect, useRef } from 'react'
import '../../../aws-streams/connect-streams'
import './index.less'

const CustomCCP = () => {
    const ccp = useRef(null);
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

        }
    }
    return (
        <div className='custom-ccp'>
            <div className='hide-header'></div>
            <div ref={ccp} id="iframe1" className="ccp-panel" >

            </div>
        </div>
    )
}

export default CustomCCP