import axios from 'axios';
import * as config from '../config';

export function sliders() {
  //return axios.get(`${config.init.url}sliders`); 
  return axios.get(`${config.init.web_url}slide/read.php`);
}

export function createSlider(data) {
  //return axios.post(`${config.init.url}createSlider`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}slide/create.php`, JSON.stringify(data));
}

export function deleteSlider(data) {
  //return axios.post(`${config.init.url}deleteSlider`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}slide/delete.php`, JSON.stringify(data));
}
