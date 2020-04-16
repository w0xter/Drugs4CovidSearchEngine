import React, {useEffect, useState} from 'react'
import {message,Spin, Result, Row, Col, Typography, Space} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import {findDrugs, getRelatedDrugs, getRelatedDiseases, getRelatedArticles, getMedicinesInfo} from '../api/requests'
import SearchBar from '../components/Searchbar'
import DrugTabs from '../components/DrugTabs'
import Layout from '../components/Layout'
import abduction from '../assets/abduction.svg'

const {Title} = Typography
export default function SearchPage(props){
    const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
    const value = props.match.params.drugsNames
    const [result, setResult] = useState([])
    const [searching, setSearching] = useState(true)
    const [error, setError] = useState(false)

    const sendData = (value) => {
        let key = 'updatable'
        if(value.length !== 0){
            searh(value).then((data) => {
                if(data.length !== 0){
                    message.success({ content: 'Loaded!', key, duration: 0.5 });
                    setResult(data)
                    setSearching(false)
                }else{
                        message.warning({content:"Sorry we didn't find anything...", key, duration:2})
                        setSearching(false)
                }
            }).catch(err => {
                message.error("Oops, somenthing goes wrong please try it again...")
                setSearching(false)
                setError(true)
            })
        }else{
            message.error({content:"The search field is empty!", key, duration:2})
        }
    }
    const searh = (data) => {
        return new Promise((resolve, reject) => {
            findDrugs({text:data}).then((response) => {
                let result = response
                let promiseChainRelatedDrugs = []
                let promiseChainRelatedDiseases = []
                let promiseChainRelatedArticles = []
                let promiseChainMedicineInfo = [] 
                response.map((drug, idx) => {
                    result[idx].relatedDrugs = []
                    result[idx].relatedDiseases = []
                    result[idx].relatedArticles = []
                    result[idx].medicinesInfo = []
                    promiseChainRelatedArticles.push(getRelatedArticles(drug.atc_code))
                    promiseChainRelatedDrugs.push(getRelatedDrugs(drug.atc_code))
                    promiseChainRelatedDiseases.push(getRelatedDiseases(drug.atc_code))
                    promiseChainMedicineInfo.push(getMedicinesInfo(drug.atc_code))
                })
                Promise.all(promiseChainRelatedDrugs).then((data) =>{
                    data.map((drugs, idx) => {
                        console.log("Llego 1")
                    if (Object.keys(drugs).includes(result[idx].atc_code)) 
                        delete drugs[result[idx].atc_code]
                    result[idx].relatedDrugs=drugs
                    })
                    return Promise.all(promiseChainRelatedArticles)
                }).then((data) => {
                    console.log("Llego 2")
                    data.map((articles, idx) => {
                        result[idx].relatedArticles=articles
                    })
                    return Promise.all(promiseChainMedicineInfo)
                }).then((data) => {
                    console.log("Llego 3")
                    data.map((medicines, idx) => {
                        result[idx].medicinesInfo = medicines.resultados
                    })
                    return Promise.all(promiseChainRelatedDiseases)
                })
                .then((data) => {
                    console.log("Llego 4")
                    Promise.resolve(data.map((diseases, idx) => {
                        result[idx].relatedDiseases=diseases
                    })).then(() => resolve(result))                    
                })
                .catch((err) => reject(err))
    
            }).catch((err) => reject(err))
        })
    }    

    useEffect(() => {
        sendData(value)
    },[value])
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
                        <Title type="secondary" level={4}>Just kidding, we didn't find anything related with this drug</Title>
                        </Space>
                    </Col>
                    </Row>
            )
        }
            </Layout>
        )
}