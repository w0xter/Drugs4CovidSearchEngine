import React, {useState} from 'react'
import {Input, message} from 'antd'
import {findDrugs, getRelatedDrugs, getRelatedDiseases, getRelatedArticles} from '../api/requests'
const { Search } = Input;
export default function SearchBar(props){
    const [find, setFind] = useState(false)
    const sendData = (value) => {
        let key = 'updatable'
        message.loading({ content: 'Loading...', key });
        if(value.length !== 0){
            searh(value).then((data) => {
                props.parentCallback(data)
                message.success({ content: 'Loaded!', key, duration: 2 });
            }).catch(err => message.error("Oops, somenthing goes wrong please try it again..."))
        }else{
            message.error({content:"The search field is empty!", key, duration:2})
        }
    }
    const searh = (data) => {
        return new Promise((resolve, reject) => {
            findDrugs({text:data}).then((response) => {
                let result= response
                let promiseChainRelatedDrugs = []
                let promiseChainRelatedDiseases = []
                let promiseChainRelatedArticles = []
                response.map((drug, idx) => {
                    result[idx].relatedDrugs = []
                    result[idx].relatedDiseases = []
                    result[idx].relatedArticles = []
                    promiseChainRelatedArticles.push(getRelatedArticles(drug.atc_code))
                    promiseChainRelatedDrugs.push(getRelatedDrugs(drug.atc_code))
                    promiseChainRelatedDiseases.push(getRelatedDiseases(drug.atc_code))
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
                    return Promise.all(promiseChainRelatedDiseases)
                })
                .then((data) => {
                    console.log("Llego 3")
                    Promise.resolve(data.map((diseases, idx) => {
                        result[idx].relatedDiseases=diseases
                    })).then(() => resolve(result))                    
                })
                .catch((err) => reject(err))
    
            }).catch((err) => reject(err))
        })
    }
    return(    
        <div style={{marginBottom:16}}>
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value => sendData(value)}
        />
        </div>

      )
}