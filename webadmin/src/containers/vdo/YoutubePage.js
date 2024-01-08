import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import YouList from '../../components/vdo/YouList';
import YouForm from '../../components/vdo/YouForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getVdos , createVdo, deleteVdo} from '../../utils/VdoAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
const imgURL = `${config.init.we_url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], delData: []
};


export default class YoutubePage extends React.Component {

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
    this.getDatas('ALL');

  }

  handleNewForm (e) {  
    this.setState({isView: 'FORM', isEdit: false, data: [], loading: false });
  }

  handleEdit (data) {
    this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});
  }

  handleView (data) {
    this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData (data) {

    if (data.name !== '') {    
	    const _this = this;
		const temp = {
			id: data.id, mode:'Y', dat: data.dat, typ: data.typ, name: data.name,  detail: data.detail
		};        
		this.saveData(temp);
    } else {
    	show_err('warning','ยังไม่ได้กรอก URL Youtube') 
    }

  }

  handleDelete (data) {
  	//console.log(data)
    this.setState({isView: 'DELETE', delData: data});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      let data = {id: this.state.delData.id} ;
      this.deleteData(data);  
    } else {
      this.setState({isView: 'LIST'});
      this.getDatas('ALL');
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'รายการสินค้า';
    switch (item.isView) {
      case 'LIST' : title = 'รายการทั้งหมด'; break;
      case 'VIEW' : title = 'รายละเอียดสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="YOUTUBE" small={title} >
        {
          item.isView === 'VIEW' ?
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
            <YouList
              data={item.products}              
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
              onDelete={this.handleDelete.bind(this)}
    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <YouForm
              loading={item.loading}             
              onReset={this.reset.bind(this)}
              onSave={this.handleSaveData.bind(this)}
              onDelete={this.handleDelete.bind(this)}             
              isEdit={this.state.isEdit}
              data={item.data}
         
            />
            : null
        }

        {
          this.state.isView === 'DELETE' ?
            <ConfirmBox
              mode="DELETE"
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }
  
      </div>
    );
  }

  //
  getDatas (mode) {
    let _this = this; 
    getVdos('ALL','Y')
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data,isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }

  saveData (data) {  
    let _this = this; 
    createVdo(data)
    .then(function(results) {
     console.log(results)
      if (results.data.status === '201') {    
        show_err('success','บันทึกข้อมูลเรียบร้อย') 
        _this.getDatas('ALL');          
      } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ')         
      }
    }); 
  }

  deleteData (data) {
    let _this = this;
    let delData = {
      id: data.id,
    }
   
    deleteVdo(delData)
    .then(function(results) {    	
      if (results.data.status === '200') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas('ALL');  
      }
    });
  }


}
