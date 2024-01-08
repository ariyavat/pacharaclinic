import axios from 'axios';
import * as config from '../config';

export function getPromotion(id) {    
    //return axios.get(`${config.init.url}promotion/${id}`); 
    return axios.get(`${config.init.web_url}promotion/read_one.php?id=${id}`);
}

export function getPromotions(mode,sdat,edat) {
  //return axios.get(`${config.init.url}promotions/${mode}/${sdat}/${edat}`); 
  return axios.get(`${config.init.web_url}promotion/read.php?mode=${mode}&sdat=${sdat}&edat=${edat}`);
}

export function createPromotion(data) {
  //return axios.post(`${config.init.url}createPromotion`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}promotion/create.php`, JSON.stringify(data));
}

export function updatePromotion(data) {
  //return axios.post(`${config.init.url}updatePromotion`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}promotion/update.php`, JSON.stringify(data));
}

export function deletePromotion(data) {
  //return axios.post(`${config.init.url}deletePromotion`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}promotion/delete.php`, JSON.stringify(data));
}
