import axios from 'axios';
import * as config from '../config';



/** * Temp list ***/
export function getTempRecives() {
  return axios.get(`${config.init.url}tempRecives`);
}

export function createTempRecive(data) {
  return axios.post(`${config.init.url}createTempRecive`, JSON.stringify(data));
}

export function updateTempRecive(data) {
  return axios.post(`${config.init.url}updateTempRecive`, JSON.stringify(data));
}

export function deleteTempRecive(data) {
  return axios.post(`${config.init.url}deleteTempRecive`, JSON.stringify(data));
}

export function deleteTempRecives(data) {
  return axios.post(`${config.init.url}deleteTempRecives`, JSON.stringify(data));
}

/** * Recive ****/
export function getRecive(ino,id) {
  return axios.get(`${config.init.url}recive/${ino}/${id}`);
}

export function getReciveProduct(id) { 
  return axios.get(`${config.init.url}reciveProduct/${id}`);
}

export function getReciveDetail(ino) {
  return axios.get(`${config.init.url}reciveDetail/${ino}`);
}

export function getRecives(sdat, edat) {
  return axios.get(`${config.init.url}recives/${sdat}/${edat}`);
}

export function createRecive(data) {
  return axios.post(`${config.init.url}createRecive`, JSON.stringify(data));
}

export function createReciveList(data) {
  return axios.post(`${config.init.url}createReciveList`, JSON.stringify(data));
}

export function getReciveList(id) {
  return axios.get(`${config.init.url}reciveList/${id}`);
}

/** * Temp Out list ***/
export function getTempOuts() {
  return axios.get(`${config.init.url}tempOuts`);
}

export function createTempOut(data) {
  return axios.post(`${config.init.url}createTempOut`, JSON.stringify(data));
}

export function updateTempOut(data) {
  return axios.post(`${config.init.url}updateTempOut`, JSON.stringify(data));
}

export function deleteTempOut(data) {
  return axios.post(`${config.init.url}deleteTempOut`, JSON.stringify(data));
}

export function deleteTempOuts(data) {
  return axios.post(`${config.init.url}deleteTempOuts`, JSON.stringify(data));
}

/** * Out ****/
export function getOut(ino) {
  return axios.get(`${config.init.url}out/${ino}`);
}

export function getOutDetail(ino) {
  return axios.get(`${config.init.url}outDetail/${ino}`);
}

export function getOuts(sdat, edat) { 
  return axios.get(`${config.init.url}outs/${sdat}/${edat}`);
}

export function createOut(data) {
  return axios.post(`${config.init.url}createOut`, JSON.stringify(data));
}

export function createOutList(data) {
  return axios.post(`${config.init.url}createOutList`, JSON.stringify(data));
}

/** * Temp Adjust list ***/
export function getTempAdjusts() {
  return axios.get(`${config.init.url}tempAdjusts`);
}

export function createTempAdjust(data) {
  return axios.post(`${config.init.url}createTempAdjust`, JSON.stringify(data));
}

export function updateTempAdjust(data) {
  return axios.post(`${config.init.url}updateTempAdjust`, JSON.stringify(data));
}

export function deleteTempAdjust(data) {
  return axios.post(`${config.init.url}deleteTempAdjust`, JSON.stringify(data));
}

export function deleteTempAdjusts(data) {
  return axios.post(`${config.init.url}deleteTempAdjusts`, JSON.stringify(data));
}

/** * Adjust ****/
export function getAdjust(ino) {
  return axios.get(`${config.init.url}adjust/${ino}`);
}

export function getAdjustDetail(ino) {
  return axios.get(`${config.init.url}adjustDetail/${ino}`);
}


export function getAdjusts(sdat, edat) {
  return axios.get(`${config.init.url}adjusts/${sdat}/${edat}`);
}

export function createAdjust(data) {
  return axios.post(`${config.init.url}createAdjust`, JSON.stringify(data));
}

export function createAdjustList(data) {
  return axios.post(`${config.init.url}createAdjustList`, JSON.stringify(data));
}

export function getStockCard(id,year,month) {
  return axios.get(`${config.init.url}stockcards/${id}/${year}/${month}`);
}


/****  Pickup ****/
export function getPickupProducts(cn) {
  return axios.get(`${config.init.url}pickupProducts/${cn}`);
}
export function getPickups(mode, sdat, edat) {
  return axios.get(`${config.init.url}pickups/${mode}/${sdat}/${edat}`);
}

export function getPickupDetail(ino) {
  return axios.get(`${config.init.url}pickupDetail/${ino}`);
}

export function getPickupDetailHis(ino) {
  return axios.get(`${config.init.url}pickupDetailHis/${ino}`);
}

export function updatePickup(data) {
  return axios.post(`${config.init.url}updatePickup`, JSON.stringify(data));
}

export function updatePickupList(data) {
  return axios.post(`${config.init.url}updatePickupList`, JSON.stringify(data));
}


/** * Temp Po ***/
export function getTempPo() {
  return axios.get(`${config.init.url}tempPo`);
}

