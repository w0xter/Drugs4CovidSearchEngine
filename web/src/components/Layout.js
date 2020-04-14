import React from 'react'
import Header from './Header'
import {Row, Col} from 'antd'
export default function Layout(props){
    return(
        <Row>
            <Col
            sm={{ span: 24 }}
            md={{ span: 20, offset: 2 }}
            lg={{ span: 16, offset: 4 }}
            xl={{ span: 12, offset: 6 }}            
            >
                <Header></Header>
                {props.children}
            </Col>
        </Row>
    )
}