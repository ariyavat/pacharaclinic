import React from 'react';
import moment from 'moment';
import ContentHeader from '../../components/common/ContentHeader';  
import ConfirmStore from '../../components/common/ConfirmStore'; 
import {getPickupProducts, getPickupDetail} from '../../utils/StoreAPI'; 
import {serchProducts} from '../../utils/ProductAPI';
const initialState = {
  loading: false, isViews: 'LIST', tempList: [],  productList: [], data: [], nonList: [], nstate: 'N',
};
const curent_date = moment().format('YYY-MM-DD');

export default class PickupproductPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {
    let _this = this;
    
    this.getDatas();    
  }

  render() {
    const item = this.state;
    const list =  item.tempList.map((data,i) =>
      <tr key={i} > 
        <td>{i+1}</td>   
        <td>{data.pid}</td>       
        <td>{data.pname}</td>    
        <td>{data.qty.toLocaleString('en-US', {minimumFractionDigits: 0})}</td> 
        <td>{data.total.toLocaleString('en-US', {minimumFractionDigits: 0})}</td> 
        <td>{data.unit}</td>
 
      </tr>
    )

    const plist =  item.nonList.map((data,i) =>
      <tr key={i} > 
        <td>{i+1}</td>   
        <td>{data.id}</td>       
        <td>{data.name}</td> 
 
      </tr>
    )

    return (
    <div>
      {
        item.isViews !== 'PRINT' ?
        <ContentHeader title="โรงงาน" small="รายการวัตถุดิบที่เบิก" >
        {
          item.isViews === 'VIEWS' ?
          <a onClick={(e) => this.setState({isViews: 'LIST'})} ><i className="fa fa-close pull-right hclose"></i> </a>
          : null
        }
        </ContentHeader>
        : null
      }
         
                               
      {
        item.isViews === 'LIST' ?
        <section className="content">
          <div className="box box-info min-650" >  
  
            <div className="box-body min-300">    
              
              <table id="mytable" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th width='50'>#</th>      
                    <th width='150'>รหัส</th> 
                    <th>ชื่อวัตถุดิบ</th> 
                    <th width='150'>จำนวนเบิก</th>      
                    <th width='150'>คงเหลือ</th>               
                    <th width='100'>หน่วย</th>  
                                               
                  </tr>
                  </thead>
                  <tbody>
                  {list}
                  </tbody>
              </table>
              {
                  item.tempList.length === 0 ?
                  <div className="row">
                    <div className="col-sm-12 text-center pad-bottom-50">
                        <div className="dblock mgt-100">       
                              <small>ไม่พบรายการวัตถุดิบที่เบิก!!</small>
                        </div>                          
                    </div>
                    </div>
                  : null
              }
              {
                  item.nstate === 'Y' ?
                  <div className="row">
                    <div className="col-sm-12 pad-bottom-50">
                      <h3>รายการสินค้าที่ไม่ได้กำหนด วัตถุดิบ <small className="text-red">ให้ไปกำหนดรายการวัตถุดิบในสินค้าก่อน (ไปที่เมนูตั้งค่าสินค้า)</small></h3>
                      <table className="table table-bordered table-hover">
                          <thead>
                          <tr>
                            <th width='50'>#</th>      
                            <th width='150'>รหัส</th> 
                            <th>ชื่อสินค้า</th>                                                        
                          </tr>
                          </thead>
                          <tbody>
                          {plist}
                          </tbody>
                      </table> 
                    </div>
                    </div>
                  : null
              }


       
            </div> 

            {
            item.loading ?
              <div className="overlay">
                <i className="fa fa-refresh fa-spin"></i>
              </div>
            : null
            }

          </div>
        </section>
        : null
      }



    </div>
    );
  }
  //

  getDatas () { 
    let _this = this;    
    this.setState({ loading: true, },()=>{
      serchProducts('ALL','ALL', 1, 1000, '')
      .then(function(results) {  
        let pList =  []       
        if (results.data.status === '200') {
          pList = results.data.data       
        }  
        getPickupProducts()
        .then(function(results) {
          if (results.data.status === '200') {
            let list = [], nonList = []
            let data = results.data.data     
            console.log(data)  
            data.forEach(function(k) {   
              let qty = k.total
              let dList = k.detail
              if(dList !== null){
                dList.forEach(function(val) { 
                  let idx = list.findIndex((x) => x.pid === val.pid);
                  let total = parseFloat(qty) * parseFloat(val.qty)
                  if(idx === -1){ 
                    let ptotal = 0
                    let pidx = pList.findIndex((x) => x.id === val.pid);
                    if(pidx !== -1){ 
                      ptotal = pList[pidx].total
                    }

                    let temp = {
                      pid: val.pid,
                      pname: val.pname,
                      unit: val.unit,
                      qty: total,
                      total: ptotal
                    }
                    list.push(temp)
                  } else {
                    list[idx].qty =  list[idx].qty + total
                  }    
                });                
              } else {
                let nList = { id: k.product_id, name: k.product_name }
                nonList.push(nList)

              }          
            });
            _this.setState({ tempList: list, loading: false, nonList: nonList, nstate: 'Y'   });
          } else if (results.data.status === '204') {
            _this.setState({ tempList: [] , loading: false, nonList: [], nstate: 'N' });
          }
        });
      });
    });
  }




}


