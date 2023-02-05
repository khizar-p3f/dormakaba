import { Breadcrumb, Button, Card, Col, Divider, Empty, Input, Row, Space, Statistic, Table, Typography } from 'antd'
import { HomeOutlined, UserOutlined, CaretDownOutlined, ShopOutlined, AimOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react'
import ReactHighcharts from 'react-highcharts';

const ContactSurvey = () => {

    const config1=    {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Survey Result'
        },
        subtitle: false,
        xAxis: {
            categories: [1,2,3,4,5],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Ratings (1 -5)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} Ratings</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: surveyIds[0] + " Ratings",
            data: Array.from({ length: 5 }, () => getRandomNumber(1,5))
    
        }, {
            name: surveyIds[1] + " Ratings",
            data: Array.from({ length: 5 }, () => getRandomNumber(1,5))
    
        }, {
            name: surveyIds[2] + " Ratings",
            data: Array.from({ length: 5 }, () => getRandomNumber(1,5))
    
        }, {
            name: surveyIds[3] + " Ratings",
            data: Array.from({ length: 5 }, () => getRandomNumber(1,5))
    
        },
        {
            name: surveyIds[4] + " Ratings",
            data: Array.from({ length: 5 }, () => getRandomNumber(1,5))
    
        }]
    }
    const columns=[
        {
            title: 'contactId',
            dataIndex: 'contactId',
            key: 'contactId',            
        },
        {
            title: 'Survey ID',
            dataIndex: 'surveyId',
            key: 'surveyId',
        },
        {
            title: 'survey 1',
            dataIndex: 'survey_result_1',
            key: 'survey_result_1',
        },
        {
            title: 'survey 2',
            dataIndex: 'survey_result_2',
            key: 'survey_result_2',
        },

    ]
    return (
        <div style={{ minHeight: '100vh', width: '100%', }}>
            <div className='bread-crumbs'>
                <Breadcrumb >
                    <Breadcrumb.Item href="">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <UserOutlined />
                        <span>Supervisor</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Contact Center Visualization</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{ padding: 56, background: '#fff' }}>
                <Row gutter={[16,16]}>
                    <Col span={24}>
                        <ReactHighcharts config={config1} />
                    </Col>
                    <Col span={24}>
                        <Divider orientation='left'> Tabular Data</Divider>
                        <Table columns={columns} dataSource={getSurveyData()} />
                    </Col>

                </Row>
               
            </div>
        </div>
    )
}

export default ContactSurvey

const  surveyIds = ['122345', '544321', '336544', '778995'];
const getSurveyData = () => {
   
    const surveyId = pickRandomfromArray(surveyIds);
    const surveyData = []
    for (var i = 0; i < 60; i++) {
        const surveyId = pickRandomfromArray(surveyIds);
        surveyData.push({
            "contactId": generateUID(),
            "surveyId": surveyId,
            "survey_result_1": getRandomNumber(1, 5),
            "survey_result_2": getRandomNumber(1, 5),
        },)
    }
    return surveyData
}

//generate uid with 36 characters and hypen in every 6 digits
const generateUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);

}

const pickRandomfromArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];

}