import axios from 'axios';
import * as config from '../config';



export function getAbouts() {
  //return axios.get(`${config.init.url}contacts`); 
  return axios.get(`${config.init.web_url}about/read.php`);
}

export function createAbout(data) {
  //return axios.post(`${config.init.url}createContact`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}about/create.php`, JSON.stringify(data));
}

export function updateAbout(data) {
  //return axios.post(`${config.init.url}updateContact`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}about/update.php`, JSON.stringify(data));
}

export function deleteAbout(data) {
  //return axios.post(`${config.init.url}deleteContact`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}about/delete.php`, JSON.stringify(data));
}
