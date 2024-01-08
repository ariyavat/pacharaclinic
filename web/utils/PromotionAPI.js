import axios from 'axios';
import * as config from '../config';

export function getPromotion(id) {
  return axios.get(`${config.init.web_url}API/promotion/read_one.php?id=${id}`);
}

export function getPromotions(mode,sdat,edat) {
  return axios.get(`${config.init.web_url}API/promotion/read.php?mode=${mode}&sdat=${sdat}&edat=${edat}`);
}
