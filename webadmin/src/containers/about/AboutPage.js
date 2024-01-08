import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import AboutList from '../../components/about/AboutList';
import AboutForm from '../../components/about/AboutForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getAbouts , createAbout, updateAbout, deleteAbout} from '../../utils/AboutAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
//const imgURL = `${config.init.url}images/contacts/`;
const imgURL = `${config.init.web_url}images/contacts/`;


const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [],
};


export default class AboutPage extends React.Component {

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
      this.deleteData(data);

      /*
      if (this.state.data.img !== null && this.state.data.img !== 'NO') {

        let temp_data = {
          name: this.state.data.img,
          mode: 'abouts',
        };
        deleteimage(temp_data);



      } else {
       this.deleteData(data);
      }
      */
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'รายการทั้งหมด ';
    switch (item.isView) {
      case 'LIST' : title = 'รายการทั้งหมด'; break;
      case 'VIEW' : title = 'รายละเอียดสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="Abouts" small={title} >
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
            <AboutList
              data={item.products}              
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <AboutForm
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
    getAbouts()
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
    let txt = file.img.split(".");
    const imgName = 'DCT'+uuid.v1()+'.'+txt[1];


    newData.img = imgName;
    if (file.edit_img === 'Y') {
      $.get(imgURL+file.oimg)
        .done(function() { 
          let data = {
            name: file.oimg,
            mode: 'abouts',
          };
          deleteimage(data)         
        })
    }

    console.log(newData)

    let data = {
      img: file.imagePreviewUrl,
      name: file.img,
      mode: 'abouts',
      newImg: imgName,
      edit_img: file.edit_img,
    };
    uploadimage(data)
      .then(function(response) {
       // console.log('xxx',response)
	    _this.newSaveData(newData); 
        
    });
     
  }

  newSaveData (data) {

    const _this = this;
    if (this.state.isEdit === true) {
      const temp = {
       dname: data.dname, sname: data.sname, detail: data.detail,  img: data.img,  
      };
      const newData = {data: temp, id: data.id};
      this.updateData(newData);
    } else {
      const temp = {
       id: null, dname: data.dname, sname: data.sname, detail: data.detail,  img: data.img,   
      };        
      this.saveData(temp);
      
    }
  }

  saveData (data) {
   // const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    let _this = this; 
    createAbout(data)
    .then(function(results) {
     
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
    updateAbout(data)
    .then(function(results) {
      console.log('UPDATE',results)
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
   
    deleteAbout(delData)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas();  
      }
    });
  }


}
