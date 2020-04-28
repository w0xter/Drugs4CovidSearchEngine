import React from 'react'
import {Menu, Row, Col} from 'antd'
import logo from '../assets/logo.svg'
export default function Header(props){
    return(
        <Row align="middle" justify="space-between">
            <Col>
                <a href="https://drugs4covid.oeg-upm.net/">
                    <img src={logo} alt="" style={{ height: 50 }}/>
                </a>
            </Col>
            <Col>
            <Menu mode="horizontal" style={{paddingTop: 16, paddingBottom:16}}>
                <Menu.Item>
                    <a href="/">Home</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/customsearch">Custom Search</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="https://drugs4covid.oeg-upm.net/">About</a>
                </Menu.Item>
            </Menu>            
            </Col>
        </Row>


    )
}