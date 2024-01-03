import React from 'react';
import moment from 'moment';
import ContentHeader from '../../components/common/ContentHeader';  
import ConfirmStore from '../../components/common/ConfirmStore'; 
import StoreReportDetail from '../../components/store/StoreReportDetail'; 
import BReciveForm from '../../components/store/BReciveForm';
import ReciveA4 from '../../components/store/ReciveA4';

import {getBRecives, getBReciveDetail} from '../../utils/StoreBAPI';
import {getProductSets} from '../../utils/ProductAPI';

const initialState = {
  loading: false, isViews: 'LIST', tempList: [],  productList: [], data: []
};
const curent_date = moment().format('YY-MM-DD');

export default class BRecivePage extends React.Component {

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
    this.setState({ isViews: 'FORM', data: [] });    
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
        <td>{data.typ_name}</td> 
        <td>{data.sup_name}</td> 
        <td>{data.mem}</td> 
      </tr>
    )



    return (
    <div>
      {
        item.isViews !== 'PRINT' ?
        <ContentHeader title="คลังสินค้า" small="รับเข้าคลัง" >
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
                              <input type="text" className="form-control" id="date" name="date" ref="date" placeholder="วันที่" autoComplete="off" />
                            </div>
                  </div>
                  <div className="col-sm-4">
                            <div className="form-group">
                              <input type="text" className="form-control" id="date1" name="date1" ref="date1" placeholder="ถึงวันที่" autoComplete="off"/>
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
                  <i className="fa fa-plus"></i> รับเข้าคลัง
                </button>
               
              </div>          
            </div>
            <div className="box-body min-300">    
              
              <table id="mytable" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>#</th>      
                    <th>วันที่</th> 
                    <th>เลขที่</th>              
                    <th>ประเภท</th> 
                    <th>รับจาก</th>
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
                              <small>ไม่มีรายการรับสินค้าเข้าคลัง!!</small>
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
      <BReciveForm 
        products={item.productList}
        onSave={this.handleSaveResult.bind(this)}
        onReset={this.handleReset.bind(this)} />
      : null
      }

      {
      item.isViews === 'VIEWS' ?
      <div>
        <StoreReportDetail 
          mode={'I'}
          data={item.data.data} 
          dList={item.data.dList}  
          onPrint={this.handlePrint.bind(this)} />
        <div className="printable"  id="printlist" >   
          <ReciveA4 
            mode={'IN'}
            title={'ใบรับเข้าคลัง'}
            data={item.data}           
            onReset={this.handleReset.bind(this)} />
        </div>
      </div>
      : null
      }

      {
      item.isViews === 'PRINT' ?
      <div>
        <ConfirmStore
          mode={'IN'}
          onPrint={this.handlePrint.bind(this)} 
          onReset={this.handleReset.bind(this)} />  
        <div className="printable"  id="printlist" >   
          <ReciveA4 
            mode={'IN'}
            title={'ใบรับเข้าคลัง'}
            data={item.data}           
            onReset={this.handleReset.bind(this)} />
        </div>
      </div>
      : null
      }



    </div>
    );
  }

  //
  getDatas (sdat,edat) { 
    let _this = this;    
    getBRecives(sdat,edat)
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
    getProductSets('ALL','Y')
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
    getBReciveDetail(ino)
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


