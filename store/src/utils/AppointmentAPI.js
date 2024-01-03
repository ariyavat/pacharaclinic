import axios from 'axios';
import * as config from '../config';

/*** Appointment ***/
export function getCustomerAppointment(customer_id) {
  return axios.get(`${config.init.url}customerAppointment/${customer_id}`);
}

export function getAppointment(id) {
  return axios.get(`${config.init.url}appointment/${id}`);
}

export function getAppointments(cn,status,sdat, edat) {
  return axios.get(`${config.init.url}appointments/${cn}/${status}/${sdat}/${edat}`);
}

export function createAppointment(data) {
  return axios.post(`${config.init.url}createAppointment`, JSON.stringify(data));
}

export function updateAppointment(data) {
  return axios.post(`${config.init.url}updateAppointment`, JSON.stringify(data));
}

export function deleteAppointment(data) {
  return axios.post(`${config.init.url}deleteAppointment`, JSON.stringify(data));
}

