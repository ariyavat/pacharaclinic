import axios from 'axios';
import * as config from '../config';

export function getReview(id) {    
    //return axios.get(`${config.init.url}review/${id}`); 
    return axios.get(`${config.init.web_url}review/read_one.php?id=${id}`);
}

export function getReviews(status,mode) {
  //return axios.get(`${config.init.url}reviews/${status}/${mode}`); 
  return axios.get(`${config.init.web_url}review/read.php?status=${status}&mode=${mode}`);
}

export function createReview(data) {
  //return axios.post(`${config.init.url}createReview`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}review/create.php`, JSON.stringify(data));
}

export function updateReview(data) {
  //return axios.post(`${config.init.url}updateReview`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}review/update.php`, JSON.stringify(data));
}

export function deleteReview(data) {
  //return axios.post(`${config.init.url}deleteReview`, JSON.stringify(data));
  return axios.post(`${config.init.web_url}review/delete.php`, JSON.stringify(data));
}
