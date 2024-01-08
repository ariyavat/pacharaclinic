
import axios from 'axios';
import * as config from '../config';

export function getFlash(typ,id) { 
    return axios.get(`${config.init.url}flashsale/${id}/${typ}`); 
}

export function getFlashs(mode,dat) {
  return axios.get(`${config.init.url}flashsales/${mode}/${dat}`); 
}

export function createFlash(data) {
  return axios.post(`${config.init.url}createFlashsale`, JSON.stringify(data));
}

export function updateFlash(data) {
  return axios.post(`${config.init.url}updateFlashsale`, JSON.stringify(data));
}

export function deleteFlash(data) {
  return axios.post(`${config.init.url}deleteFlashsale`, JSON.stringify(data));
}


