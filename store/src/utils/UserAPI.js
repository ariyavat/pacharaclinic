import axios from 'axios';
import * as config from '../config';
 
export function getUserName(username) {
  return axios.get(`${config.init.url}getUsername/${username}`);
}

export function getUser(uid) {
  return axios.get(`${config.init.url}user/${uid}`);
}

export function getUsers() {
  return axios.get(`${config.init.url}users`);
}

export function serchUsers(page, perpage, txt) {
  let searchText = txt;
  if (txt === '') {
    searchText = '-';
  }
  return axios.get(`${config.init.url}serch_users/${page}/${perpage}/${searchText}`);
}

export function createUser(data) {
  return axios.post(`${config.init.url}createUser`, JSON.stringify(data));
}

export function updateUser(data) {
  return axios.post(`${config.init.url}updateUser`, JSON.stringify(data));
}

export function deleteUser(data) {
  return axios.post(`${config.init.url}deleteUser`, JSON.stringify(data));
}


