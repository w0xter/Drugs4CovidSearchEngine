import React from 'react'
import {Input, Row, Col, Card, Tabs, Typography, Button, message, Table} from 'antd'
import {EyeOutlined, EyeInvisibleOutlined, SettingOutlined} from '@ant-design/icons'
import {sendQuery} from '../../api/virtuoso'
const {TabPane} = Tabs
const {Paragraph, Title} =  Typography
const {TextArea} = Input

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    s = s.toLocaleLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)

  }
export default class Kg extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            question:this.props.data.title,
            sparqlQuery:this.props.data.sparql,
            editedSparqlQuery:this.props.data.sparql,
            editSparqlQuery:false,
            sparqlResult:{},
            showQuery:false,
            showSparqlResult:true,
            error:false
        
        }
    }
    changeQueryState(){
        const next = !this.state.showQuery;
        this.setState({showQuery:next})
    }
    rewriteSparqlQuery = (e) => {
        console.log(e)
        this.setState({editedSparqlQuery:e.target.value})
    }
    changeEditSparqlQueryState = () => {
        const next = !this.state.editSparqlQuery;
        this.setState({editSparqlQuery:next})
    }
    changeSparqlResultState = () => {
        const next = !this.state.showSparqlResult;
        this.setState({showSparqlResult:next})
    }
    execute = (query) => {
        sendQuery(query).then((data) => {
            console.log(data)
            let result = {columns:[], data:data.results.bindings}
            data.head.vars.map((col) => {
                result.columns.push(  {
                    title:capitalize(col.toString()),
                    dataIndex: col,
                    key: col,
                    render: val => val.value
                  })
            })
            return Promise.resolve(result)
        }).then((data) => this.setState({sparqlResult:data}))
        .catch((err) => {
            console.log(err)
            message.error("Opps..")
            this.setState({error:true})
        })
    }
    render(){
    return(
        <>
        <Card>
        <Title level={4}>{this.state.question}</Title>
            <Row gutter={[16,16]} align="top">
                <Col>
                <Button onClick={() => this.execute(this.state.sparqlQuery)}>
                    Answer <SettingOutlined/> 
                </Button>                      
                </Col>
                <Col>
                <Button onClick={() => this.changeQueryState()}>
                    {this.state.showQuery ? 'Hide':'Show'} query {this.state.showQuery ? <EyeInvisibleOutlined/>:<EyeOutlined/>}
                </Button>                
                </Col>
            </Row>
            {this.state.showQuery ? (
                <Tabs>
                    <TabPane tab="SPARQL" key="0">
                        <div style={{padding:16}}>
                            <Row gutter={[16,16]}>
                                <Col>
                                <Title level={4}>SPARQL Query</Title>

                                </Col>
                                <Col>
                                <Button  onClick={() => this.execute(this.state.sparqlQuery)}>
                                Execute <SettingOutlined/> 
                                </Button>
                                </Col>
                            </Row>
                        <Paragraph style={{whiteSpace: 'pre-line'}}>
                            {this.state.sparqlQuery}
                        </Paragraph>
                        <Row gutter={[16,16]}>
                            <Col>
                                <Button onClick={() => this.changeEditSparqlQueryState()}>
                                    {this.state.editSparqlQuery?("Close"):("Rewrite the Query")}
                                </Button>
                            </Col>
                            {
                                this.state.editSparqlQuery ? (
                                    <Col>
                                        <Button  onClick={() => this.execute(this.state.editedSparqlQuery)}>
                                        Execute Edited Query <SettingOutlined/> 
                                        </Button>                                    
                                    </Col>
                                ):''
                            }
                        </Row>
                        {this.state.editSparqlQuery ? (
                            <TextArea
                                rows={10}
                                value={this.state.editedSparqlQuery}
                                onChange={e => this.rewriteSparqlQuery(e)}
                            >

                            </TextArea>
                        ):''}
                        </div>
                    </TabPane>
                </Tabs>
            ):''}
            { Object.keys(this.state.sparqlResult).length !== 0?(
                <div>
                    <Button onClick={() => this.changeSparqlResultState()}>
                        {this.state.showSparqlResult ? 'Hide':'Show'} result {this.state.showSparqlResult ? <EyeInvisibleOutlined/>:<EyeOutlined/>}
                    </Button>                            
                    {
                        this.state.showSparqlResult ?(
                            <Table style={{marginTop:16}} dataSource={this.state.sparqlResult.data} columns={this.state.sparqlResult.columns}/>
                        ):''
                    }
                </div>
            ):''}            
        </Card>
        </>
    )}
}