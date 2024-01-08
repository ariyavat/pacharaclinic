import axios from 'axios';
import * as config from '../config';

export function getEmployeeTime(cn,dat) {
  return axios.get(`${config.init.web_url}API/employee/read_one.php?cn=${cn}&dat=${dat}`);
}
