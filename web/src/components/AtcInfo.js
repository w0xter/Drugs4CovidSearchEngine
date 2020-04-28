import React, {useState, useEffect} from 'react'
import {List,Table, Typography, Tag, Row, Col, Space, Divider, Button, Tooltip, Result,Collapse} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'
import MedicineCarousel from './MedicineCarousel'
import RelatedArticlesCollapse from './RelatedArticlesCollapse'
import { getArticleInfo } from '../api/requests'
import {FiExternalLink} from 'react-icons/fi'

const {Title} = Typography
const {Paragraph} = Typography
const {Text} = Typography
const {Panel} = Collapse
const uselessWords = ["and", "or"]
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    s = s.toLocaleLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
export default class AtcInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
            articles:this.props.data.relatedArticles,
            empty:(
                this.props.data.relatedArticles.length === 0 &&
                this.props.data.relatedDrugs.length === 0 &&
                this.props.data.relatedDiseases.length === 0 &&
                this.props.data.replacementDrugs.length === 0
            )
        }
    }
    relatedWords = () => {
        let result = [this.state.data.id]
        result = result.concat(this.state.data.label_t.replace(/([,])+/g, '').split(" "))
        result = result.filter((word) => !uselessWords.includes(word))
        return result
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
    goTo = (field, id) => {
        document.location.href=`/search/${field}/${id}`
    }

    render(){
        console.log(this.state.data)
    return(
        <>
            <Title level={2}>
                Drug: {this.capitalize(this.state.data.label_t)}
            </Title>
            <Row gutter={[16,16]}>
                <Col>
                <Tag color="blue">ATC: {this.state.data.id}</Tag>
                </Col>
                <Col>
                    <Tag className="hoverEffect" color="geekblue" onClick={() => this.goTo('drug',this.state.data.parent_s )}>Parent ATC: {this.state.data.parent_s}</Tag>
                </Col>
                <Col>
                        <Tag color="green">CUI: {this.state.data.cui_s}</Tag>
                </Col>
                <Col>
                        <Tag color="volcano">LEVEL: {this.state.data.level_i}</Tag>                        
                </Col>
            </Row>                        
            <Divider></Divider>
            {
                this.state.empty ? (
                    <>
                <Result
                    status="404"
                    title="404"
                    subTitle={"Sorry, we didn't found anything about " + this.state.data.label_t}
                    extra={<Button href={"/customsearch/" + this.state.data.label_t} type="primary">Try to use the Custom Search</Button>}
                  />
                    <Divider></Divider>
                  </>
                ):''
            }            
            { this.state.data.tradeMedicines.length !== 0 ?(
            <div>
                <MedicineCarousel medicines={this.state.data.tradeMedicines}></MedicineCarousel>
                <Divider></Divider>
            </div>
            ):''
            }{this.state.data.relatedArticles.length !== 0?(
                <RelatedArticlesCollapse relatedWords={this.relatedWords()} data={this.state.data.relatedArticles}/>

            ):''
            }
            {this.state.data.replacementDrugs.length !==0?(
                <Row>
                    <Col span={24}>
                        <List
                            size="small"
                            header={<Title level={3}>We have found these possible substitutes</Title>}
                            dataSource={this.state.data.replacementDrugs}
                            renderItem={(item) => (
                                <List.Item
                                    style={{padding:10}}
                                    onClick={() => this.goTo('drug',item.code)}
                                    className="hoverEffect"
                                    actions={[ <a href={`/search/drug/${item.code}`}><FiExternalLink/></a>]}
                                >
                                <List.Item.Meta
                                    title={<Text strong>{capitalize(item.name)}</Text>}
                                    description={
                                        <Tag color="blue">
                                        ATC {item.code}
                                        </Tag>
                                    }
                                />
                                </List.Item>
                                )}
                            />
                            <Divider></Divider>
                    </Col>
                </Row>
            ):''}
            <Row gutter={[16,16]}>
                <Col xs={24} md={12}>
                {
                this.state.data.relatedDrugs.length !== 0 ?(
                    <>
                    <List
                    size="small"
                    header={<Title level={3}>Related Drugs</Title>}
                    dataSource={this.state.data.relatedDrugs}
                    renderItem={(item) => (
                        <List.Item
                            style={{padding:10}}
                            onClick={() => this.goTo('drug',item.code)}
                            className="hoverEffect"
                            actions={[ <a href={`/search/drug/${item.code}`}><FiExternalLink/></a>]}
                        >
                        <List.Item.Meta
                            title={<Text strong>{capitalize(item.name)}</Text>}
                            description={
                                <Tag color="blue">
                                ATC {item.code}
                                </Tag>
                            }
                        />
                        </List.Item>
                        )}
                    />
                    <Divider></Divider>
                    </>
                ):''
            }                
                </Col>
                <Col xs ={24} md={12}>
                {
                this.state.data.relatedDiseases.length !== 0 ?(
                    <>
                    <List
                    size="small"
                    header={<Title level={3}>Related Diseases</Title>}
                    dataSource={this.state.data.relatedDiseases}
                    renderItem={(item) => (
                        <List.Item
                            style={{padding:10}}
                            onClick={() => this.goTo('disease',item.code)}
                            className="hoverEffect"
                            actions={[ <a href={`/search/drug/${item.code}`}><FiExternalLink/></a>]}
                        >
                        <List.Item.Meta
                            title={<Text strong>{capitalize(item.name)}</Text>}
                            description={
                                <Tag color="red">
                                MESH {item.code}
                                </Tag>
                            }
                        />
                        </List.Item>
                        )}
                    />
                    <Divider></Divider>
                    </>
                ):''
            }                 
                </Col>
            </Row>           
            
        </>
    )
    }
}