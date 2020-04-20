import axios from 'axios'
const API = 'https://librairy.linkeddata.es/bio-nlp'
export function findDrugs(data){
    return new Promise((resolve, reject) => {
        const options = {
            header:{
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${API}/drugs`, {text:data}, options).then((response) => {
            resolve(response.data)
        }).catch(err => reject(err));
    });
}
export function getRelatedDrugs(data){
    return new Promise((resolve, reject) => {
        axios.get(`https://librairy.linkeddata.es/bio-nlp/drugs?atc=${data}`).then((response) => {
            resolve(response.data)
        }).catch((err) => reject(err))

    })
} 
export function getRelatedDiseases(data){
    return new Promise((resolve, reject) => {
        axios.get(`https://librairy.linkeddata.es/bio-nlp/diseases?atc=${data}`).then((response) => {
            resolve(response.data)
        }).catch((err) => reject(err))
    })
}
export function getRelatedArticles(data){
    return new Promise((resolve, reject) => {
        axios.get(`https://librairy.linkeddata.es/bio-nlp/articles?atc=${data}`).then((response) => {
            resolve(response.data)
        }).catch((err) => reject(err))
    })
}
export function getMedicinesInfo(data){
    return new Promise((resolve, reject) => {
        axios.get(`https://cima.aemps.es/cima/rest/medicamentos?atc=${data}`).then((response) => {
            resolve(response.data)
        }).catch((err) => reject(err))
    });
}
export function findSpanishTradeNameMedicine(data){
    return new Promise((resolve, reject) => {
        axios.get(`https://cima.aemps.es/cima/rest/medicamentos?nombre=${data}`).then((response) => {
            resolve(response.data)
        }).catch((err) => reject(err))
    });
}
export function getSpanishTradeNameMedicineInfo(data){
    return new Promise((resolve, reject) => {
        axios.get(`https://cima.aemps.es/cima/rest/medicamento?nregistro=${data}`).then((response) => {
            resolve(response.data)
        }).catch((err) => reject(err))    })
}