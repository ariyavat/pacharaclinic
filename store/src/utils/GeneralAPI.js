import axios from 'axios';
import * as config from '../config';

export function getGeneral(id, typ) {
  return axios.get(`${config.init.url}supplier/${id}/${typ}`);
}

export function getGenerals(typ) {
  return axios.get(`${config.init.url}generals/${typ}`);
}

export function createGeneral(data) {
  return axios.post(`${config.init.url}createGeneral`, JSON.stringify(data));
}

export function updateGeneral(data) {
  return axios.post(`${config.init.url}updateGeneral`, JSON.stringify(data));
}

export function deleteGeneral(data) {
  return axios.post(`${config.init.url}deleteGeneral`, JSON.stringify(data));
}
