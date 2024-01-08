import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import VdoList from '../../components/vdo/VdoList';
import VdoForm from '../../components/vdo/VdoForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getVdos , createVdo, deleteVdo} from '../../utils/VdoAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
const imgURL = `${config.init.web_url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], delData: []
};


export default class VdoPage extends React.Component {

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

  	//if(data.typ === 'Y'){
	    const _this = this;
      /*
		const temp = {
			id: data.id, dat: data.dat, typ: data.typ, name: data.name, 
		};        
		this.saveData(temp);   		
  	} else {
      */
	    if (data.uploadedFile.file !== null) {    
	      this.setState({loading: true}, () => {
	        this.handleImageUpload(data.uploadedFile, data);
	      });
	    } else {
	    	show_err('warning','ยังไม่ได้เลือกรูปภาพ/VDO') 
	    }
  	//}


  }

  handleDelete (data) {
  	//console.log(data)
    this.setState({isView: 'DELETE', delData: data});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      let data = {id: this.state.delData.id} ;

      if(this.state.delData.typ === 'Y'){


      	_this.deleteData(data);      	
      } else {
        let temp_data = {
          name: this.state.delData.name,
          mode: 'vdo',
        };
        deleteimage(temp_data)
          .then(function(response) {
            _this.deleteData(data);
          });

      }

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
        <ContentHeader title="VDO" small={title} >
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
            <VdoList
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
            <VdoForm
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
              mode='DELETE'
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }


  
      </div>
    );
  }

  //
  getDatas (mode) {
    let _this = this; 
    getVdos('ALL','C')
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data,isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }


  handleImageUpload (file, newData) {
    let _this = this;  
    let txt = file.img.split(".");
    const imgName = uuid.v1()+'.'+txt[1];
    newData.img = imgName;
    if (file.edit_img === 'Y') {

      $.get(imgURL+file.oimg)
        .done(function() { 
          let data = {
            name: file.oimg,
            mode: 'vdo',
          };
          deleteimage(data)
            .then(function(response) {   });
        }).fail(function() { 
            //
        })



    }
    let data = {
      img: file.imagePreviewUrl,
      name: file.img,
      mode: 'vdo',
      newImg: imgName,
      edit_img: file.edit_img,
    };
    uploadimage(data)
      .then(function(response) {
 
        _this.newSaveData(newData);
      });
  }

  newSaveData (data) {
    const _this = this;
	const temp = {
		id: data.id, mode:'C', dat: data.dat, typ: data.typ, name: data.img, title: data.title, detail: data.detail,
	};        
	this.saveData(temp);      
   
  }

  saveData (data) {

   // const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
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
    	console.log(results)
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas('ALL');  
      }
    });
  }


}
