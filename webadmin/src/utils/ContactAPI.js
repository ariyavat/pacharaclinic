import axios from 'axios';
import * as config from '../config';



export function getContacts() {
  //return axios.get(`${config.init.url}contacts`); 
  return axios.get(`${config.init.web_url}contact/read.php`);
}

export function createContact(data) {
  //return axios.post(`${config.init.url}createContact`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}contact/create.php`, JSON.stringify(data));
}

export function updateContact(data) {
  //return axios.post(`${config.init.url}updateContact`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}contact/update.php`, JSON.stringify(data));
}

export function deleteContact(data) {
  //return axios.post(`${config.init.url}deleteContact`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}contact/delete.php`, JSON.stringify(data));
}
