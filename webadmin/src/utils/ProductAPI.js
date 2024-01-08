import axios from 'axios';
import * as config from '../config';


export function getMsProduct() {    
    return axios.get(`${config.init.ms_url}productLists`); 
}

export function getMsService(mode) {    
    return axios.get(`${config.init.ms_url}serviceLists/${mode}`);     
}



export function getProduct(typ,id) { 
    ///return axios.get(`${config.init.url}product/${id}/${typ}`); 
    return axios.get(`${config.init.web_url}product/read_one.php?id=${id}&typ=${typ}`);
}

export function getProducts(typ,status) {
  //return axios.get(`${config.init.url}products/${typ}/${status}`); 
  return axios.get(`${config.init.web_url}product/read.php?typ=${typ}&status=${status}`);
}


export function createProduct(data) {
  //return axios.post(`${config.init.url}createProduct`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}product/create.php`, JSON.stringify(data));
}

export function updateProduct(data) {
  //return axios.post(`${config.init.url}updateProduct`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}product/update.php`, JSON.stringify(data));
}

export function deleteProduct(data) {
  //return axios.post(`${config.init.url}deleteProduct`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}product/delete.php`, JSON.stringify(data));
}


