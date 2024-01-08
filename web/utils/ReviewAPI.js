import axios from 'axios';
import * as config from '../config';




export function getReview(id) {
  return axios.get(`${config.init.web_url}API/review/read_one.php?id=${id}`);
}

export function getReviews(status,mode) {
  return axios.get(`${config.init.web_url}API/review/read.php?status=${status}&mode=${mode}`);
}
