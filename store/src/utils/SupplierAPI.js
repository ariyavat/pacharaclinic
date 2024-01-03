import axios from 'axios';
import * as config from '../config';

export function getSuplier(id) {
  return axios.get(`${config.init.url}supplier/${id}`);
}

export function getSupliers(mode) {
  return axios.get(`${config.init.url}suppliers/${mode}`);
}

export function serchSupliers(mode, page, perpage, txt) {
  let searchText = txt;
  if (txt === '') {
    searchText = '-';
  }
  return axios.get(`${config.init.url}serch_suppliers/${mode}/${page}/${perpage}/${searchText}`);
}

export function createSuplier(data) {
  return axios.post(`${config.init.url}createSupplier`, JSON.stringify(data));
}

export function updateSuplier(data) {
  return axios.post(`${config.init.url}updateSupplier`, JSON.stringify(data));
}

export function deleteSuplier(data) {
  return axios.post(`${config.init.url}deleteSupplier`, JSON.stringify(data));
}
