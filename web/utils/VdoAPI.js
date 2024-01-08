import axios from 'axios';
import * as config from '../config';

export function getVdos(mode,typ) {
  return axios.get(`${config.init.web_url}API/vdo/read.php?mode=${mode}&typ=${typ}`);
}
