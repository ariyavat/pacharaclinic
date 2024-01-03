import axios from 'axios';
import * as config from '../config';

export function getCompany(id) {
  return axios.get(`${config.init.url}company`);
}

export function updateCompany(data) {
  return axios.post(`${config.init.url}updateCompany`, JSON.stringify(data));
}

/*** Where House ***/
export function getWherehouse(id) {
  return axios.get(`${config.init.url}wherehouse/${id}`);
}

export function getWherehouses(id) {
  return axios.get(`${config.init.url}wherehouses/${id}`);
}

export function createWherehouse(data) {
  return axios.post(`${config.init.url}createWherehouse`, JSON.stringify(data));
}

export function updateWherehouse(data) {
  return axios.post(`${config.init.url}updateWherehouse`, JSON.stringify(data));
}

export function deleteWherehouse(data) {
  return axios.post(`${config.init.url}deleteWherehouse`, JSON.stringify(data));
}


/*** Location ***/
export function getLocation(id) {
  return axios.get(`${config.init.url}location/${id}`);
}

export function getLocations(mode) {
  return axios.get(`${config.init.url}locations`);
}

export function getmsLocations(mode) {
  return axios.get(`${config.init.ms_url}locations`);
}




export function createLocation(data) {
  return axios.post(`${config.init.url}createLocation`, JSON.stringify(data));
}

export function updateLocation(data) {
  return axios.post(`${config.init.url}updateLocation`, JSON.stringify(data));
}

export function deleteLocation(data) {
  return axios.post(`${config.init.url}deleteLocation`, JSON.stringify(data));
}
