import axios from 'axios';
import * as config from '../config';

export function getCustomer(id) {
  //return axios.get(`${config.init.url}customer/${id}`);
  return axios.get(`${config.init.web_url}customer/read_one.php?uid=${id}`);
}

export function getCustomerMemPay(id) {
  //return axios.get(`${config.init.url}customerMemPay`);
  return axios.get(`${config.init.web_url}customer/payment.php`);

}

export function updateCustomer(data) {
  //return axios.post(`${config.init.url}updateCustomer`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}customer/update.php`, JSON.stringify(data));
}

export function createCustomerMS(data) {
  return axios.post(`${config.init.ms_url}createCustomer`, JSON.stringify(data));
}