export function createTempPo(data) {
  return axios.post(`${config.init.url}createTempPo`, JSON.stringify(data));
}

export function updateTempPo(data) {
  return axios.post(`${config.init.url}updateTempPo`, JSON.stringify(data));
}

export function deleteTempPo(data) {
  return axios.post(`${config.init.url}deleteTempPo`, JSON.stringify(data));
}

export function deleteTempPos(data) {
  return axios.post(`${config.init.url}deleteTempPos`, JSON.stringify(data));
}

/** * Po ****/
export function getPo(ino) {
  return axios.get(`${config.init.url}po/${ino}`);
}

export function getPoDetail(ino) {
  return axios.get(`${config.init.url}poDetail/${ino}`);
}

export function getPos(mode, sdat, edat) {
  return axios.get(`${config.init.url}pos/${mode}/${sdat}/${edat}`);
}

export function createPo(data) {
  return axios.post(`${config.init.url}createPo`, JSON.stringify(data));
}

export function createPoList(data) {
  return axios.post(`${config.init.url}createPoList`, JSON.stringify(data));
}



/** * Temp Tranfer list ***/
export function getTempTranfers(cn) {
  return axios.get(`${config.init.url}tempTranfers/${cn}`);
}

export function createTempTranfer(data) {
  return axios.post(`${config.init.url}createTempTranfer`, JSON.stringify(data));
}

export function updateTempTranfer(data) {
  return axios.post(`${config.init.url}updateTempTranfer`, JSON.stringify(data));
}

export function deleteTempTranfer(data) {
  return axios.post(`${config.init.url}deleteTempTranfer`, JSON.stringify(data));
}

export function deleteTempTranfers(data) {
  return axios.post(`${config.init.url}deleteTempTranfers`, JSON.stringify(data));
}


/** * Tranfer ****/
export function getTranfer(ino) {
  return axios.get(`${config.init.url}tranfer/${ino}`);
}
export function getTranfers(sdat, edat) { 
  return axios.get(`${config.init.url}tranfers/${sdat}/${edat}`);
}
export function getTranfersProduct(sdat, edat) { 
  return axios.get(`${config.init.url}tranfersProduct/${sdat}/${edat}`);
}
export function getTranfersBProduct(sdat, edat) { 
  return axios.get(`${config.init.url}tranfersBProduct/${sdat}/${edat}`);
}
export function createTranfer(data) {
  return axios.post(`${config.init.url}createTranfer`, JSON.stringify(data));
}


/** * Update Stock ***/

