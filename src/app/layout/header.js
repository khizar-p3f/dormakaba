import React, { useEffect, useState } from 'react'
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
    const [MR, setMR] = useState(null);
    
    useEffect(() => {
      window.khizar={
        ...window.khizar,
        screenRecordingLoaded:true,
      }
    
     
    }, [])
    

    const captureScreenshot = async () => {
        const video = document.querySelector('video');
        const canvas = document.createElement('canvas');
        canvas.width =640;
        canvas.height = 480;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        const blob = await fetch(dataURL).then(r => r.blob());
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        // save the image to the downloads folder
        window.location.href(dataURL)
    };   


    const recordScreen = async () => {
        return await navigator.mediaDevices.getDisplayMedia({
            audio:  false,
            video: { mediaSource: "screen" }
        });
    }
    
    
    const createRecorder = (stream, mimeType) => {
        // the stream data is stored in this array
        let recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        }
        mediaRecorder.onstop = function () {
            saveFile(recordedChunks);
            recordedChunks = [];
        }
        mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
        return mediaRecorder;
    }

    const startRecording = async () => {
        let stream = await recordScreen();
        let mimeType = 'video/webm';
        let mediaRecorder = createRecorder(stream, mimeType);
        setMR(mediaRecorder)
        setRecording(true)
    }
    const stopRecording = () => {
        MR.stop();        
        setRecording(false)
    }
    const saveFile = (recordedChunks) => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        window.open(URL.createObjectURL(blob));       
    }


    return (
        <section className='app-main-header'>
            {!secondary ?
                <Header style={{ backgroundColor: token.colorBgBase }}  >
                    <div className="logo" > <Link to={supervisor ? "/supervisor/" : "/"}><img src={logo} alt="logo" height={30} /></Link></div>
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
                                <Button onClick={()=>stopRecording()}  type='default'  icon={<img src={recordingImg} height={25} />} shape='round'  >&nbsp;Recording </Button>
                               :
                            <Button onClick={()=>startRecording()}  type='default' icon={<VideoCameraOutlined />} shape='round'  >Record</Button>
                            }
                          
                        <Button type='link' onClick={()=>captureScreenshot()}>
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
                                            label: <Link to="/supervisor/">Agent Call Center</Link>,
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

                                        },
                                        {
                                            key: 'survey',
                                            label: <Link to={supervisor ? "/supervisor/reports/survey/" : "/reports/survey"}>Survey</Link>,

                                        },
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


