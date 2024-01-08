import axios from 'axios';
import * as config from '../config';

export function mDetailCustomer(data) {
  return axios.post(`${config.init.ms_url}custmerDetail`, JSON.stringify(data));
}

export function mCodeCustomer(data) {
  return axios.post(`${config.init.ms_url}custmerMcode`, JSON.stringify(data));
}

export function getMsCustomer(id) {
  return axios.get(`${config.init.ms_url}customer/${id}`);
}

export function getMsPctrecs(customer_id,status) {
  return axios.get(`${config.init.ms_url}pctrecs/${customer_id}/${status}`);
}


/*
export function getCustomer(uid) {
  return axios.get(`${config.init.url}customer/${uid}`);
}
export function createCustomer(data) {
  return axios.post(`${config.init.url}createCustomer`, JSON.stringify(data));
}
export function updateCustomer(data) {
  return axios.post(`${config.init.url}updateCustomer`, JSON.stringify(data));
}
*/
//p7
export function chkCustomer(data) {
  return axios.post(`${config.init.web_url}API/customer/check_user.php`, JSON.stringify(data));
}


export function login(data) {
  return axios.post(`${config.init.web_url}API/customer/login.php`, JSON.stringify(data));
}

export function forgot(email) {
  return axios.get(`${config.init.web_url}API/customer/forgot.php?email=${email}`);
}

export function getCustomer(uid) {
  return axios.get(`${config.init.web_url}API/customer/read_one.php?uid=${uid}`);
}
export function getCustomers() {
  return axios.get(`${config.init.web_url}API/customer/read.php`);
}
export function createCustomer(data) {
  return axios.post(`${config.init.web_url}API/customer/create.php`, JSON.stringify(data));
}
export function updateCustomer(data) {
  return axios.post(`${config.init.web_url}API/customer/update.php`, JSON.stringify(data));
}
export function deleteCustomer(data) {
  return axios.post(`${config.init.web_url}API/customer/delete.php`, JSON.stringify(data));
}






