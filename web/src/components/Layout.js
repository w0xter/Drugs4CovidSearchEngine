import React from 'react'
import Header from './Header'
import {Row, Col} from 'antd'
export default function Layout(props){
    return(
        <Row justify="center">
            <Col
            xs={{ span: 22 }}
            sm={20}
            md={{ span: 18}}
            lg={{ span: 16}}
            xl={{ span: 12}}            
            >
                <Header></Header>
                {props.children}
            </Col>
        </Row>
    )
}