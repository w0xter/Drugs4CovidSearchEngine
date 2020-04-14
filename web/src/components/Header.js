import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'
export default function Header(props){
    return(
        <Menu style={{paddingTop: 16, paddingBottom:16}}>
            <Menu.Item style={{float:'left'}}>
                <Link to="/">BIO NLP</Link>
            </Menu.Item>
        </Menu>
    )
}