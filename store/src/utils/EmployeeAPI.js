import axios from 'axios';
import * as config from '../config';

export function getEmployee(id) {
  return axios.get(`${config.init.url}employee/${id}`);
}

export function getEmployees(typ,status) {
  return axios.get(`${config.init.url}employees/${typ}/${status}`);
}

export function serchEmployees(typ,status, page, perpage, txt) {  
  let searchText = txt;
  if (txt === '') { searchText = '-'; }
  return axios.get(`${config.init.url}serch_employees/${typ}/${status}/${page}/${perpage}/${searchText}`);
}

export function createEmployee(data) {
  return axios.post(`${config.init.url}createEmployee`, JSON.stringify(data));
}

export function updateEmployee(data) {
  return axios.post(`${config.init.url}updateEmployee`, JSON.stringify(data));
}

export function deleteEmployee(data) {
  return axios.post(`${config.init.url}deleteEmployee`, JSON.stringify(data));
}

export function getEmployeeLocationID(emp_id) {
  return axios.get(`${config.init.url}employeelocationID/${emp_id}`);
}

export function getEmployeeLocation(cn) {
  return axios.get(`${config.init.url}employeelocation/${cn}`);
}

export function createEmployeeLocation(data) {
  return axios.post(`${config.init.url}createEmployeeLocation`, JSON.stringify(data));
}

export function updateEmployeeLocation(data) {
  return axios.post(`${config.init.url}updateEmployeeLocation`, JSON.stringify(data));
}

export function deleteEmployeeLocation(data) {
  return axios.post(`${config.init.url}deleteEmployeeLocation`, JSON.stringify(data));
}


export function getEmpImgs(eid) {
  return axios.get(`${config.init.url}empImgs/${eid}`);
}

export function createEmpImg(data) {
  return axios.post(`${config.init.url}createEmpImg`, JSON.stringify(data));
}

export function deleteEmpImg(data) {
  return axios.post(`${config.init.url}deleteEmpImg`, JSON.stringify(data));
}
