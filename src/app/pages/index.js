import React from 'react'
import SplitPane, { Pane } from 'react-split-pane';
import CustomCCP from './customCCP';
import AgentDashboardPage from './dashboard';
const AppIndexPage = () => {
    return (
        <SplitPane split="vertical">
            <div>
                <CustomCCP />
            </div>
            <div>
                <AgentDashboardPage />
            </div>



        </SplitPane>
    )
}

export default AppIndexPage