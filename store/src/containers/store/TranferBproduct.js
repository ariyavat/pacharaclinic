import React from 'react';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ContentHeader from '../../components/common/ContentHeader';  
import ConfirmStore from '../../components/common/ConfirmStore'; 
import TranferDetail from '../../components/store/TranferDetail';
import TrnA4 from '../../components/store/TrnA4';

import {getTranfers, getTranfer, getTranfersBProduct } from '../../utils/StoreAPI';


const initialState = {
  loading: false, isViews: 'LIST', tempList: [],  productList: [], data: []
};
const curent_date = moment().format('Y-MM-DD');



export default class TranferBproduct extends React.Component {

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
        this.setState({  loading: true },()=>{  this.getDatas(sdate,edate); })
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
      <tr key={i} > 
        <td>{i+1}</td>   
       
        <td>{data.id}</td>    
        <td>{data.name}</td> 
        <td>{data.qty}</td> 
        <td>{data.unit}</td>  
      </tr>
    )


    return (
    <div>
     
        <ContentHeader title="โรงงาน" small="สรุปการใช้วัตถุดิบออกจากคลัง" >

        </ContentHeader>  
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
                              <input type="text" className="form-control" id="date1" name="date1" ref="date1" placeholder="ถึงวันที่" autoComplete="off" />
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

                  {
                    item.tempList.length > 0 ?
                      
                            <ReactHTMLTableToExcel
                                  id="test-table-xls-button"
                                  className="btn btn-fault pull-right"
                                  table="mytable"
                                  filename="rep_out_stock"
                                  sheet="tablexls"
                                  buttonText="Download as XLS"
                                />            
                   
                    : null
                  }

               </div>          
            </div>
            <div className="box-body min-300">    
              
              <table id="mytable" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>#</th>      
                    <th>รหัสวัตถุดิบ</th> 
                    <th>ชื่อวัตถุดิบ</th> 
                    <th>จำนวน</th>  
                    <th>หน่วย</th>                                  
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
                              <small>ไม่มีรายการจ่ายวัตถุดิบ!!</small>
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



    </div>
    );
  }
  //
  getDatas (sdat,edat) { 
    let _this = this;    
    getTranfersBProduct(sdat,edat)
    .then(function(results) {
      console.log(results)
      if (results.data.status === '200') {
        _this.setState({ tempList: results.data.data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: [] , loading: false });
      }
    });
  }




}


