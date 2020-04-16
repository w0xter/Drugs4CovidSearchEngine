import React, {useState} from 'react'
import {Input,Row, Col,Space, Radio, Typography} from 'antd'
const {Text} = Typography
const { Search } = Input;
export default function SearchBar(props){
    const [type, setType] = useState('generic')
    const searchTypes = ['generic', 'atc', 'activeingredient', 'spanish']
    const urlVal = document.location.href.split("/")[document.location.href.split("/").length-2]
    const defaultValue = (searchTypes.includes(urlVal))? urlVal:'generic'
    const goTo = (value) => {
        document.location.href=`/search/${type}/${value}`
    }
    const onChange = (e) => {
        setType(e.target.value)
    }
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
                            <Radio.Button value="generic">Generic name</Radio.Button>
                            <Radio.Button value="atc">ATC code</Radio.Button>
                            <Radio.Button value="activeingredient">Active ingredient</Radio.Button>
                            <Radio.Button value="spanish">Trade name 🇪🇸</Radio.Button>
                        </Radio.Group>
                        </Col>
                    </Row>
            </div>
    
          )
}