import axios from 'axios';
import * as config from '../config';


export function getMsProduct() {    
    return axios.get(`${config.init.ms_url}productLists`); 
}

export function getProduct(id) {  
    return axios.get(`${config.init.url}product/${id}`); 
}

export function getProducts(mode,status) {
    return axios.get(`${config.init.url}products/${mode}/${status}`);
 
}

export function serchProducts(typ,status, page, perpage, txt) { 
  let searchText = txt;
  if (txt === '') {
    searchText = '-';
  }
  return axios.get(`${config.init.url}serch_roducts/${typ}/${status}/${page}/${perpage}/${searchText}`);
}

export function createProduct(data) {
  return axios.post(`${config.init.url}createProduct`, JSON.stringify(data));
}

export function updateProduct(data) {
  return axios.post(`${config.init.url}updateProduct`, JSON.stringify(data));
}

export function deleteProduct(data) {
  return axios.post(`${config.init.url}deleteProduct`, JSON.stringify(data));
}



export function getProductSet(id) {  
    return axios.get(`${config.init.url}productSet/${id}`); 
}

export function getProductSets() {
    return axios.get(`${config.init.url}productSets`);
 
}

export function serchProductSets(page, perpage, txt) { 
  let searchText = txt;
  if (txt === '') {
    searchText = '-';
  }
  return axios.get(`${config.init.url}serch_roductSets/${page}/${perpage}/${searchText}`);
}

export function createProductSet(data) {
  return axios.post(`${config.init.url}createProductSet`, JSON.stringify(data));
}

export function updateProductSet(data) {
  return axios.post(`${config.init.url}updateProductSet`, JSON.stringify(data));
}

export function deleteProductSet(data) {
  return axios.post(`${config.init.url}deleteProductSet`, JSON.stringify(data));
}

export function getProductSetList(id) {  
    return axios.get(`${config.init.url}productSetList/${id}`); 
}

