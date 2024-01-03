import React from 'react';
import moment from 'moment';
import Navtabs from '../../components/common/Navtabs'; 
import ContentHeader from '../../components/common/ContentHeader';  
import ConfirmStore from '../../components/common/ConfirmStore'; 
import StoreReportDetail from '../../components/store/StoreReportDetail'; 
import TranferForm from '../../components/store/TranferForm';
import TrnA4 from '../../components/store/TrnA4';

import {getOuts, getOutDetail, getPickups, getPickupDetail, updatePickup} from '../../utils/StoreAPI';
import {getProducts, getProductSets} from '../../utils/ProductAPI';

const initialState = {
  loading: false, isViews: 'LIST', tempList: [],  productList: [], data: [], pickupList: [], pData: [],
  tabs: [
      {title:' จ่ายออก ',mode:''},
      {title:'  ประวัติการร่ายออก  ',mode:''} ,         
  ]
};
const curent_date = moment().format('YYY-MM-DD');

export default class TranferPage extends React.Component {

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
    this.getPickupDatas()
    //this.getDatas(curent_date,curent_date);
    this.getProducts();
  }

  handleReset(){   
    this.setState({ isViews: 'LIST' },()=>{
    	this.getPickupDatas()
      //$('#date').datepicker({ autoclose: true });
      //$('#date1').datepicker({ autoclose: true });
      //this.getDatas(curent_date,curent_date);
    });
  }

  handleSaveResult(data){   
    this.setState({ isViews: 'PRINT', data: data },()=>{
      $('#date').datepicker({ autoclose: true });
      $('#date1').datepicker({ autoclose: true });
      this.getDatas(curent_date,curent_date);   
    });
    
  }

  handleNew(data,e){
    e.preventDefault();

    let _this = this;
    let newData = {
      data: data,
      dList: []
    }    
    getPickupDetail(data.ino)
    .then(function(results) {    
      if (results.data.status === '200') {
        newData.dList = results.data.data;       
        _this.setState({  isViews: 'FORM', data: [], pData: newData  });
      } 
    });
    
    //this.setState({ isViews: 'FORM', data: [] });    
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

  handleUpdatedata(data,e){
    e.preventDefault()
    const _this = this
    let udata = { data: { status: 'X'}, cn: data.cn , ino: data.ino  }
    updatePickup(udata)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','ยกเลิกรายการแล้ว..') 
        _this.getPickupDatas()
      } else  {
          show_err('warning',results.message) 
      }
    });
  }

   handlePrint(){   
    const id = 'printlist'
    printElement(document.getElementById(id))
    window.print()  
    //this.setState({ printList: [] })
  }


  render() {
    const item = this.state;
    const plist =  item.pickupList.map((data,i) =>
      <tr key={i} className="alink"  > 
        <td>{i+1}</td>   
        <td onClick={this.handleNew.bind(this,data)}>{ moment(data.dat).format('DD/MM/YYYY HH:mm') }</td>       
        <td onClick={this.handleNew.bind(this,data)}>{data.ino}</td>   
        <td onClick={this.handleNew.bind(this,data)}>{data.location_name}</td> 
        <td onClick={this.handleNew.bind(this,data)}>{data.emp_name}</td> 
        <td onClick={this.handleNew.bind(this,data)}>{data.mem}</td>
        <td className="text-center" onClick={this.handleUpdatedata.bind(this,data)}>
              <a className="text-red dblock alink"  >
                <i className="fa fa-remove"></i> ยกเลิก
              </a>
        </td>
  
      </tr>
    )


    return (
    <div>
      {
        item.isViews !== 'PRINT' ?
        <ContentHeader title="คลังวัตถุดิบ" small="โอนสินค้า" >
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
                            <th width="50">#</th>      
                            <th width="150">วันที่</th> 
                            <th width="150">เลขที่</th> 
                            <th width="150">สาขาที่เบิก</th> 
                            <th width="250">พนักงาน</th>                  
                            <th>หมายเหตุ</th>  
                            <th width="90"></th>                             
                          </tr>
                          </thead>
                          <tbody>
                          {plist}
                          </tbody>
                      </table>
		              {
		                  item.pickupList.length === 0 ?
		                  <div className="row">
		                    <div className="col-sm-12 text-center pad-bottom-50">
		                        <div className="dblock mgt-100">       
		                              <small>ไม่มีรายการจ่ายออกจากคลัง!!</small>
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
      <TranferForm 
        pData={item.pData}
        products={item.productList}
        onSave={this.handleSaveResult.bind(this)}
        onReset={this.handleReset.bind(this)} />
      : null
      }

      {
      item.isViews === 'VIEWS' ?
      <div>
        <StoreReportDetail 
          mode={'O'}
          data={item.data.data} 
          dList={item.data.dList}  
          onPrint={this.handlePrint.bind(this)} />
        <div className="printable"  id="printlist" >   
          <TrnA4   
            data={item.data}     
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
          mode={'TRN'}
          onPrint={this.handlePrint.bind(this)} 
          onReset={this.handleReset.bind(this)}/>  
        <div className="printable"  id="printlist" >   
          <TrnA4 
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

  getPickupDatas () { 
    let _this = this;    
    getPickups('CONFIRM','-','-')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({ pickupList: results.data.data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ pickupList: [] , loading: false });
      }
    });
  }



  getDatas (sdat,edat) { 
    let _this = this;    
    getOuts(sdat,edat)
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
    getProductSets()
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
    getOutDetail(ino)
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


