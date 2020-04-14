import React, {useEffect, useState} from 'react'
import {Tabs,Typography, Tag, Row, Col, Space, Divider} from 'antd'

const { TabPane } = Tabs;
const {Title} = Typography
const {Paragraph} = Typography
const { Text } = Typography;
/*

atc_code: "N02BE01"
​​
atc_parent: "N02BE"
​​
cui: "C0000970"
​​
level: 5
​​
name: "paracetamol"
*/
export default function DrugTabs({drugs}){
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }    
    return(
        <>
        {drugs.length !== 0 ?(
        <Tabs>
            {drugs.map((drug) => {
                return(
                    <TabPane tab={capitalize(drug.name)} key={drug.name}>
                        <Row gutter={[16,16]}>
                            <Col>
                            <Tag color="blue">ATC: {drug.atc_code}</Tag>
                            </Col>
                            <Col>
                                <Tag color="purple">Parent ATC: {drug.atc_parent}</Tag>
                            </Col>
                            <Col>
                                 <Tag color="green">CUI: {drug.cui}</Tag>
                            </Col>
                            <Col>
                                 <Tag color="volcano">LEVEL: {drug.level}</Tag>                        
                            </Col>
                        </Row>                        
                        <Title level={2}>
                            {capitalize(drug.name)}
                        </Title>
                        <Divider></Divider>
                        <div>
                        {Object.keys(drug.relatedDrugs).length !== 0 ? (
                            <>
                            <Title level={3}>Related Drugs:</Title>
                            <Space direction="vertical" size="small">
                            { Object.keys(drug.relatedDrugs).map((key) =>{
                                console.log(Object.keys(drug.relatedDrugs))
                                return(
                                <Row gutter={[16,16]}>
                                    <Col>
                                    <Text strong>
                                        {capitalize(drug.relatedDrugs[key])}
                                    </Text>
                                    </Col>
                                    <Col>
                                        <Tag color="blue">
                                            ATC: {key}
                                        </Tag>
                                    </Col>
                                </Row>
                                
                                )
                            })}
                            </Space>
                            </>
                        ):''}                           
                        </div>
                        <Divider></Divider>
                        <div>
                            <Title level={3}>This drug appear in:</Title>
                            <Space direction="vertical">
                                {drug.relatedArticles.map((article) => (
                                    <a target="_blank"href={article.link}>{article.name}</a>
                                ))}
                            </Space>
                        </div>
                        <Divider></Divider>
                        <div>
                            <Title level={3}>Related Diseases:</Title>
                            <Space direction="vertical" size="small">
                                <Row gutter={[16,16]}>
                                { Object.keys(drug.relatedDiseases).map((disease) => {
                                    return(
                                    <Col>
                                        <Tag color="red">{disease}</Tag>
                                    </Col>
                                    )
                                })}
                                </Row>
                            </Space>
                        </div>
                        <Divider></Divider>
                    </TabPane>
                )
            })}
        </Tabs>
        ):''}
        </>
    )
}