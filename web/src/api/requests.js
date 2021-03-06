import axios from 'axios'
const bio_api = 'https://librairy.linkeddata.es/bio-api'
const solr = 'https://librairy.linkeddata.es/solr'
const solr_atc = `${solr}/atc`
const solr_diseases = `${solr}/diseases`
const solr_paragraphs = `${solr}/covid-paragraphs`
const solr_articles = `${solr}/covid`
const bio_api_drugs = `${bio_api}/drugs`
const bio_api_diseases = `${bio_api}/diseases`
const bio_api_articles = `${bio_api}/texts`
const bio_api_replacements = `${bio_api}/replacements`

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    s = s.toLocaleLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)
    } 

// export function findDrugs(data){
//     return new Promise((resolve, reject) => {
//         const options = {
//             header:{
//                 'Content-Type': 'application/json'
//             }
//         }
//         axios.post(`${API}/drugs`, {text:data}, options).then((response) => {
//             resolve(response.data)
//         }).catch(err => reject(err));
//     });
// }
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
            resolve(response.data.response.docs[0])
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
    console.log(`${solr_articles}/select?fl=id%2Cname_s%2Curl_s&fq=id%3A${id}&q=*`)
    return new Promise((resolve, reject) => {
        axios.get(`${solr_articles}/select?fl=id%2Cname_s%2Curl_s&fq=id%3A${id}&q=*`).then((response) => {
            if(Object.keys(response.data).includes('response') && 
            Object.keys(response.data.response).includes('docs') && 
            response.data.response.docs !== undefined && 
            response.data.response.docs.length > 0
            ){
                resolve(response.data.response.docs[0])
            }else{
                resolve(null)
            }
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

// AUTOCOMPLETE

export function fieldAutoComplete(field,type, value, search, title){
    return new Promise((resolve, reject) => {
        let results = []
        console.log(`${field}/select?fl=id%2C%20${type}&fq=${type}%3A${value}*&q=*&rows=10`)
        axios.get(`${field}/select?fl=id%2C%20${type}&fq=${type}%3A${value}*&q=*&rows=10`).then(async (response) =>{
            await response.data.response.docs.map((result) => {
                    if(Array.isArray(result[type])){
                        console.log(result[type])
                        const arrayValues = result[type].filter(el =>
                            el.toLowerCase().slice(0, value.length) === value.toLowerCase()
                          )
                        arrayValues.map((el) => {
                            results.push({type:type,field:field, id:result.id, value:el,search:search, title:title })
                        })
                    }else{
                        results.push({type:type,field:field, id:result.id, value:result[type],search:search, title:title })
                    }
            })
            resolve(results)
        }).catch((err) => reject(err))
    })
}
export function autocomplete(value){
    let result = []
    //{search:'disease',title:'Mapping',type:'mappings', value:value}
    //{search:'disease',title:'Disease Synonym',type:'synonyms', value:value}
    const fields = [
        {
            field:solr_atc,
            types:[{title:'ATC',search:'drug',type:'id', value:value.toUpperCase()}, {search:'drug',title:'Generic Name',type:'label_t', value:value}]
        },
        {
            field:solr_diseases,
            types:[{search:'disease',title:'MESH',type:'id', value:value.toUpperCase()},{search:'disease',title:'Disease',type:'name_t', value:value} ]
        }
    ]
    fields.map((field) => {
        field.types.map((type) => {
            result.push(fieldAutoComplete(field.field, type.type, type.value, type.search, type.title))
        })
    })
    return Promise.all(result)
}

export function getRelatedDrugs(data){
    const options = {
        params:{
            keywords:data.keywords,
    
            size:10
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(`${bio_api_drugs}?keywords=${data.keywords}`).then((response) => {
            resolve(response.data)
        }).catch(err => reject(err));
    });
}

export function getRelatedDiseases(data){
    const options = {
        params:{
            keywords:data.keywords,
            size:10
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(`${bio_api_diseases}?keywords=${data.keywords}`).then((response) => {
            resolve(response.data)
        }).catch(err => reject(err));
    });
}
export function getRelatedArticles(data){
    const options = {
        params:{
            keywords:data.keywords,
            size:10
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(`${bio_api_articles}?keywords=${data.keywords}`).then((response) => {
            resolve(response.data)
        }).catch(err => reject(err));
    });
}

export function getDrugsReplacements(data){
    console.log(`${bio_api_replacements}?keywords=${data.keywords}`)
    return new Promise((resolve, reject) => {
        axios.get(`${bio_api_replacements}?size=5&keywords=${data.keywords}`).then((response) => {
            resolve(response.data)
        }).catch(err => reject(err));
    });
}