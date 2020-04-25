import React, {useEffect, useState} from 'react'
import {message,Spin, Result, Row, Col, Typography, Space} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import SearchBar from '../components/Searchbar'
import DrugTabs from '../components/DrugTabs'
import Layout from '../components/Layout'
import abduction from '../assets/abduction.svg'
import {searchByActiveIngredient, searchBySpanishTradeName, searchByAtc} from '../api/searchs'
const {Title} = Typography
export default function SearchPage(props){
    const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
    const value = props.match.params.drugsNames
    const searchType = props.match.params.searchType
    const [result, setResult] = useState([])
    const [searching, setSearching] = useState(true)
    const [error, setError] = useState(false)

    const sendData = (value) => {
        let key = 'updatable'
        if(value.length !== 0 && searchType !== "disease"){
            Promise.resolve(searchType)
            .then((type) => {
                if(type === 'disease'){
                   return Promise.resolve([])
                }else if (type === 'drug'){
                    return searchByAtc(value)
                }else{
                    setSearching(false)
                    setError(true)
                    message.error('This field is not valid')
                    return Promise.reject('Invalid search field')
                }
            }).then((data) => {
                if(data.length !== 0){
                    message.success({ content: 'Loaded!', key, duration: 0.5 });
                    setResult(data)
                    setSearching(false)
                }else{
                        message.warning({content:"Sorry we didn't find anything...", key, duration:2})
                        setSearching(false)
                }
            }).catch((err) => {
                console.log(err)
                message.error("Oops, somenthing goes wrong please try it again...")
                setSearching(false)
                setError(true)
            })
        }else{
            message.error("Oops, somenthing goes wrong please try it again...")
            setSearching(false)
            setError(true)        
        }
    }

    useEffect(() => {
        sendData(value)
    },[])
        return(
            <Layout>
            <SearchBar></SearchBar>
            {result.length !== 0 ? <DrugTabs drugs={result}></DrugTabs>:searching ? (
                <Row align="middle" justify="center" style={{marginTop:20}}>
                    <Col justify="center">
                        <Spin indicator={antIcon} />                    
                    </Col>
                </Row>
            ):error ? (
                <Result
                status="500"
                title="500"
                subTitle="Oh no! Our spaghetti code is not working properly. We will be back soon!" />               
            ):(
                <Row justify="center" align="middle">
                    <Col span={14}justify="center" align="middle">
                        <Space direction="vertical" size="large">
                        <Title level={3}>Wow, some alien abducted the {value} from our drug repository</Title>
                        <img src={abduction} className="responsiveImg" alt=""/>
                        <Title type="secondary" level={4}>Just kidding, we haven't found anything related with this drug</Title>
                        </Space>
                    </Col>
                    </Row>
            )
        }
            </Layout>
        )
}