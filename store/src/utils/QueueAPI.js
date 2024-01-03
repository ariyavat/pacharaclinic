import axios from 'axios';
import * as config from '../config';

export function getQueue(id) {
  return axios.get(`${config.init.url}queue/${id}`);
}

export function getQueues(state) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}queues/${cn}/${state}`);
}

export function createQueue(data) {
  return axios.post(`${config.init.url}createQueue`, JSON.stringify(data));
}

export function updateQueue(data) {
  return axios.post(`${config.init.url}updateQueue`, JSON.stringify(data));
}

export function deleteQueue(data) {
  return axios.post(`${config.init.url}deleteQueue`, JSON.stringify(data));
}

export function cancelBill(data) {
  return axios.post(`${config.init.url}cancelBill`, JSON.stringify(data));
}


/*** Visits ***/

export function getCustomerVisits(customer_id,status,limit,page,perpage) {
  return axios.get(`${config.init.url}visitcustomer/${customer_id}/${status}/${limit}/${page}/${perpage}`);
}

export function getVisits(status,sdat,edat) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}visits/${cn}/${status}/${sdat}/${edat}`);
}

export function getVisitTotals(sdat,edat) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}visitTotals/${cn}/${sdat}/${edat}`);
}


export function createVisit(data) {
  return axios.post(`${config.init.url}createVisit`, JSON.stringify(data));
}

export function updateVisit(data) {
  return axios.post(`${config.init.url}updateVisit`, JSON.stringify(data));
}

/*** Payment Plans ***/

export function getPaymentplans(id) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}paymentplans/${id}/${cn}`);
}

export function createPaymentplan(data) {
  return axios.post(`${config.init.url}createPaymentplan`, JSON.stringify(data));
}

export function updatePaymentplan(data) {
  return axios.post(`${config.init.url}updatePaymentplan`, JSON.stringify(data));
}

/*** Payment ***/

export function getPayments(sdat,edat) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}payments/${cn}/${sdat}/${edat}`);
}

export function createPayment(data) {
  return axios.post(`${config.init.url}createPayment`, JSON.stringify(data));
}

export function updatePayment(data) {
  return axios.post(`${config.init.url}updatePayment`, JSON.stringify(data));
}

/*** Payment List ***/
export function getCustomerPayment(sdat,edat) {
  return axios.get(`${config.init.url}customerPayments/${sdat}/${edat}`);
}


export function getPaymentLists(eid,sdat,edat) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}paymentlists/${eid}/${cn}/${sdat}/${edat}`);
}

export function createPaymentList(data) {
  return axios.post(`${config.init.url}createPaymentList`, JSON.stringify(data));
}

export function deletePaymentList(data) {
  return axios.post(`${config.init.url}deletePaymentList`, JSON.stringify(data));
}

/*** Payment Credit ***/
export function getPaymentCredit(ino,customer_id,mode) {
  return axios.get(`${config.init.url}paymentCredit/${ino}/${customer_id}/${mode}`);
}

export function getPaymentCredits(mode) {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}paymentCredits/${cn}/${mode}`);
}

export function createPaymentCredit(data) {
  return axios.post(`${config.init.url}createPaymentCredit`, JSON.stringify(data));
}

export function deletePaymentCredit(data) {
  return axios.post(`${config.init.url}deletePaymentCredit`, JSON.stringify(data));
}


//TEMP AR
export function getTempars() {
  const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  return axios.get(`${config.init.url}tempars/${cn}`);
}

export function createTempar(data) {
  return axios.post(`${config.init.url}createTempar`, JSON.stringify(data));
}

export function updateTempar(data) {
  return axios.post(`${config.init.url}updateTempar`, JSON.stringify(data));
}

export function deleteTempar(data) {
  return axios.post(`${config.init.url}deleteTempar`, JSON.stringify(data));
}


