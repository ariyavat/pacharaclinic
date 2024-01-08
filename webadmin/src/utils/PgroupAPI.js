import axios from 'axios';
import * as config from '../config';

export function getPgroup(gid,mode) {  
    return axios.get(`${config.init.web_url}pgroup/read_one.php?gid=${gid}&mode=${mode}`);
}

export function getPgroups(mode) {
  return axios.get(`${config.init.web_url}pgroup/read.php?mode=${mode}`);
}

export function createPgroup(data) {
  return axios.post(`${config.init.web_url}pgroup/create.php`, JSON.stringify(data));
}

export function updatePgroup(data) {
  return axios.post(`${config.init.web_url}pgroup/update.php`, JSON.stringify(data));
}

export function deletePgroup(data) {
  return axios.post(`${config.init.web_url}pgroup/delete.php`, JSON.stringify(data));
}
