import axios from 'axios';
import * as config from '../config';



export function getAppointments(status) {
  return axios.get(`${config.init.url}appointments/${status}`); 
}

export function updateAppointment(data) {
  return axios.post(`${config.init.url}updateAppointment`, JSON.stringify(data));
}

/*
export function deleteContact(data) {
  return axios.post(`${config.init.url}deleteContact`, JSON.stringify(data));
}
*/



/*** Appointment ***/

export function getEmployees(typ,status) {
  return axios.get(`${config.init.ms_url}employees/${typ}/${status}`);
}

export function getGenerals(typ) {
  return axios.get(`${config.init.ms_url}generals/${typ}`);
}

export function createAppointment(data) {
  return axios.post(`${config.init.ms_url}createAppointment`, JSON.stringify(data));
}


export function getLocations(mode) {
  return axios.get(`${config.init.ms_url}locations`);
}
