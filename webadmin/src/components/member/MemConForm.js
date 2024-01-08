import React, {Component} from 'react';
import moment from 'moment';
import OrderStatus from '../common/OrderStatus';


import * as config from '../../config';
const imgURL = `${config.init.web_url}images/slip/`;


export default class MemConForm extends Component {

  constructor(props) {
    super(props);
    this.state = {  ems: '', status: '', send_status: '', send_date: '', }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {

   // this.setState({data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    //
  }

  handleSaveData (e) {
    e.preventDefault();    
    this.props.onSave();    
  }


  render() {
    const item = this.state
    const {data} = this.props;  
    let img =  imgURL+data.slip;

  	return (
    <section className="content">
      <div className="box box-info min-650" >  
      	<div className="box-body min-650">  
      		<div className="row">


	          <div className="col-xs-12 col-sm-6 col-sm-offset-3">

	            <div className="row">
	              <div className="col-xs-5 col-sm-2"><h4 className="modal-title">ชื่อลูกค้า</h4></div>
	              <div className="col-xs-7 col-sm-4"><h4 className="modal-title">{data.fullname}</h4></div>
	              
	            </div>

	            <div className="row mgt-20">
	               <div className="col-xs-5 col-sm-2"><h4 className="modal-title">ยอดโอน</h4></div>
	               <div className="col-xs-7 col-sm-4"><h4 className="modal-title"><span className="text-blue">{parseFloat(data.mem_payment).toLocaleString('en-US', {minimumFractionDigits: 0})}</span> บาท</h4></div>                
	            </div>

	            <div className="row">
	              <div className="col-xs-5 col-sm-2"><h4 className="modal-title">วันที่โอน</h4></div>
	              <div className="col-xs-7 col-sm-4"><h4 className="modal-title">{data.mem_paydate}</h4></div>
	              
	            </div>

	            <div className="row">
	              <div className="col-xs-5 col-sm-2"><h4 className="modal-title">เวลาที่โอน</h4></div>
	              <div className="col-xs-7 col-sm-4"><h4 className="modal-title">{data.mem_paytime}</h4></div>
	              
	            </div>

              <div className="row mgt-10">
                <div className="col-sm-6">
                 <h2>SLIP การโอน</h2>
                
                  <img  className="img-responsive img-thumbnail" src={img} /> 
              
                 


                </div>
              </div> 





	            <div className="row mgt-20">
	              <div className="col-xs-5 col-sm-2"></div>
	              <div className="col-xs-7 col-sm-4">
	                <a className="btn btn-app pull-right" onClick={this.handleSaveData.bind(this)} >
	                  <i className="fa fa-save"></i> ยืนยันการสมัครสมาชิก
	                </a>
	              </div>
	            </div>


	    
	          </div>

      		</div>
      	</div>


      </div>
    </section>   
  	);
  }

}


