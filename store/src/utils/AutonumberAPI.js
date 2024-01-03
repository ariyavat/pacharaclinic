import axios from 'axios';
import moment from 'moment';
import * as config from '../config';

export function getAutonumber(id,cn) {
  return axios.get(`${config.init.url}autonumber/${id}/${cn}`);
}

export function createAutonumber(data) {
  return axios.post(`${config.init.url}createAutonumber`, JSON.stringify(data));
}

export function updateAutonumber(data) {
  if(data.mode === 'Y'){
      if(moment().format('YY') !== data.lastM){  lastM = moment().format('YY');    }  
  }
  if(data.mode === 'M'){
      if(moment().format('MM') !== data.lastM){  lastM = moment().format('MM');    }  
  }  
  return axios.post(`${config.init.url}updateAutonumber`, JSON.stringify(data));
}

export function setAutonumber(id, lnum) {
    const temp = {lastID: lnum};
    //const cn = JSON.parse(localStorage.getItem('msClinic')).location_id; 
    const newData = {data: temp, id: id, cn: 'ST'};
    return axios.post(`${config.init.url}updateAutonumber`, JSON.stringify(newData));   
}


export function getAutonumberID(data) {
  let txt = '';
  const users = JSON.parse(localStorage.getItem('msClinic')); 
  let lastID = parseFloat(data.lastID);
  
  for (let i = 0; i < data.aformat.length; i++) {
    switch (data.aformat[i]) {
      case '*' :
        if (data.aformat[i + 1] === 'B') {
          txt = txt + 'ST';
          i++;
        }
        if (data.aformat[i + 1] === 'Y') {
          if(data.mode === 'Y'){  
            if(parseFloat(moment().format('YY')) !== parseFloat(data.lastM)){ lastID = 0;    }             
          }
          txt = txt + moment().format('YY');
          i++;
        }
        if (data.aformat[i + 1] === 'E') {
          if(data.mode === 'Y'){              
            if( parseFloat(moment().format('YY')) !== parseFloat(data.lastM)){ lastID = 0;    }             
          }          
          txt = txt + moment().format('YY') + 543;
          i++;
        }
        if (data.aformat[i + 1] === 'M') {
          if(data.mode === 'M'){  
            if(parseFloat(moment().format('MM')) !== parseFloat(data.lastM)){ lastID = 0;    }             
          }
          txt = txt + moment().format('MM');
          i++;
        }
        if (data.aformat[i + 1] === 'D') {
          txt = txt + moment().format('DD');
          i++;
        }

        break;
      default :
        txt = txt + data.aformat[i];
        break;
    }
  }



  let maxid = lastID + 1;
  let num = parseFloat(data.lnum) - maxid.toString().length;
  let tn = '';
  for (let i = 0; i < num; i++) {
    tn = `${tn  }0`;
  }
  let id = txt + tn + maxid;
  return {id: data.id, lastID: id, maxID: maxid};
}
