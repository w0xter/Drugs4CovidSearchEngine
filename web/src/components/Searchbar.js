import React, {useState, Component} from 'react'
import {Input} from 'antd'

const { Search } = Input;
export default function SearchBar(props){
    const goTo = (value) => {
        document.location.href=`/search/${value}`
    }
        return(    
            <div style={{marginBottom:16}}>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => goTo(value)}
            />
            </div>
    
          )
}