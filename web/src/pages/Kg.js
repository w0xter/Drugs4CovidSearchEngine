import React from 'react'
import {Input, Row, Col, Card} from 'antd'
import Layout from '../components/Layout'
import {virtuosoQueries} from '../api/queries'
import QueryCard from '../components/kgComponents/queryCard'
const {TextArea} = Input
export default class Kg extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            queries:virtuosoQueries
        }
        
    }
    render(){
    return(
        <Layout>
            <Row gutter={[16,16]} align="top">
            {this.state.queries.map((query, idx) => (
                <Col span={24}>
                    <QueryCard key={idx} data={query}/>                
                </Col>
            ))}
            </Row>

        </Layout>
    )
    }
}