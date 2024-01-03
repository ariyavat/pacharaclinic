import React from 'react';
import moment from 'moment';
import ContentHeader from '../../components/common/ContentHeader';  
import ConfirmStore from '../../components/common/ConfirmStore'; 
import PoDetail from '../../components/store/PoDetail'; 
import PoForm from '../../components/store/PoForm';
import PoA4 from '../../components/store/PoA4';

import {getPos, getPoDetail, getPickupProducts} from '../../utils/StoreAPI';
import {getProducts, serchProducts} from '../../utils/ProductAPI';



const curent_date = moment().format('YY-MM-DD');
const initialState = {
  loading: false, isViews: 'LIST', tempList: [],  productList: [], data: [],  pList: [],
  isEdit: false, sdate: curent_date, edate: curent_date, com_name: ''
};


export default class PoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {
    let _this = this;
    $('#date').datepicker({ autoclose: true });
    $('#date1').datepicker({ autoclose: true });
    this.getDatas(curent_date,curent_date);
    this.getProducts();
    this.getPickups();
  }

  handleReset(){   
    this.setState({ isViews: 'LIST' },()=>{
      $('#date').datepicker({ autoclose: true });
      $('#date1').datepicker({ autoclose: true });
      this.getDatas(curent_date,curent_date);
    });
  }

  handleSaveResult(data){   
    this.setState({ isViews: 'PRINT', data: data },()=>{
      $('#date').datepicker({ autoclose: true });
      $('#date1').datepicker({ autoclose: true });
      this.getDatas(curent_date,curent_date);   
    });
    
  }

  handleNew(e){
    e.preventDefault();
    this.setState({ isViews: 'FORM', data: [], isEdit: false });    
  }

  handleShowData(e){
    e.preventDefault()
    if(this.refs.date.value !== ''){
    if(this.refs.date.value !== ''){      
        const date = this.refs.date.value 
        const txt = date.split('/') 
        const sdate = txt[2]+'-'+txt[1]+'-'+txt[0]    
        const date1 = this.refs.date1.value 
        const txt1 = date1.split('/') 
        const edate = txt1[2]+'-'+txt1[1]+'-'+txt1[0] 
        this.setState({  loading: true },()=>{  this.getDatas(sdate,edate);  })
    } else { show_err('warning','ไม่ได้กรอกวันที่สิ้นสุด')  } 
    } else { show_err('warning','ไม่ได้กรอกวันที่')  }
  }


  handleShowDetail(data,e){
    e.preventDefault()
    this.setState({ loading: true },()=>{
      this.getDetail(data.ino, data);     
    });    
  }

  handleEditData(){
    this.setState({ isViews: 'FORM', isEdit: true });  
  }

   handlePrint(){   
    const id = 'printlist'
    printElement(document.getElementById(id))
    window.print()  
    //this.setState({ printList: [] })
  }


  render() {
    const item = this.state;

    const list =  item.tempList.map((data,i) =>
      <tr key={i} className="alink" onClick={this.handleShowDetail.bind(this,data)} > 
        <td>{i+1}</td>   
        <td>{ moment(data.dat).format('DD/MM/YYYY HH:mm') }</td>       
        <td>{data.ino}</td> 
        <td>{data.emp_name}</td> 
        <td>{data.con_name}</td> 
        <td className="text-center">
        {data.status === 'N' ? <span>สั่งซื้อ</span>  : null}
        {data.status === 'C' ? <span className="text-red">ยกเลิก</span>  : null}

        </td> 
        <td>{data.mem}</td> 
      </tr>
    )



    return (
    <div>
      {
        item.isViews !== 'PRINT' ?
        <ContentHeader title="โรงงาน" small="ใบสั่งซื้อ" >
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
            <div className="box-header" >
              <div className="col-xs-9 col-sm-9">
                <div className="row">
                  <div className="col-sm-4">
                            <div className="form-group">
                              <input type="text" className="form-control" id="date" name="date" ref="date" placeholder="วันที่" autoComplete="off"/>
                            </div>
                  </div>
                  <div className="col-sm-4">
                            <div className="form-group">
                              <input type="text" className="form-control" id="date1" name="date1" ref="date1" placeholder="ถึงวันที่"  autoComplete="off"/>
                            </div>
                  </div>                
                  <div className="col-sm-2">
                    <button type="button" className="btn btn-default" onClick={this.handleShowData.bind(this)} >
                      <i className="fa fa-search"></i> แสดงข้อมูล
                    </button>                 
                  </div>
                                
                </div>
              </div>
              <div className="col-xs-3 col-sm-3">
                <button className="btn btn-flat btn-default pull-right" onClick={this.handleNew.bind(this)} >
                  <i className="fa fa-plus"></i> ใบสั่งซื้อ
                </button>
               
              </div>          
            </div>
            <div className="box-body min-300">    
              
              <table id="mytable" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th width='40'>#</th>      
                    <th width='150'>วันที่</th> 
                    <th width='150'>เลขที่</th>              
                    <th width='200'>ผู้ขออณุมัติ</th> 
                    <th width='250'>ผู้อณุมัติ</th>
                    <th width='100'>สถานะ</th>
                    <th>หมายเหตุ</th>                                     
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
                              <small>ไม่มีรายการขอซื้อ!!</small>
                        </div>                          
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

      {
      item.isViews === 'FORM' ?
      <PoForm 
        isEdit={item.isEdit}
        data={item.data}
        pList={item.pList}
        products={item.productList}
        onEdit={this.handleReset.bind(this)}
        onSave={this.handleSaveResult.bind(this)}
        onReset={this.handleReset.bind(this)} />
      : null
      }

      {
      item.isViews === 'VIEWS' ?
      <div>
        <PoDetail          
          data={item.data.data} 
          dList={item.data.dList}  
          onEdit={this.handleEditData.bind(this)}
          onPrint={this.handlePrint.bind(this)} />
        <div className="printable"  id="printlist" >   
          <PoA4   
            data={item.data.data}    
            dList={item.data.dList}        
            onReset={this.handleReset.bind(this)} />
        </div>
      </div>
      : null
      }

      {
      item.isViews === 'PRINT' ?
      <div>
        <ConfirmStore
          mode={'PO'}
          onPrint={this.handlePrint.bind(this)} 
          onReset={this.handleReset.bind(this)} />  
        <div className="printable"  id="printlist" >   
          <PoA4    
            data={item.data}    
            dList={item.data.dList}        
            onReset={this.handleReset.bind(this)} />
        </div>
      </div>
      : null
      }



    </div>
    );
  }
  //

  getPickups () { 
    let _this = this;    
 
      serchProducts('ALL','ALL', 1, 1000, '')
      .then(function(results) {  
        let pList =  []       
        if (results.data.status === '200') {
          pList = results.data.data       
        }  
        getPickupProducts()
        .then(function(results) {
          if (results.data.status === '200') {
            let list = []
            let data = results.data.data       
            data.forEach(function(k) {   
              let qty = k.total
              let dList = k.detail
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
            });
            _this.setState({ pList: list, loading: false  });
          } else if (results.data.status === '204') {
            _this.setState({ pList: [] , loading: false });
          }
        });
      });
   
  }




  getDatas (sdat,edat) { 
    let _this = this;    
    getPos('WAIT',sdat,edat)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({ tempList: results.data.data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: [] , loading: false });
      }
    });


  }

  getProducts () {
    let _this = this;
    getProducts('ALL','Y')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({ productList: results.data.data });
      } else if (results.data.status === '204') {
        _this.setState({ productList: []});
      }
    }); 
  }


  getDetail (ino, data) { 
    let _this = this;
    let newData = {
      data: data,
      dList: []
    }
    getPoDetail(ino)
    .then(function(results) {
      if (results.data.status === '200') {
        newData.dList = results.data.data;       
        _this.setState({ dList: results.data.data, loading: false, isViews: 'VIEWS', data: newData  });
      } else if (results.data.status === '204') {
        _this.setState({ dList: [] , loading: false, isViews: 'VIEWS', data: [] });
      }
    });        
 

 


  }


}

