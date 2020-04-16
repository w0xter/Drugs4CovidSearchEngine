import React, {useState, Component} from 'react'
import {Input, message} from 'antd'
import {findDrugs, getRelatedDrugs, getRelatedDiseases, getRelatedArticles, getMedicinesInfo} from '../api/requests'
const { Search } = Input;
export default class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state ={
            find:'', 
            lastSearch:''
        }
    }
    sendData(value){
        let key = 'updatable'
        message.loading({ content: 'Loading...', key });
        if(value.length !== 0){
            this.searh(value).then((data) => {
                if(data.length !== 0){
                    localStorage.setItem('lastSearch', value)
                    this.props.parentCallback(data)
                    message.success({ content: 'Loaded!', key, duration: 0.5 });
                }else{
                    localStorage.setItem('lastSearch', '')
                    message.warning({content:"Sorry we didn't find anything...", key, duration:2})
                }
            }).catch(err => {
                localStorage.setItem('lastSearch', '')
                message.error("Oops, somenthing goes wrong please try it again...")
            })
        }else{
            localStorage.setItem('lastSearch', '')
            message.error({content:"The search field is empty!", key, duration:2})
        }
    }
    searh(data){
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
    render(){
        return(    
            <div style={{marginBottom:16}}>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => this.sendData(value)}
            />
            </div>
    
          )
    }
    componentDidMount() {
        Promise.resolve(this.setState({lastSearch:localStorage.getItem('lastSearch')})).then(() => {
            if(this.state.lastSearch !== null && this.state.lastSearch.length !== 0){
                this.sendData(this.state.lastSearch)
            }
        })
    }    
}