import axios from 'axios';
import * as config from '../config';

export function getOrders(mode,uid) {
  return axios.get(`${config.init.web_url}API/order/read.php?mode=${mode}&uid=${uid}`);
}


export function createOrder(data) {
  return axios.post(`${config.init.web_url}API/order/create.php`, JSON.stringify(data));
}


export function updateOrder(data) {
  return axios.post(`${config.init.web_url}API/order/update.php`, JSON.stringify(data));
}


export function uploadImgimage(data) {
  return axios.post(`${config.init.web_url}API/upload/upload_image.php`, JSON.stringify(data));
}

export function deleteimage(data) {
  return axios.post(`${config.init.web_url}API/upload/delete_image.php`, JSON.stringify(data));
}


/*
export function deleteCustomer(data) {
  return axios.post(`${config.init.url}deleteCustomer`, JSON.stringify(data));
}
*/
