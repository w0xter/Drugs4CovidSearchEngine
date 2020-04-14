import axios from 'axios'
const API = 'https://librairy.linkeddata.es/bio-nlp'
export function findDrugs(data){
    return new Promise((resolve, reject) => {
        const options = {
            header:{
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${API}/drugs`, data, options).then((response) => {
            resolve(response.data)
        }).catch(err => reject(err));
    });
}
