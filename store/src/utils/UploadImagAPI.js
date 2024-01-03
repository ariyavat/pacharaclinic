import axios from 'axios';
import * as config from '../config';

export function uploadimage(data) {
  return axios.post(`${config.init.url}UploadImages`, JSON.stringify(data));
}

export function deleteimage(data) {
  return axios.post(`${config.init.url}DeleteImages`, JSON.stringify(data));
}
