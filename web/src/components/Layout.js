import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Row, Col} from 'antd'
export default function Layout(props){
    return(
        <Row justify="center">
            <Col
            xs={{ span: 22 }}
            sm={20}
            md={{ span: 18}}
            lg={{ span: 16}}
            xl={{ span: 16}}            
            >
                <Header></Header>
                <div style={{minHeight:'90vh'}}>
                    {props.children}
                </div>
                <Footer></Footer>
            </Col>
        </Row>
    )
}