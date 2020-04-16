import React, {useEffect, useState} from 'react'
import {Tabs,Typography, Tag, Row, Col, Space, Divider} from 'antd'
import MedicineCarousel from './MedicineCarousel'
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
        s = s.toLocaleLowerCase()
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    console.log(drugs)    
    return(
        <>
        {drugs.length !== 0 ?(
        <Tabs>
            {drugs.map((drug) => {
                return(
                    <TabPane tab={capitalize(drug.name)} key={drug.atc_code}>
                        <Row gutter={[16,16]}>
                            <Col>
                            <Tag color="blue">ATC: {drug.atc_code}</Tag>
                            </Col>
                            <Col>
                                <Tag color="geekblue">Parent ATC: {drug.atc_parent}</Tag>
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
                        { drug.medicinesInfo.length !== 0 ?(
                        <div>
                            <MedicineCarousel medicines={drug.medicinesInfo}></MedicineCarousel>
                            <Divider></Divider>
                        </div>
                        ):''
                        }
                        <div style={{  overflow:'auto'}}>
                        {Object.keys(drug.relatedDrugs).length !== 0 ? (
                            <>
                            <Title level={3}>Related Drugs:</Title>
                            <Space direction="vertical" size="small">
                            { Object.keys(drug.relatedDrugs).map((key) =>{
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
                        <div style={{  overflow:'auto'}}>
                            <Title level={3}>This drug appear in:</Title>
                            <Space direction="vertical">
                                {drug.relatedArticles.map((article) => (
                                    <a target="_blank"href={article.url}>{article.name}</a>
                                ))}
                            </Space>
                        </div>
                        <Divider></Divider>
                        <div style={{  overflow:'auto'}}>
                            <Title level={3}>Related Diseases:</Title>
                            <Space direction="vertical" size="small">
                                <Row gutter={[8,8]} justify="left" align="middle">
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