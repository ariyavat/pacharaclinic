import axios from 'axios';
import * as config from '../config';



/** * Temp list ***/
export function getTempBRecives() {
  return axios.get(`${config.init.url}tempBRecives`);
}

export function createTempBRecive(data) {
  return axios.post(`${config.init.url}createTempBRecive`, JSON.stringify(data));
}

export function updateTempBRecive(data) {
  return axios.post(`${config.init.url}updateTempBRecive`, JSON.stringify(data));
}

export function deleteTempBRecive(data) {
  return axios.post(`${config.init.url}deleteTempBRecive`, JSON.stringify(data));
}

export function deleteTempBRecives(data) {
  return axios.post(`${config.init.url}deleteTempBRecives`, JSON.stringify(data));
}

/** * Recive ****/
export function getBRecive(ino,id) {
  return axios.get(`${config.init.url}brecive/${ino}/${id}`);
}

export function getBReciveProduct(id) { 
  return axios.get(`${config.init.url}breciveProduct/${id}`);
}

export function getBReciveDetail(ino) {
  return axios.get(`${config.init.url}breciveDetail/${ino}`);
}

export function getBRecives(sdat, edat) {
  return axios.get(`${config.init.url}brecives/${sdat}/${edat}`);
}

export function createBRecive(data) {
  return axios.post(`${config.init.url}createBRecive`, JSON.stringify(data));
}

export function createBReciveList(data) {
  return axios.post(`${config.init.url}createBReciveList`, JSON.stringify(data));
}

export function getBReciveList(id) {
  return axios.get(`${config.init.url}breciveList/${id}`);
}

/** * Temp Out list ***/
export function getTempBOuts() {
  return axios.get(`${config.init.url}tempBOuts`);
}

export function createTempBOut(data) {
  return axios.post(`${config.init.url}createTempBOut`, JSON.stringify(data));
}

export function updateTempBOut(data) {
  return axios.post(`${config.init.url}updateTempBOut`, JSON.stringify(data));
}

export function deleteTempBOut(data) {
  return axios.post(`${config.init.url}deleteTempBOut`, JSON.stringify(data));
}

export function deleteTempBOuts(data) {
  return axios.post(`${config.init.url}deleteTempBOuts`, JSON.stringify(data));
}

/** * Out ****/
export function getBOut(ino) {
  return axios.get(`${config.init.url}bout/${ino}`);
}

export function getBOutDetail(ino) {
  return axios.get(`${config.init.url}boutDetail/${ino}`);
}

export function getBOuts(sdat, edat) { 
  return axios.get(`${config.init.url}bouts/${sdat}/${edat}`);
}

export function createBOut(data) {
  return axios.post(`${config.init.url}createBOut`, JSON.stringify(data));
}

export function createBOutList(data) {
  return axios.post(`${config.init.url}createBOutList`, JSON.stringify(data));
}

/** * Temp Adjust list ***/
export function getTempBAdjusts() {
  return axios.get(`${config.init.url}tempBAdjusts`);
}

export function createTempBAdjust(data) {
  return axios.post(`${config.init.url}createTempBAdjust`, JSON.stringify(data));
}

export function updateTempBAdjust(data) {
  return axios.post(`${config.init.url}updateTempBAdjust`, JSON.stringify(data));
}

export function deleteTempBAdjust(data) {
  return axios.post(`${config.init.url}deleteTempBAdjust`, JSON.stringify(data));
}

export function deleteTempBAdjusts(data) {
  return axios.post(`${config.init.url}deleteTempBAdjusts`, JSON.stringify(data));
}

/** * Adjust ****/
export function getBAdjust(ino) {
  return axios.get(`${config.init.url}badjust/${ino}`);
}

export function getBAdjustDetail(ino) {
  return axios.get(`${config.init.url}badjustDetail/${ino}`);
}


export function getBAdjusts(sdat, edat) {
  return axios.get(`${config.init.url}badjusts/${sdat}/${edat}`);
}

export function createBAdjust(data) {
  return axios.post(`${config.init.url}createBAdjust`, JSON.stringify(data));
}

export function createBAdjustList(data) {
  return axios.post(`${config.init.url}createBAdjustList`, JSON.stringify(data));
}


export function getBStockCard(id,year,month) {
  return axios.get(`${config.init.url}bstockcards/${id}/${year}/${month}`);
}



/** * Update Stock ***/

