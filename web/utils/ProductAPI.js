import axios from 'axios';
import * as config from '../config';

export function getPgroups(mode) {
  return axios.get(`${config.init.web_url}API/pgroup/read.php?mode=${mode}`);
}


export function getProduct(typ,id) {
  return axios.get(`${config.init.web_url}API/product/read_one.php?id=${id}&typ=${typ}`);
}

export function getProducts(typ,status) {
  return axios.get(`${config.init.web_url}API/product/read.php?typ=${typ}&status=${status}`);
}

export function getProductWebs(typ,mode) {
  return axios.get(`${config.init.web_url}API/product/read_web.php?typ=${typ}&mode=${mode}`);
}