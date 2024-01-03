import React from 'react';
import moment from 'moment';
import ContentHeader from '../../components/common/ContentHeader';  
import ConfirmStore from '../../components/common/ConfirmStore'; 
import PickupWaitForm from '../../components/store/PickupWaitForm';
//import PickupA4 from '../../components/store/PickupA4';

import {getPickups, getPickupDetail} from '../../utils/StoreAPI';


const initialState = {
  loading: false, isViews: 'LIST', tempList: [],  productList: [], data: []
};
const curent_date = moment().format('YYY-MM-DD');

export default class PickupWaitPage extends React.Component {

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
    this.getDatas('-','-');
    
  }

  handleReset(){   
    this.setState({ isViews: 'LIST' },()=>{ 
      this.getDatas('-','-');
    });
  }

  handleSaveResult(){   
   this.setState({ isViews: 'LIST' },()=>{  
      this.getDatas('-','-');   
    });
    
  }

  handleNew(e){
    e.preventDefault();
    this.setState({ isViews: 'FORM', data: [] });    
  }


  handleShowDetail(data,e){
    console.log(data)
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
        <td>{data.location_name}</td>  
        <td>{data.emp_name}</td> 
        <td>{data.mem}</td>
        <td>
			{data.status === 'N' ? <span>รอตรวจสอบ</span>  : null}
			{data.status === 'C' ? <span>รอจัดส่ง</span>  : null}
			{data.status === 'Y' ? <span>จดส่งแล้ว </span>  : null}
        </td>  
      </tr>
    )


    return (
    <div>
      {
        item.isViews !== 'PRINT' ?
        <ContentHeader title="Back Office" small="รายการเบิกสินค้ารอส่ง" >
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
                    <th>#</th>      
                    <th>วันที่</th> 
                    <th>เลขที่</th> 
                    <th>สาขา</th> 
                    <th>พนักงาน</th>                  
                    <th>หมายเหตุ</th>  
                    <th width='100'>สถานะ</th>                                    
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
                              <small>ไม่มีรายการเบิกสินค้า!!</small>
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
      	<PickupWaitForm 
      	    mode='CON'
      	    data={item.data}  
      		onSave={this.handleSaveResult.bind(this)}
      		onReset={this.handleReset.bind(this)}  />
      	: null
      }



    </div>
    );
  }
  //
  getDatas (sdat,edat) { 
    let _this = this;    
    getPickups('CONFIRM',sdat,edat)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({ tempList: results.data.data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: [] , loading: false });
      }
    });
  }


  getDetail (ino, data) { 
    let _this = this;
    let newData = {
      data: data,
      dList: []
    }    
    getPickupDetail(ino)
    .then(function(results) {
     
      if (results.data.status === '200') {
        newData.dList = results.data.data;       
        _this.setState({ dList: results.data.data, loading: false, isViews: 'FORM', data: newData  });
      } else if (results.data.status === '204') {
        _this.setState({ dList: [] , loading: false, isViews: 'FORM', data: [] });
      }
    });
  }


}


