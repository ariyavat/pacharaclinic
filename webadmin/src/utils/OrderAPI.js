
import axios from 'axios';
import * as config from '../config';

export function getOrders(mode,status) { 
    //return axios.get(`${config.init.url}orders/${mode}/${status}`); 
    return axios.get(`${config.init.web_url}order/read.php?mode=${mode}&uid=${status}`);
}

export function updateOrder(data) {
  //return axios.post(`${config.init.url}updateOrder`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}order/update.php`, JSON.stringify(data));
}


/** MS **/

export function createVisit(data) {
  return axios.post(`${config.init.ms_url}createVisit`, JSON.stringify(data));
}

export function createOrder(data) {
  return axios.post(`${config.init.ms_url}createOrder`, JSON.stringify(data));
}


export function createOrderList(data) {
  return axios.post(`${config.init.ms_url}createOrderList`, JSON.stringify(data));
}

export function createPctrec(data) {
  return axios.post(`${config.init.ms_url}createPctrec`, JSON.stringify(data));
}

export function createPctlist(data) {
  return axios.post(`${config.init.ms_url}createPctlist`, JSON.stringify(data));
}

export function getService(id) {
  return axios.get(`${config.init.ms_url}service/${id}`);
}

export function getServiceList(id,typ) {
  return axios.get(`${config.init.ms_url}serviceList/${id}/${typ}`);
}
