import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import ContactList from '../../components/contact/ContactList';
import ContactForm from '../../components/contact/ContactForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getContacts , createContact, updateContact, deleteContact} from '../../utils/ContactAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
//const imgURL = `${config.init.url}images/contacts/`;
const imgURL = `${config.init.web_url}images/contacts/`;


const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [],
};


export default class ContactPage extends React.Component {

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

  handleEdit (data) {    
    this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});
  }

  handleView (data) {
    
    this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData (data) {

    if (data.uploadedFile.file !== null) {    
      this.setState({loading: true}, () => {
        this.handleImageUpload(data);
      });
    } else {
      this.newSaveData(data);
    }
 
  }

  handleDelete () {
    this.setState({isView: 'DELETE'});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      let data = {id: this.state.data.id} ;
      //if (this.state.data.img !== null && this.state.data.img !== 'NO') {

        let temp_data = {
          name: this.state.data.img,
          mode: 'contacts',
        };
        deleteimage(temp_data);

        temp_data = {
          name: this.state.data.map,
          mode: 'contacts',
        };
        deleteimage(temp_data)
        .then(function(response) {
          _this.deleteData(data);
        });

        temp_data = {
          name: this.state.data.img_line,
          mode: 'contacts',
        };
        deleteimage(temp_data)
        .then(function(response) {
          //_this.deleteData(data);
        });

        temp_data = {
          name: this.state.data.img_fb,
          mode: 'contacts',
        };
        deleteimage(temp_data)
        .then(function(response) {
          //_this.deleteData(data);
        });



     // } else {
      //  this.deleteData(data);
      //}
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'รายการสาขา';
    switch (item.isView) {
      case 'LIST' : title = 'รายการทั้งหมด'; break;
      case 'VIEW' : title = 'รายละเอียดสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="Contact" small={title} >
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
            <ContactList
              data={item.products}              
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <ContactForm
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
  getDatas () {
    let _this = this; 
    getContacts()
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data,isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }


  handleImageUpload (newData) {

    let _this = this;  
    const file = newData.uploadedFile
    const map = newData.uploadedMap
    const img_line = newData.uploadedLine
    const img_fb = newData.uploadedFb

    let txt = file.img.split(".");
    const imgName = 'CL'+uuid.v1()+'.'+txt[1];

    let txt1 = map.img.split(".");
    const imgMapName = 'MAP'+uuid.v1()+'.'+txt1[1];

    let txt2 = img_line.img.split(".");
    const imgLineName = 'LINE'+uuid.v1()+'.'+txt2[1];


    let txt3 = img_fb.img.split(".");
    const imgFbName = 'FB'+uuid.v1()+'.'+txt3[1];


    newData.img = imgName;
    newData.map = imgMapName;
    newData.img_line = imgLineName;
    newData.img_fb = imgFbName;


    if (file.edit_img === 'Y') {
      $.get(imgURL+file.oimg)
        .done(function() { 
          let data = {
            name: file.oimg,
            mode: 'contacts',
          };
          deleteimage(data)         
        })
    }

    if (map.edit_img === 'Y') {
      $.get(imgURL+map.oimg)
        .done(function() { 
          let data = {
            name: map.oimg,
            mode: 'contacts',
          };
          deleteimage(data)         
        })
    }


    if (img_line.edit_img === 'Y') {
      $.get(imgURL+img_line.oimg)
        .done(function() { 
          let data = {
            name: img_line.oimg,
            mode: 'contacts',
          };
          deleteimage(data)         
        })
    }

    if (img_fb.edit_img === 'Y') {
      $.get(imgURL+img_fb.oimg)
        .done(function() { 
          let data = {
            name: img_fb.oimg,
            mode: 'contacts',
          };
          deleteimage(data)         
        })
    }




    let data = {
      img: file.imagePreviewUrl,
      name: file.img,
      mode: 'contacts',
      newImg: imgName,
      edit_img: file.edit_img,
    };
    uploadimage(data)
      .then(function(response) {
	    let mdata = {
	      img: map.imagePreviewUrl,
	      name: map.img,
	      mode: 'contacts',
	      newImg: imgMapName,
	      edit_img: map.edit_img,
	    };
    	uploadimage(mdata)
      	.then(function(response) {

          let linedata = {
            img: img_line.imagePreviewUrl,
            name: img_line.img,
            mode: 'contacts',
            newImg: imgLineName,
            edit_img: img_line.edit_img,
          };
          uploadimage(linedata)
          .then(function(response) {          

              let fbdata = {
                img: img_fb.imagePreviewUrl,
                name: img_fb.img,
                mode: 'contacts',
                newImg: imgFbName,
                edit_img: img_fb.edit_img,
              };
              uploadimage(fbdata)
              .then(function(response) {
                  _this.newSaveData(newData);
              });
          });
      	});
        
    });
     
  }

  newSaveData (data) {

    const _this = this;
    if (this.state.isEdit === true) {
      const temp = {
       name: data.name, address: data.address, 
       tel: data.tel, status: data.status, img: data.img,  map: data.map, img_line: data.img_line, img_fb: data.img_fb  
      };
      const newData = {data: temp, id: data.id};
      this.updateData(newData);
    } else {
      const temp = {
       id: null, name: data.name, address: data.address, 
       tel: data.tel, status: data.status, img: data.img,  map: data.map, img_line: data.img_line, img_fb: data.img_fb     
      };        
      this.saveData(temp);
      
    }
  }

  saveData (data) {
   // const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    let _this = this; 
    createContact(data)
    .then(function(results) {
     console.log(results)
      if (results.data.status === '201') {    
        show_err('success','บันทึกข้อมูลเรียบร้อย') 
        _this.getDatas();          
      } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ')         
      }
    });
 
  }

  updateData (data) {
    let _this = this;
    updateContact(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas();
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
    let delData = {
      id: data.id,
    }
   
    deleteContact(delData)
    .then(function(results) {
      console.log(results)
      if (results.data.status === '200') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas();  
      }
    });
  }


}
