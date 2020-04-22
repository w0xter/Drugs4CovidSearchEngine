import axios from 'axios'
const API = 'https://librairy.linkeddata.es/bio-nlp'
const solr = 'https://librairy.linkeddata.es/solr'
const solr_atc = `${solr}/atc`
const solr_diseases = `${solr}/diseases`
const solr_paragraphs = `${solr}/covid-paragraphs`
const solr_articles = `${solr}/covid`
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
//DRUGS
export function getInfoByAtc(atc){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_atc}/select?fq=id%3A${atc}&q=*`).then((response) => {
            resolve(response.data.response.docs[0])
        }).catch((err) => reject(err))
    })
}
export function getAtcByGenericName(label){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_atc}/select?fl=id&fq=label_t%3A${label}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch((err) => reject(err))
    })
}
export function getAtcByCimaCode(cima_code){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_atc}/select?fl=id&fq=cima_codes%3A${cima_code}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch((err) => reject(err))
    })
}

//Diseases
export function getDiseaseInfo(id){
    return new Promise((resolve, reject) =>  {
        axios.get(`${solr_diseases}/select?fq=id%3A${id}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch(err => reject(err))        
    })
}
export function getMeshByName(name){
    return new Promise((resolve, reject) =>  {
        axios.get(`${solr_diseases}/select?fl=id&fq=name_t%3A${name}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch(err => reject(err))        
    })
}
export function getMeshBySynonym(synonym){
    return new Promise((resolve, reject) =>  {
        axios.get(`${solr_diseases}/select?fl=id&fq=synonyms%3A${synonym}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch(err => reject(err))        
    })
}
export function getMeshByMapping(mapping){
    return new Promise((resolve, reject) =>  {
        axios.get(`${solr_diseases}/select?fl=id&fq=mappings%3A${mapping}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch(err => reject(err))        
    })
}
export function getMeshByLevel(level){
    return new Promise((resolve, reject) =>  {
        axios.get(`${solr_diseases}/select?fl=id&fq=level_i%3A${level}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch(err => reject(err))        
    })
}


//Paragraphs
//select?fq=id%3Aa09bd936a49641c1243bd5290b00c211&q=*
export function getParagraphInfo(id){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_paragraphs}/select?fq=id%3A${id}&q=*`).then((response) => {
            resolve(response.data.response.docs[0])
        }).catch((err) => reject(err))
    })
}

export function getParagraphIdByKeyword(keyword){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_paragraphs}/select?fl=id&fq=text_t%3A${keyword}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch((err) => reject(err))
    })}

//What means N1, N2,..., N20??
export function getParagraphIdByDiseaseName(diseaseName){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_paragraphs}/select?fl=id&fq=bionlp_diseases_N1%3A${diseaseName}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch((err) => reject(err))
})}
export function getParagraphIdByMesh(mesh){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_paragraphs}/select?fl=id&fq=bionlp_diseases_C8%3A${mesh}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch((err) => reject(err))
})} 
//N goes from 1 to 5
export function getParagraphIdByActiveIngredient(activeIngredient){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_paragraphs}/select?fl=id&fq=bionlp_drugs_N5%3A${activeIngredient}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch((err) => reject(err))
})}
export function getParagraphIdByAtcCode(atcCode){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_paragraphs}/select?fl=id&fq=bionlp_drugs_C5%3A${atcCode}&q=*`).then((response) => {
            resolve(response.data.response.docs)
        }).catch((err) => reject(err))
})}    
//Artciles
//No existe Article para este Paragraph: 0977b186510f6683611c39c89dd379b3
export function getArticleInfo(id){
    return new Promise((resolve, reject) => {
        axios.get(`${solr_articles}/select?fl=id%2Cname_s%2Curl_s&fq=id%3A${id}&q=*`).then((response) => {
            resolve(response.data.response.docs[0])
        }).catch((err) => reject(err))
    });
}

//CIMA

export function getMedicinesInfo(data){
    return new Promise((resolve, reject) => {
        axios.get(`https://cima.aemps.es/cima/rest/medicamentos?atc=${data}`).then((response) => {
            resolve(response.data.resultados)
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