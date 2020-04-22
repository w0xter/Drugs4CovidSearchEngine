import {getSpanishTradeNameMedicineInfo,findSpanishTradeNameMedicine,getMedicinesInfo, getInfoByAtc, getParagraphIdByActiveIngredient, getParagraphInfo, getParagraphIdByAtcCode, getArticleInfo} from './requests'


export function getAtcInfo(atc){
    return new Promise(async (resolve, reject) => {
        try{
        const data = await getInfoByAtc(atc)
        let result = await {tradeMedicines:[], relatedArticles:[], ...data}
        result.tradeMedicines = await  getMedicinesInfo(result.id)
        const actvIngrParagraphs = await getParagraphIdByActiveIngredient(result.label_t)
        const AtcParagraphs = await getParagraphIdByAtcCode(result.id)
        const allArticles= [...AtcParagraphs, ...actvIngrParagraphs]
        result.relatedArticles =  await getRelatedArticles(allArticles)
        resolve(result)
    }catch(err){
        reject(err)
        console.error(err)
    }
    })    
}
const getRelatedArticles = async (list) => {
    return new Promise(async (resolve) => {
        let result = []
        let uniques = []
        await list.map(async(item) => {
        if(!uniques.includes(item.id)){
            uniques.push(item.id)
            const paragraphInfo = await getParagraphInfo(item.id).catch((err) => console.log(err))
            const articleInfo = await getArticleInfo(paragraphInfo.article_id_s).catch(err => console.log(err))
            result.push({paragraph:paragraphInfo, article:articleInfo !== undefined ? articleInfo:null}) 
        }
         resolve(result)
    })
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
