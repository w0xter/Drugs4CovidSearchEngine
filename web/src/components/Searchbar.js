import React from 'react'
import {Input, message} from 'antd'
import {findDrugs} from '../api/requests'
const { Search } = Input;
export default function SearchBar(props){
    const searh = (data) => {
        findDrugs({text:data}).then((response) => {
            props.parentCallback(response)
        }).catch((err) => message.error("Oops, somenthing goes wrong please try it again..."))
    }
    return(    
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value => searh(value)}
        />
      )
}