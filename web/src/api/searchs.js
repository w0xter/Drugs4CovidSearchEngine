import {getSpanishTradeNameMedicineInfo,findSpanishTradeNameMedicine,findDrugs, getMedicinesInfo, getRelatedArticles, getRelatedDiseases, getRelatedDrugs} from './requests'

export function getATCInfo(atc){
    console.log(atc)
    return new Promise((resolve, reject) => {
    let result  = {name:atc,articles:[], tradeMedicines:[], diseases:[], activeIngredients:[]};
    getRelatedArticles(atc).then((data) => {
        result.articles = data
        return getRelatedDiseases(atc)
    }).then((data) => {
        result.diseases = data
        return getRelatedDrugs(atc)
    }).then((data) => {
        result.activeIngredients = data;
        return getMedicinesInfo(atc)
    }).then((data) => {
        result.tradeMedicines = data.resultados;
        return Promise.resolve(result)
    }).then((data) => {
        resolve(data)
    }).catch((err) => {console.log("Falla GET ATC");reject(err)})
})
}
export function searchByAtc(atc){
    return new Promise((resolve, reject) => {
        getATCInfo(atc)
        .then(data => {
            if(data.articles.length === 0 &&
                data.tradeMedicines.length === 0 &&
                Object.keys(data.diseases).length === 0 &&
                Object.keys(data.activeIngredients).length === 0
            ){
                resolve([])
            }else{
                resolve([data])

            }

        })
        .catch(err => reject(err))
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
export function searchByActiveIngredient(text){
    return new Promise((resolve, reject) => {
        let results = []
        findDrugs(text).then((data) => {
            data.map((drug, idx) =>{
                results.push(getATCInfo(drug.atc_code))
            });
            return Promise.all(results)
        }).then(data => resolve(data))
        .catch(err => {
            console.log('Falla FindDrugs!')
            reject(err)
        })
    });
}
export function searchBySpanishTradeName(text){
    return new Promise((resolve, reject) => {
        let results = []
        getSpanishMedicineATC(text)
        .then((data) => {
            console.log(data)
            data.map((atc) => {
                console.log("HOLA")
                results.push(getATCInfo(atc))
            })
            return Promise.all(results)
        }).then(data => {console.log(data);resolve(data)})
        .catch(err => reject(err))
    });
}
