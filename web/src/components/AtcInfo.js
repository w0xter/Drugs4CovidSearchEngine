import React, {useState, useEffect} from 'react'
import {List,Typography, Tag, Row, Col, Space, Divider} from 'antd'
import MedicineCarousel from './MedicineCarousel'
const {Title} = Typography

export default function AtcInfo(props){
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        s = s.toLocaleLowerCase()
        return s.charAt(0).toUpperCase() + s.slice(1)
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
                {capitalize(props.data.name)}
            </Title>
            <Divider></Divider>
            { props.data.tradeMedicines.length !== 0 ?(
            <div>
                <MedicineCarousel medicines={props.data.tradeMedicines}></MedicineCarousel>
                <Divider></Divider>
            </div>
            ):''
            }
            {Object.keys(props.data.activeIngredients).length !== 0 ? (
                <div style={{  overflow:'auto'}}>
                    <List
                        header={<Title level={3}>Related Active Ingredients:</Title>}
                        itemLayout="horizontal"

                    >
                        {Object.keys(props.data.activeIngredients).map((key) => {
                            const value = props.data.activeIngredients[key]
                          return  (
                        <List.Item>
                            <List.Item.Meta
                            title={<a href={"/search/activeingredient/" + value.replace(' ', '')}>{capitalize(value)}</a>}
                            description={<a href={'/search/atc/' + key.replace(/ /g, '')}><Tag color="blue">{key}</Tag></a>}
                            />
                        </List.Item>
                        )})}
 
                    </List>
                    <Divider></Divider>
                </div>
            ):''}
            {Object.keys(props.data.articles).length !== 0 ? (
                <div style={{  overflow:'auto'}}>
                    <List
                        header={<Title level={3}>Related Articles:</Title>}
                        itemLayout="horizontal"
                        dataSource={props.data.articles}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            title={ <a href={item.url}>{item.name}</a>}
                            />
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