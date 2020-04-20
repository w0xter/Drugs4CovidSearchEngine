import React, {useState, useEffect} from 'react'
import {Input,Row, Col,Space, Radio, Typography} from 'antd'
const {Text} = Typography
const { Search } = Input;
export default function SearchBar(props){
    const [type, setType] = useState('activeingredient')
    const searchTypes = ['atc', 'activeingredient', 'spanish']
    const url = document.location.href.split("/")
    const urlVal = url[url.length - 2]
    const defaultValue = (searchTypes.includes(urlVal))? urlVal:'activeingredient'
    const goTo = (value) => {
        document.location.href=`/search/${type}/${value}`
    }
    const onChange = (e) => {
        setType(e.target.value)
    }
    useEffect(() => {
        setType(defaultValue)
    },[])
        return(    
            <div style={{marginBottom:16}}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => goTo(value)}
                    />
                    <Row style={{marginTop:10}} gutter={[16, 16]} align="middle">
                        <Col>
                        <Text level={4} type="secondary">Search by: </Text>
                        </Col>
                        <Col>
                        <Radio.Group onChange={onChange} defaultValue={defaultValue} size="small">
                            <Radio.Button value="activeingredient">Active ingredient</Radio.Button>
                            <Radio.Button value="atc">ATC code</Radio.Button>
                            <Radio.Button value="spanish">Spanish Trade name 🇪🇸</Radio.Button>
                        </Radio.Group>
                        </Col>
                    </Row>
            </div>
    
          )
}