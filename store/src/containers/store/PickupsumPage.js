import React from 'react';
import moment from 'moment';
import ContentHeader from '../../components/common/ContentHeader';  
import ConfirmStore from '../../components/common/ConfirmStore'; 


import {getPickupProducts, getPickupDetail} from '../../utils/StoreAPI';
import {getmsLocations} from '../../utils/CompanyAPI';

const initialState = {
  loading: false, isViews: 'LIST', tempList: [],  productList: [], data: [], locations:[], cn: 'ALL',
};
const curent_date = moment().format('YYY-MM-DD');

export default class PickupsumPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {
    let _this = this;   
    getmsLocations('2')
    .then(function(results) {
      console.log(results)
      let list = []
      if (results.data.status === '200') {
        list = results.data.data
      }
      _this.setState({ locations: list , loading: false });
    });
    this.getDatas('ALL');    
  }

  handleLtChange (e) {
    e.preventDefault();
    this.setState({cn: this.refs.cn.value },()=>{
      this.getDatas(this.refs.cn.value);  
    });  
      
  }



  render() {
    const item = this.state;
    const list =  item.tempList.map((data,i) =>
      <tr key={i} > 
        <td>{i+1}</td>   
        <td>{data.product_id}</td>       
        <td>{data.product_name}</td>    
        <td>{data.total.toLocaleString('en-US', {minimumFractionDigits: 0})}</td> 
        <td>{data.unit}</td>
 
      </tr>
    )

    let createLT = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 


    return (
    <div>
      {
        item.isViews !== 'PRINT' ?
        <ContentHeader title="โรงงาน" small="รายการเบิกสินค้าจากสาขา" >
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

              <div className="col-xs-6 col-sm-9">
                <div className="row">
                  <div className="col-sm-4">
                      <div className="form-group">
                        <label  className="col-sm-4 control-label" >สาขา </label>
                        <div className="col-sm-8">                  
                        <select className="form-control" id="cn"  ref="cn" value={item.cn} onChange={this.handleLtChange.bind(this)}    > 
                              <option value="ALL">ทั้งหมด</option>                        
                              {item.locations.map(createLT)}     
                          </select>              
                        </div>                               

                      </div>
                  </div>
                        
   
                                
                </div>
              </div>
       
            </div>
            <div className="box-body min-300">    
              
              <table id="mytable" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th width='50'>#</th>      
                    <th width='150'>รหัส</th> 
                    <th>ชื่อสินค้า</th> 
                    <th width='150'>จำนวน</th>                  
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
                              <small>ไม่มีรายการส่งสินค้า!!</small>
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



    </div>
    );
  }
  //







  getDatas (cn) { 
    let _this = this;    
    getPickupProducts(cn)
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


