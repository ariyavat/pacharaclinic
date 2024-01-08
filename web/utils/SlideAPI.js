import axios from 'axios';
import * as config from '../config';

export function getSlides() {
  return axios.get(`${config.init.web_url}API/slide/read.php`);
}
