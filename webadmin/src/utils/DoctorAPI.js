import axios from 'axios';
import * as config from '../config';


export function getEmployeeTime(dat) {
  //return axios.get(`${config.init.url}doctortimes`);
  return axios.get(`${config.init.web_url}employee/reads.php?dat=${dat}`);
}

export function updateEmployeeTime(data) {
  //return axios.post(`${config.init.url}updateDoctorTime`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}employee/update.php`, JSON.stringify(data));
}

export function createEmployeeTime(data) {
  //return axios.post(`${config.init.url}createDoctorTime`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}employee/create.php`, JSON.stringify(data));
}

export function deleteEmployeeTime(data) {
  //return axios.post(`${config.init.url}deleteDoctorTime`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}employee/delete.php`, JSON.stringify(data));
}



//return axios.get(`${config.init.web_url}API/employee/read_one.php?cn=${cn}&dat=${dat}`);


export function getDoctorTime(dat) {
  //return axios.get(`${config.init.url}doctortimes`);
  return axios.get(`${config.init.web_url}doctor/reads.php?dat=${dat}`);
}

export function updateDoctorTime(data) {
  //return axios.post(`${config.init.url}updateDoctorTime`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}doctor/update.php`, JSON.stringify(data));
}

export function createDoctorTime(data) {
  //return axios.post(`${config.init.url}createDoctorTime`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}doctor/create.php`, JSON.stringify(data));
}

export function deleteDoctorTime(data) {
  //return axios.post(`${config.init.url}deleteDoctorTime`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}doctor/delete.php`, JSON.stringify(data));
}


export function getSeedoctor(status) {
  //return axios.get(`${config.init.url}seedoctors/${status}`);
  return axios.get(`${config.init.web_url}seedoctor/read_one.php?status=${status}`);
}

export function getSeedoc(uid,id) {
  //return axios.get(`${config.init.url}seedoc/${uid}/${id}`);
  return axios.get(`${config.init.web_url}seedoctor/customer_read.php?uid=${uid}&id=${id}`);
}


export function createSeedoctorlist(data) {
  //return axios.post(`${config.init.url}createSeedoctorlist`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}seedoctor/create_list.php`, JSON.stringify(data));
}