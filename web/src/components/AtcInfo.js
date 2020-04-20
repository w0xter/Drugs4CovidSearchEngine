import React, {useState, useEffect} from 'react'
import {List,Table, Typography, Tag, Row, Col, Space, Divider, Button, Tooltip} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'
import MedicineCarousel from './MedicineCarousel'
const {Title} = Typography
const {Paragraph} = Typography
const {Text} = Typography

export default function AtcInfo(props){
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        s = s.toLocaleLowerCase()
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
      const removeSpaces = (text) => {
            if(typeof text !== 'string')
                return ''
            return text.replace(/([ ])+/g, '')
        }
      const relatedDrugs = {
        columns:[
            {
                title:'Active Ingredient',
                dataIndex:'activeingredient',
                render: text => (<a href={"/search/activeingredient/" + removeSpaces(text)}>{text}</a> )
            },
            {
                title:'ATC',
                dataIndex:'atc',
                render: text => (<a href={"/search/atc/" + removeSpaces(text)}>{text}</a>)
            }
        ],
        data:[]
    }
    if(Object.keys(props.data.activeIngredients).length){
        Object.keys(props.data.activeIngredients).map((key, idx) => {
            relatedDrugs.data.push({key:idx, atc:key, activeingredient:capitalize(props.data.activeIngredients[key])})
        })
    }
    return(
        <>
            {/* <Row gutter={[16,16]}>
                <Col>
                <Tag color="blue">ATC: {props.data.atc_code}</Tag>
                </Col>
                <Col>
                    <Tag color="geekblue">Parent ATC: {props.data.atc_parent}</Tag>
                </Col>
                <Col>
                        <Tag color="green">CUI: {props.data.cui}</Tag>
                </Col>
                <Col>
                        <Tag color="volcano">LEVEL: {props.data.level}</Tag>                        
                </Col>
            </Row>                         */}
            <Title level={2}>
                {props.data.name.toUpperCase()}
            </Title>
            <Divider></Divider>
            { props.data.tradeMedicines.length !== 0 ?(
            <div>
                <MedicineCarousel medicines={props.data.tradeMedicines}></MedicineCarousel>
                <Divider></Divider>
            </div>
            ):''
            }
            {relatedDrugs.data.length !== 0 ? (
                <div style={{  overflow:'auto'}}>
                    <Title level={3}>Related Active Ingredients:</Title>
                    <Table size="small"  columns={relatedDrugs.columns} dataSource={relatedDrugs.data}></Table>
                    <Divider></Divider>
                </div>
            ):''}
            {Object.keys(props.data.articles).length !== 0 ? (
                <div>
                    <List
                        header={<Title level={3}>Related Articles:</Title>}
                        itemLayout="horizontal"
                        dataSource={props.data.articles}
                        renderItem={item => (
                        <List.Item>
                                {item.name.length > 90? (
                                    <Text color="blue">
                                        <a href={item.url}>
                                        {item.name.substring(0,80) + '... '}
                                        </a>
                                    <Tooltip trigger={['hover', 'click']} title={item.name} placement="bottom">
                                        <InfoCircleOutlined />
                                    </Tooltip>
                                    </Text>
                                ):(
                                    <a href={item.url}>
                                    {item.name}
                                    </a>
                                )}
                        </List.Item>
                        )}
                    />
                    <Divider></Divider>
                </div>
            ):''}                                       
            <div style={{  overflow:'auto'}}>
                <Title level={3}>Related Diseases:</Title>
                <Space direction="vertical" size="small">
                    <Row gutter={[8,8]} justify="left" align="middle">
                    { Object.keys(props.data.diseases).map((disease) => {
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
        </>
    )
}