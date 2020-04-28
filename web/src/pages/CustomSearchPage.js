import React from 'react'
import Layout from '../components/Layout'
import QueryTutorialComponent from '../components/QueryTutorialComponents/QueryTutorialComponent'
import {solrQueries} from '../api/queries'
import {Row,Col, Divider, Typography} from 'antd'

const {Title} = Typography
 export default class CustomSearchPage extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             queries:solrQueries,
             example: {
                question:"Build your own query:", 
                type:"keywords",
                keywords:'',
                search:[]
            } 
         }
     }
     componentWillMount(){
         if(Object.keys(this.props.match.params).includes('keywords') && this.props.match.params.keywords !== undefined){
            let example = this.state.example
            const keywords = this.props.match.params.keywords
            const search = ['drugs', 'diseases', 'texts']
            example.keywords = keywords  
            example.search = search
            this.setState({example:example})
         }
     }
     render(){
        return(
            <Layout>
                <Row>
                    <Col span={24}>
                        <QueryTutorialComponent expanded={true} data={this.state.example}/>
                    </Col>
                </Row>
                <Divider></Divider>
                <Title level={3}>
                    Some examples queries:
                </Title>
                <Row gutter={[16,16]}>
                   
                    {this.state.queries.map((query, idx) => (
                         <Col span={24} >
                        <QueryTutorialComponent expanded={false} key={idx} data={query}/>
                        </Col>

                    ))}                    
                </Row>
            </Layout>
        )
     }
 }