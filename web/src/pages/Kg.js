import React from 'react'
import {Input, Row, Col, Card} from 'antd'
import Layout from '../components/Layout'
import queries from '../api/queries'
import QueryCard from '../components/kgComponents/queryCard'
const {TextArea} = Input
export default class Kg extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            queries:queries
        }
        
    }
    render(){
    return(
        <Layout>
            {this.state.queries.map((query) => (
                    <QueryCard data={query}/>
            ))}
        </Layout>
    )
    }
}