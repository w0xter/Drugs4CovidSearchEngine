import {getSpanishTradeNameMedicineInfo,findSpanishTradeNameMedicine,getMedicinesInfo, getInfoByAtc, getParagraphIdByActiveIngredient, getParagraphInfo, getParagraphIdByAtcCode, relatedArticles, relatedDiseases, getArticleInfo,relatedDrugs} from './requests'


export function getAtcInfo(atc){
    return new Promise(async (resolve, reject) => {
        try{
        const id  = atc.toUpperCase()
        const data = await getInfoByAtc(id)
        const options = {keywords:`${data.label_t},${id}`}
        let result = await {tradeMedicines:[],relatedDrugs:[], relatedArticles:[],relatedDiseases:[], ...data}
        result.tradeMedicines = await  getMedicinesInfo(result.id)
        //const paragraphs = []//await relatedArticles(options)
        const actvIngrParagraphs = await getParagraphIdByActiveIngredient(result.label_t)
        const AtcParagraphs = await getParagraphIdByAtcCode(result.id)
        const paragraphsId= [...AtcParagraphs, ...actvIngrParagraphs]
        const paragraphs =  await getRelatedParagraphs(paragraphsId)
        const diseases = await relatedDiseases(options)
        result.relatedDiseases = diseases
        const drugs = await relatedDrugs(options)
        result.relatedDrugs = drugs 
        console.log(drugs)
        const articles = await getRelatedArticles(paragraphs).catch((err) =>  console.log(err))
        console.log(articles)
        await paragraphs.map(async (p, idx) => {
            let article = articles[idx]
            result.relatedArticles.push({paragraph:p, article:article})
        })
        resolve(result)
    }catch(err){
        reject(err)
        console.error(err)
    }
    })    
}
const getRelatedArticles = (list) => {
    let result = []
    list.map((item) => {
            result.push(getArticleInfo(item.article_id_s))
    })
    return Promise.all(result)
}
const getRelatedParagraphs = (list) => {
    let result = []
    let uniques = []
    list.map((item) => {
        if(!uniques.includes(item.id)){
            uniques.push(item.id)
            result.push(getParagraphInfo(item.id))
        }
    })
    return Promise.all(result)
}
export function searchByAtc(atc){
    return new Promise((resolve, reject) => {
        let result = {}
        getAtcInfo(atc).then((data) => {
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
