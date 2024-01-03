import axios from 'axios';
import * as config from '../config';

/** * Temp list ***/
export function getTempOrders(cid) {
  return axios.get(`${config.init.url}tempOrders/${cid}`);
}

export function createTempOrder(data) {
  return axios.post(`${config.init.url}createTempOrder`, JSON.stringify(data));
}

export function updateTempOrder(data) {
  return axios.post(`${config.init.url}updateTempOrder`, JSON.stringify(data));
}

export function deleteTempOrder(data) {
  return axios.post(`${config.init.url}deleteTempOrder`, JSON.stringify(data));
}

export function deleteTempOrders(data) {
  return axios.post(`${config.init.url}deleteTempOrders`, JSON.stringify(data));
}

/** * Order ****/
export function getLastPrice(cid,pid) {
  return axios.get(`${config.init.url}orderLastPrice/${cid}/${pid}`);
}


export function getOrder(ino) {
  return axios.get(`${config.init.url}order/${ino}`);
}

export function getOrderVN(vn,customer_id) {
  return axios.get(`${config.init.url}orderVN/${vn}/${customer_id}`);
}


export function getOrderDetail(ino) {
  return axios.get(`${config.init.url}orderDetail/${ino}`);
}

export function getOrders(mode,id,status,sdat, edat,page,perpage,txt) {
    let searchText = txt;
  if (txt === '') {
    searchText = '-';
  }
  let cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  if(mode ==='debit' || mode==='cdebit' || mode==='sumpsale' || mode==='sumpaydg' || mode==='sumyear' || mode==='sumpercustomer' || mode==='sumorderdg'){ cn = id; }


  return axios.get(`${config.init.url}orders/${mode}/${cn}/${status}/${sdat}/${edat}/${page}/${perpage}/${searchText}`);
}

export function createOrder(data) {
  return axios.post(`${config.init.url}createOrder`, JSON.stringify(data));
}

export function updateOrder(data) {
  return axios.post(`${config.init.url}updateOrder`, JSON.stringify(data));
}

export function createOrderList(data) {
  return axios.post(`${config.init.url}createOrderList`, JSON.stringify(data));
}

export function updateOrderList(data) {
  return axios.post(`${config.init.url}updateOrderList`, JSON.stringify(data));
}

export function deleteOrderList(data) {
  return axios.post(`${config.init.url}deleteOrderList`, JSON.stringify(data));
}



//COM SALE
export function getComsales(eid,sdat,edat) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}comSales/${eid}/${cn}/${sdat}/${edat}`);
}

export function createComsale(data) {
  return axios.post(`${config.init.url}createComsale`, JSON.stringify(data));
}

export function deleteComsale(data) {
  return axios.post(`${config.init.url}deleteComsale`, JSON.stringify(data));
}