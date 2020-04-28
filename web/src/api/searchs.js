import {getSpanishTradeNameMedicineInfo,
        findSpanishTradeNameMedicine,
        getMedicinesInfo,
        getInfoByAtc,
        getDiseaseInfo,
        getRelatedArticles,
        getRelatedDiseases,
        getRelatedDrugs,
        getDrugsReplacements
    } from './requests'

export function getMeshInfo(mesh){
    return new Promise(async (resolve, reject) => {
        try{
            const id = mesh.toUpperCase()
            const data = await getDiseaseInfo(id).catch(err => resolve())
            const options = {keywords:`'${data.name_t.toLowerCase()}'`}
            let result = await {tradeMedicines:[],relatedDrugs:[], relatedArticles:[],relatedDiseases:[], ...data}
            let relatedArticles = await getRelatedArticles(options).catch((err) => [])
            if(relatedArticles.length === 0)
                relatedArticles = await getRelatedArticles({keywords:id}).catch((err) => [])
            result.relatedArticles = relatedArticles
            let relatedDiseases = await getRelatedDiseases(options).catch((err) => [])
            if(relatedDiseases.length === 0)
                relatedDiseases = await getRelatedDiseases({keywords:id}).catch((err) => [])
            result.relatedDiseases = relatedDiseases
            let relatedDrugs  = await getRelatedDrugs(options).catch((err) => [])
            if(relatedDrugs.length === 0)
                relatedDrugs = await getRelatedDrugs({keywords:id}).catch((err) => [])
            result.relatedDrugs = relatedDrugs
            resolve(result)
        }catch(err){
            console.log(err)
        }
    })
}
export function getAtcInfo(atc){
    return new Promise(async (resolve, reject) => {
        try{
        const id  = atc.toUpperCase()
        const data = await getInfoByAtc(id).catch(err => resolve())
        const options = {keywords:`'${data.label_t.toLowerCase()}'`}
        let result = await {tradeMedicines:[],relatedDrugs:[], relatedArticles:[],relatedDiseases:[],replacementDrugs:[], ...data}
        result.tradeMedicines = await  getMedicinesInfo(result.id).catch((err) => [])
        let replacementDrugs = await getDrugsReplacements(options).catch((err) => [])
        if(replacementDrugs.length === 0)
            replacementDrugs = await getDrugsReplacements({keywords:id}).catch((err) => [])
        result.replacementDrugs = replacementDrugs
        let relatedArticles = await getRelatedArticles(options).catch((err) => [])
        if(relatedArticles.length === 0)
            relatedArticles = await getRelatedArticles({keywords:id}).catch((err) => [])
        result.relatedArticles = relatedArticles
        let relatedDiseases = await getRelatedDiseases(options).catch((err) => [])
        if(relatedDiseases.length === 0)
            relatedDiseases = await getRelatedDiseases({keywords:id}).catch((err) => [])
        result.relatedDiseases = relatedDiseases
        let relatedDrugs  = await getRelatedDrugs(options).catch((err) => [])
        if(relatedDrugs.length === 0)
            relatedDrugs = await getRelatedDrugs({keywords:id}).catch((err) => [])
        result.relatedDrugs = relatedDrugs
        resolve(result)
    }catch(err){
        console.error(err)
    }
    })    
}

export function searchByAtc(atc){
    return new Promise((resolve, reject) => {
        let result = {}
        getAtcInfo(atc).then((data) => {
            resolve([data])
        }).catch(err => reject(err))
    })
}
export function searchByMesh(atc){
    return new Promise((resolve, reject) => {
        let result = {}
        getMeshInfo(atc).then((data) => {
            resolve([data])
        }).catch(err => reject(err))
    })
}
export function getSpanishMedicineATC(name){
    return new Promise((resolve, reject) => {
        let results = []
        let medicines = []
        let nregistro = []
    findSpanishTradeNameMedicine(name)
    .then((data) => {
        data.resultados.map(medicine => {
            medicines.push(getSpanishTradeNameMedicineInfo(medicine.nregistro))
        })
        return Promise.all(medicines)
        }).then((data) => {
            console.log(data)
            data.map((medicine) => {
                medicine.atcs.map((atc) => {
                    if( atc.nivel === 5 && !results.includes(atc.codigo)){
                        results.push(atc.codigo)
                    }
                })
            })
        return Promise.resolve(results)
        }).then((data) => resolve(data))
        .catch(err => reject(err))
    });
}
// export function searchByActiveIngredient(text){
//     return new Promise((resolve, reject) => {
//         let results = []
//         findDrugs(text).then((data) => {
//             data.map((drug, idx) =>{
//                 results.push(getATCInfo(drug.atc_code))
//             });
//             return Promise.all(results)
//         }).then(data => resolve(data))
//         .catch(err => {
//             console.log('Falla FindDrugs!')
//             reject(err)
//         })
//     });
// }
// export function searchBySpanishTradeName(text){
//     return new Promise((resolve, reject) => {
//         let results = []
//         getSpanishMedicineATC(text)
//         .then((data) => {
//             console.log(data)
//             data.map((atc) => {
//                 console.log("HOLA")
//                 results.push(getATCInfo(atc))
//             })
//             return Promise.all(results)
//         }).then(data => {console.log(data);resolve(data)})
//         .catch(err => reject(err))
//     });
// }
