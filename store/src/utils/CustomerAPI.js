import axios from 'axios';
import * as config from '../config';

export function getCustomer(id) {
  return axios.get(`${config.init.url}customer/${id}`);
}

export function getCustomers(mode) {
  return axios.get(`${config.init.url}customers/${mode}`);
}

export function getCustomerDOB(mn) {
  return axios.get(`${config.init.url}customerDOB/${mn}`);
}

export function serchCustomers(mode, page, perpage, txt) {
  let searchText = txt;
  if (txt === '') {
    searchText = '-';
  }
  return axios.get(`${config.init.url}serch_customers/${mode}/${page}/${perpage}/${searchText}`);
}

export function createCustomer(data) {
  return axios.post(`${config.init.url}createCustomer`, JSON.stringify(data));
}

export function updateCustomer(data) {
  return axios.post(`${config.init.url}updateCustomer`, JSON.stringify(data));
}

export function deleteCustomer(data) {
  return axios.post(`${config.init.url}deleteCustomer`, JSON.stringify(data));
}
