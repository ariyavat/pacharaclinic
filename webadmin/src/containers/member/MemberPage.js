import React from 'react';
import moment from 'moment';
import axios from 'axios';
import uuid from 'uuid';
import MemberList from '../../components/member/MemberList';
import MemConForm from '../../components/member/MemConForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getCustomerMemPay, updateCustomer, createCustomerMS } from '../../utils/CustomerAPI';
import {getAutonumber, getAutonumberID, setAutonumber} from '../../utils/AutonumberAPI';

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [],  autonumber: 'N', adata: [],
};


export default class MemberPage extends React.Component {

  constructor(props) {
    super(props);
        this.state = initialState;
  }
  reset (e) {
    e.preventDefault();
    this.setState({isView: 'LIST', isEdit: false, data: []});
  }


  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {
    this.getDatas();





  }

  handleNewForm (e) {  
    this.setState({isView: 'FORM', isEdit: false, data: [], loading: false });
  }

  handleEdit (cdata) {

    let _this = this;
    getAutonumber('PT',5)
    .then(function(results) {
      if (results.data.status === '200') {
        let data = results.data.data;
        console.log(cdata,data)
        _this.setState({isView: 'FORM', oView: 'HOME', isEdit: false, data: [], adata: data, autonumber: data.typ, data: cdata, loading: false});
      } else {
        _this.setState({isView: 'FORM', isEdit: false, data: [], adata: [], autonumber: 'N', data: cdata, loading: false});
      }
    });



    //this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});
  }

  handleView (data) {
  	//console.log(data)
    //this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData () {
  	this.setState({isView: 'SAVE'});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
        const {data} = this.state
        let dat = moment().format();
     
	  	const temp = {
		    cn: '5', cname: 'เว็บไซต์', add_date: data.dat, level: 'S',
		    id:'none',title: data.title,fname: data.fname, lname: data.lname, nname: data.nname, fullname: data.fullname, 
		    nationality: data.nationality, idcard: data.idcard, dob: data.dob, sex: 'none',
		    address: data.address, am: data.am, tm: data.tm, food: data.food, color: data.color, 
		    sport: '', hobbies: '', shop: '', spa: '',  
		    province: data.province, zip: data.zip, tel: data.tel,  img: '', 
		    email: data.email, facebook: data.facebook, lineID: data.lineID, status: 'Y', mode: 'Y', mode_date: dat, startdate: dat,
		    occupation: data.occupation, occ_address: data.occ_address,  druge: '', 
	  	};

      	const ttemp = {member: 'MEMBER'};
      	const updateData = {data: ttemp, uid: data.uid};
      
    
	    let newData = getAutonumberID(this.state.adata);
	    temp.id = newData.lastID;
	    setAutonumber(newData.id, newData.maxID)
	    .then(function(results) {
	    	console.log('HH',results)
	      _this.updateData(temp, updateData);
	    });

      //this.updateData(newData);

    
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'แจ้งการสมัครสมาชิก';
    switch (item.isView) {
      case 'LIST' : title = 'แจ้งการสมัครสมาชิก'; break;
      case 'VIEW' : title = 'ข้อมูลการสมัครสมาชิก'; break;
      case 'FORM' : title = 'ข้อมูลการสมัครสมาชิก'; break;
    }
    
    return (
      <div>
        <ContentHeader title="รายการสมัครสมาชิก" small={title} >
        {
          item.isView === 'FORM' ?
          <a onClick={this.handleClosepage.bind(this)}><i className="fa fa-close pull-right hclose"></i> </a>
          : null
        }
        </ContentHeader>

        {
          this.state.isView === 'LOAD' ?
          'LOADING.....' : null
        }

        {
          this.state.isView === 'LIST' ?
            <MemberList   
              mode={'NONE'}       
              data={item.products}              
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <MemConForm
              mode={'PAYMENT'}
              loading={item.loading}
              onReset={this.reset.bind(this)}          
          	  onSave={this.handleSaveData.bind(this)}
              data={item.data}
         
            />
            : null
        }

        {
          this.state.isView === 'SAVE' ?
            <ConfirmBox
              mode={'MEMBER'}
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }


  
      </div>
    );
  }
 //

  getDatas () {
    let _this = this; 
    getCustomerMemPay()
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data,isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }


  updateData (data, udate) {
    let _this = this;

    createCustomerMS(data)
    .then(function(results) {
    	console.log('FF',results)
      if (results.data.status === '201') {

		    updateCustomer(udate)
		    .then(function(results) {
		    console.log('BB',results)
		      if (results.data.status === '200') {		          	 
		        show_err('success','ยืนยันการสัมครสมาชิกเรียบร้อยแล้ว')        
		        _this.getDatas();		    
		      }
		    });    
      }
    });
  }


}
