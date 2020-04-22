import React, {useState, useEffect} from 'react'
import {List,Table, Typography, Tag, Row, Col, Space, Divider, Button, Tooltip, Collapse} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'
import MedicineCarousel from './MedicineCarousel'
import { getArticleInfo } from '../api/requests'
const {Title} = Typography
const {Paragraph} = Typography
const {Text} = Typography
const {Panel} = Collapse

export default class AtcInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data
        }
    }
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        s = s.toLocaleLowerCase()
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    removeSpaces = (text) => {
            if(typeof text !== 'string')
                return ''
            return text.replace(/([ ])+/g, '')
        }

    render(){
    return(
        <>
            <Row gutter={[16,16]}>
                <Col>
                <Tag color="blue">ATC: {this.state.data.id}</Tag>
                </Col>
                <Col>
                    <Tag color="geekblue">Parent ATC: {this.state.data.parent_s}</Tag>
                </Col>
                <Col>
                        <Tag color="green">CUI: {this.state.data.cui_s}</Tag>
                </Col>
                <Col>
                        <Tag color="volcano">LEVEL: {this.state.data.level_i}</Tag>                        
                </Col>
            </Row>                        
            <Title level={2}>
                {this.capitalize(this.state.data.label_t)}
            </Title>
            <Divider></Divider>
            { this.state.data.tradeMedicines.length !== 0 ?(
            <div>
                <MedicineCarousel medicines={this.state.data.tradeMedicines}></MedicineCarousel>
                <Divider></Divider>
            </div>
            ):''
            }
            <Collapse defaultActiveKey={[0]}>
            {this.state.data.relatedArticles.map((item, idx) => (
                <Panel ke={idx}>
                    <Paragraph className="text-justify"> 
                        {item.paragraph.text_t}
                    </Paragraph>
                </Panel>
            ))}
            </Collapse>
        </>
    )
    }
}