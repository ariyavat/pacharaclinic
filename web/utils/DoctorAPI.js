import axios from 'axios';
import * as config from '../config';

export function getDoctorTime() {
  //return axios.get(`${config.init.url}doctortimes`); 
  return axios.get(`${config.init.web_url}API/doctor/read.php`); 
}

export function getDoctorTimes(dat) {
  //return axios.get(`${config.init.url}doctortimes`); 
  return axios.get(`${config.init.web_url}API/doctor/reads.php?dat=${dat}`); 
}


export function getSeedoctors(dat) {
  //return axios.get(`${config.init.url}seedoctor/${uid}`);
  return axios.get(`${config.init.web_url}API/seedoctor/read.php?dat=${dat}`); 
}


export function getSeedoctor(uid) {
  //return axios.get(`${config.init.url}seedoctor/${uid}`);
  return axios.get(`${config.init.web_url}API/doctor/read_one.php?uid=${uid}`); 
}

export function getSeedoc(uid,id) {
  //return axios.get(`${config.init.url}seedoc/${uid}/${id}`);
  return axios.get(`${config.init.web_url}API/seedoctor/customer_read.php?uid=${uid}&id=${id}`);
}

export function createSeedoctor(data) {
  //return axios.post(`${config.init.url}createSeedoctor`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}API/seedoctor/create.php`, JSON.stringify(data));
}

export function updateSeedoctor(data) {
  //return axios.post(`${config.init.url}updateSeedoctor`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}API/seedoctor/update.php`, JSON.stringify(data));
}


