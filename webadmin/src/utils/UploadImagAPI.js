import axios from 'axios';
import * as config from '../config';

export function uploadimage(data) {
  //return axios.post(`${config.init.url}UploadImages`, JSON.stringify(data));

  return axios.post(`${config.init.web_url}upload/upload_image.php`, JSON.stringify(data));
}

export function deleteimage(data) {
  //return axios.post(`${config.init.url}DeleteImages`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}upload/delete_image.php`, JSON.stringify(data));
}
