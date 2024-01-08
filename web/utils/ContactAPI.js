import axios from 'axios';
import * as config from '../config';

export function getContacts() {
  return axios.get(`${config.init.web_url}API/contact/read.php`); 
}

export function getAbouts() {
  return axios.get(`${config.init.web_url}API/about/read.php`); 
}

export function getLocations() {
  return axios.get(`${config.init.ms_url}locations`); 
}