export function updateBStore(data, typ, mem, dat) {
 
  let total = 0; let bprice = 0; let tprice = 0; let price = data.price;  
  let totalPrice = 0; let rno = '-'; let mode = 'I';
  let qty = parseFloat(data.qty); let temp = ''; let temp1 = '';
  axios.get(`${config.init.url}productSet/${data.product_id}`)
	.then(function(results) {
	
  		if (results.data.status === '200') {
  			total = parseFloat(results.data.data.total);
        	bprice = 0;
  		}
  		if (typ === 'I') {
        tprice = ((total * bprice) + parseFloat(data.price)) / (total + parseFloat(data.qty));
        totalPrice = data.price;
  			total = total + parseFloat(data.qty);
  		} else if (typ === 'P') {
  		  //total = total - parseFloat(data.qty);
        //totalPrice =  bprice * parseFloat(data.qty);
        mode = 'P';
  		} else if (typ === 'A') {

        mem = 'ปรับสต็อค : '+ mem;    
        if(data.typ_id==='A'){
          if(total > qty){
            mode = 'P';
            qty = total - parseFloat(data.qty);           
          } else {
            mode = 'I';
            qty = qty - total;
            total = total + qty;
            price = 0;
          }
          temp = {total: parseFloat(data.qty)};  
          const newUpdate = {data: temp, id: data.product_id, mode:'YES'};
          updateProduct(newUpdate);
          //updateReciveList(data.product_id,parseFloat(data.qty));          
        } else if(data.typ_id==='I'){
            mode = 'I';    
            qty = parseFloat(data.qty);   
            total = total + qty;
            price = 0;
            temp = {total: total};  
            const newUpdate = {data: temp, id: data.product_id, mode:'YES'};
            updateProduct(newUpdate);
            //updateReciveList(data.product_id,total);
        } else if(data.typ_id==='P'){
            mode = 'P';
            qty = parseFloat(data.qty);
            let sum = total - parseFloat(data.qty);
            temp = {total: sum};  
            const newUpdate = {data: temp, id: data.product_id, mode:'YES'};
            updateProduct(newUpdate);
            //updateReciveList(data.product_id,sum);

        }
      }


      let temp = {};
      if(mode === 'P'){
        let pid = data.product_id;
        //let qty = parseFloat(data.qty);

        axios.get(`${config.init.url}breciveListDetail/${pid}`)
        .then(function(results) {
          if (results.data.status === '200') {
            let rt = results.data.data;         
            rt.forEach(function (val,i) {             
              if(qty > parseFloat(val.total)){   
                const newUpdate = {data: { total: 0 }, id: pid, ino: val.ino};
                axios.post(`${config.init.url}updateBReciveList`, JSON.stringify(newUpdate));             
                total = total - parseFloat(val.total);
                totalPrice =  bprice * parseFloat(val.total);
                temp = {total: total};    
                const proUpdate = {data: temp, id: pid, mode:'YES'};
                updateProduct(proUpdate);
                insertCard(data,val.ino,'P',parseFloat(val.total),total,totalPrice,mem,dat);     
                qty = qty - parseFloat(val.total);
              } else if(qty > 0 ){
                let qtotal = parseFloat(val.total) - qty;
                const newUpdate = {data: { total: qtotal }, id: pid, ino: val.ino};
                axios.post(`${config.init.url}updateBReciveList`, JSON.stringify(newUpdate));
                total = total - qty;
                totalPrice =  bprice * qty;
                temp = {total: total};    
                const proUpdate = {data: temp, id: pid, mode:'YES'};
                updateProduct(proUpdate)
                insertCard(data,val.ino,'P',qty,total,totalPrice,mem,dat);   
                qty = 0;
              }
            });          
          } else {
           // let qty = parseFloat(data.qty);
            let sum = total - qty;
            let temp = {total: sum};  
            const newUpdate = {data: temp, id: data.product_id, mode:'YES'};
            updateProduct(newUpdate);
            insertCard(data,data.ino,'P',qty,total,totalPrice,mem,dat);   

          }
        });
      } else {
        if(qty > 0){          
          if(typ==='A'){            
            updateReciveList(data.product_id,qty);
            temp = {total: total};    
            const newUpdate1 = {data: temp, id: data.product_id, mode:'YES'};
            insertCard(data,rno,'I',qty,total,price,mem,dat);
          } else {
            temp = {bprice: tprice };    
            const newUpdate = {data: temp, id: data.product_id, mode:'YES'};
            updateProduct(newUpdate);
            temp1 = {total: total};    
            const newUpdate1 = {data: temp1, id: data.product_id, mode:'YES'};
            updateProduct(newUpdate1)
            insertCard(data,rno,'I',qty,total,price,mem,dat);

          }         
        }
      }
  });

  function updateProduct(data){  
    axios.post(`${config.init.url}updateProductSet`, JSON.stringify(data))
    .then(function(results) {
      //console.log('UU',data,results)
    });
  }

  function updateProductTotal(data){  
    axios.post(`${config.init.url}updateProductTotal`, JSON.stringify(data))
    .then(function(results) {
     
    });
  }

  function insertCard(data,rno,typ,qty,total,totalPrice,mem,dat){
        const users = JSON.parse(localStorage.getItem('msClinic'));
        const newData = {        
          ino: data.ino,
          rno: rno,
          dat: dat,
          product_id: data.product_id,
          product_name: data.product_name,
          typ: typ,
          qty: qty,
          unit: data.unit,
          total: total,
          total_price: totalPrice,
          note: mem,
        };
        axios.post(`${config.init.url}createBStockCard`, JSON.stringify(newData));
  }

  function updateReciveList(pid,qty){
    axios.get(`${config.init.url}breciveListDetail/${pid}`)
    .then(function(results) {
        let ino = results.data.data.ino;
        let total = parseFloat(results.data.data.total) + parseFloat(qty);
        const newUpdate = {data: { total: total }, id: pid, ino: ino};
        axios.post(`${config.init.url}updateBReciveList`, JSON.stringify(newUpdate)); 
    });
  }



}
