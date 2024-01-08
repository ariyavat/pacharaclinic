import axios from 'axios';
import * as config from '../config';

export function getFlashs() {
  return axios.get(`${config.init.url}flashsales/WEB/-`); 
}

export function getFlash(typ,id) {
  return axios.get(`${config.init.url}flashsale/${typ}/${id}`); 
}
