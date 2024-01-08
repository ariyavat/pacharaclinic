import axios from 'axios';
import * as config from '../config';

export function getAppointments(cn,status,sdat, edat) {
  return axios.get(`${config.init.ms_url}appointments/${cn}/${status}/${sdat}/${edat}`);
}

export function msAppointment(id) {
	return axios.get(`${config.init.ms_url}customerAppointment/${id}`);
}

export function createAppointment(data) {
  return axios.post(`${config.init.ms_url}createAppointment`, JSON.stringify(data));
}