export function updateStore(data, typ, mem, dat) {
 
  let total = 0; let sum = 0; let bprice = 0; let tprice = 0; let price = data.price;  
  let totalPrice = 0; 
  let rno = '-'; 
  let mode = 'N';
  let qty = parseFloat(data.qty); //จำนวนทั้งหมด
   let temp = ''; let temp1 = '';
  axios.get(`${config.init.url}product/${data.product_id}`)
	.then(function(results) {
  		if (results.data.status === '200') { 
  			total = parseFloat(results.data.data.total);  //จำนวนคงเหลือ
        bprice = parseFloat(results.data.data.bprice);// ราคาต้นทุน
  		}

  		if (typ === 'I') {
        mode = 'I'
        tprice = ((total * bprice) + parseFloat(data.price)) / (total + parseFloat(data.qty));
        totalPrice = data.price;
  			sum = total + parseFloat(data.qty);

        temp = {total: sum, bprice: tprice};  
        const newUpdate = {data: temp, id: data.product_id};
        updateProduct(newUpdate);
        insertCard(data,rno,'I',qty,sum,price,mem,dat);
  		} else if (typ === 'P') {  		
        mode = 'P';
        sum = total - parseFloat(data.qty);
        if(sum < 0) {  sum = 0;  }
        temp = {total: sum};  
        const newUpdate = {data: temp, id: data.product_id};
        updateProduct(newUpdate);
  		} else if (typ === 'A') {

        mem = 'ปรับสต็อค : '+ mem;    
        /**
        if(data.typ_id==='A'){
          if(total > qty){
            mode = 'P';
            qty = total - parseFloat(data.qty);   
            total = total - qty;       
          } else {
            mode = 'I';
            qty = qty - total;
            total = total + qty;
            price = 0;
          }
         // temp = {total: parseFloat(data.qty)};  
         // const newUpdate = {data: temp, id: data.product_id};
         // updateProduct(newUpdate);
                
        } else if(data.typ_id==='I'){
            mode = 'I';    
            qty = parseFloat(data.qty);   
            total = total + qty;
            price = 0;
           // temp = {total: total};  
            //const newUpdate = {data: temp, id: data.product_id};
            //updateProduct(newUpdate);
          
        } else if(data.typ_id==='P'){
            mode = 'P';
            qty = parseFloat(data.qty);
           // let sum = total - parseFloat(data.qty);
           // temp = {total: sum};  
           // const newUpdate = {data: temp, id: data.product_id};
           // updateProduct(newUpdate);
         

        }
        */
      }


      let temp = {};
      if(mode === 'P'){
        let pid = data.product_id;
        //let qty = parseFloat(data.qty);

        axios.get(`${config.init.url}reciveListDetail/${pid}`)
        .then(function(results) {
          if (results.data.status === '200') {
            let rt = results.data.data;   
            
            updateStockCard(pid,qty,total,0,rt,data)

            /*
            rt.forEach(function (val,i) {  
                         
              if(qty > parseFloat(val.total)){   
                const newUpdate = {data: { total: 0 }, id: pid, ino: val.ino};
                axios.post(`${config.init.url}updateReciveList`, JSON.stringify(newUpdate));             
                total = total - parseFloat(val.total);
                totalPrice =  bprice * parseFloat(val.total);
               // temp = {total: total};    
               // const proUpdate = {data: temp, id: pid};
               // updateProduct(proUpdate);
                insertCard(data,val.ino,'P',parseFloat(val.total),total,totalPrice,mem,dat);     
                qty = qty - parseFloat(val.total);
              } else if(qty > 0 ){
                let qtotal = parseFloat(val.total) - qty;
                const newUpdate = {data: { total: qtotal }, id: pid, ino: val.ino};
                axios.post(`${config.init.url}updateReciveList`, JSON.stringify(newUpdate));
                total = total - qty;
                totalPrice =  bprice * qty;
               // temp = {total: total};    
               // const proUpdate = {data: temp, id: pid};
               // updateProduct(proUpdate)
                insertCard(data,val.ino,'P',qty,total,totalPrice,mem,dat);   
                qty = 0;
              }
            });    
            */      
          } else {
           // let qty = parseFloat(data.qty);
            //let sum = total - qty;
            //let temp = {total: 0};  
           // const newUpdate = {data: temp, id: data.product_id};
           // updateProduct(newUpdate);
            insertCard(data,data.ino,'P',qty,0,totalPrice,mem,dat);   

          }
        });
      } else {
        /**
        if(qty > 0){          
          if(typ==='A'){            
            updateReciveList(data.product_id,qty);
            temp = {total: total};    
            const newUpdate1 = {data: temp, id: data.product_id};
            insertCard(data,rno,'I',qty,total,price,mem,dat);
          } else {
            temp = {bprice: tprice };    
            const newUpdate = {data: temp, id: data.product_id};
            updateProduct(newUpdate);
            temp1 = {total: total};    
            const newUpdate1 = {data: temp1, id: data.product_id};
            updateProduct(newUpdate1)
            insertCard(data,rno,'I',qty,total,price,mem,dat);

          }         
        }
        */
      }
  });


  function updateStockCard(pid,qty,total,i,list,data){
      //rt.length
      const val = list[i]
      if(qty > parseFloat(val.total)){   
        const newUpdate = {data: { total: 0 }, id: pid, ino: val.ino};
        axios.post(`${config.init.url}updateReciveList`, JSON.stringify(newUpdate))
        .then(function(results) {
          total = total - parseFloat(val.total);
          totalPrice =  bprice * parseFloat(val.total);
          //insertCard(data,val.ino,'P',parseFloat(val.total),total,totalPrice,mem,dat);   
          //insertCard(data,rno,typ,qty,total,totalPrice,mem,dat)

          /**  insertCard */
          if(total < 0){  total = 0;  }
          const newData = {        
            ino: data.ino,
            rno: val.ino,
            dat: dat,
            product_id: data.product_id,
            product_name: data.product_name,
            typ: 'P',
            qty: parseFloat(val.total),
            unit: data.unit,
            total: total,
            total_price: totalPrice,
            note: mem+'..',
          };
          axios.post(`${config.init.url}createStockCard`, JSON.stringify(newData))
          .then(function(results) {
              qty = qty - parseFloat(val.total);
              i = i + 1
              updateStockCard(pid,qty,total,i,list,data)            
          });
          /** End insertCard */

        })  
      }  else if(qty > 0 ){

        let qtotal = parseFloat(val.total) - qty;
        const newUpdate = {data: { total: qtotal }, id: pid, ino: val.ino};
        axios.post(`${config.init.url}updateReciveList`, JSON.stringify(newUpdate))
        .then(function(results) {
          total = total - qty;
          totalPrice =  bprice * qty; 
          insertCard(data,val.ino,'P',qty,total,totalPrice,mem,dat);   
          qty = 0;

        })



      }


    
  }

  function updateProduct(data){  
    axios.post(`${config.init.url}updateProduct`, JSON.stringify(data))
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
        if(total < 0){  total = 0;  }

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
        axios.post(`${config.init.url}createStockCard`, JSON.stringify(newData))
        .then(function(results) {
          
        });
  }

  function updateReciveList(pid,qty){
    axios.get(`${config.init.url}reciveListDetail/${pid}`)
    .then(function(results) {
        let ino = results.data.data.ino;
        let total = parseFloat(results.data.data.total) + parseFloat(qty);
        const newUpdate = {data: { total: total }, id: pid, ino: ino};
        axios.post(`${config.init.url}updateReciveList`, JSON.stringify(newUpdate)); 
    });
  }



}
