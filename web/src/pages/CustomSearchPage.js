import React from 'react'
import Layout from '../components/Layout'
import CustomSearchComponent from '../components/CustomSearchComps/CustomSearchComponent'
import {solrQueries} from '../api/queries'
import {Row,Col, Divider, Typography} from 'antd'

const {Title} = Typography
const example =      {
    question:"Build your own query:", 
    type:"keywords",
    keywords:'',
    search:[]
} 
 export default class CustomSearchPage extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             queries:solrQueries
         }
     }
     render(){
        return(
            <Layout>
                <Row>
                    <Col span={24}>
                        <CustomSearchComponent data={example}/>
                    </Col>
                </Row>
                <Divider></Divider>
                <Title level={3}>
                    Some examples queries:
                </Title>
                <Row gutter={[16,16]}>
                   
                    {this.state.queries.map((query, idx) => (
                         <Col span={24} >
                        <CustomSearchComponent key={idx} data={query}/>
                        </Col>

                    ))}                    
                </Row>
            </Layout>
        )
     }
 }