import axios from 'axios';
import * as config from '../config';


/*
export function getVdos(mode,typ) {
  return axios.get(`${config.init.url}vdos/${mode}/${typ}`); 
}

export function createVdo(data) {
  return axios.post(`${config.init.url}createVdo`, JSON.stringify(data));
}


export function deleteVdo(data) {
  return axios.post(`${config.init.url}deleteVdo`, JSON.stringify(data));
}

*/

export function getVdos(mode,typ) {
  return axios.get(`${config.init.web_url}vdo/read.php?mode=${mode}&typ=${typ}`);
}


export function createVdo(data) {
  return axios.post(`${config.init.web_url}vdo/create.php`, JSON.stringify(data));
}


export function deleteVdo(data) {
 // return axios.post(`${config.init.web_url}deleteVdo`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}vdo/delete.php`, JSON.stringify(data));
}