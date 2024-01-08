import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import FlashList from '../../components/flash/FlashList';
import FlashForm from '../../components/flash/FlashForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getFlash, getFlashs , createFlash, updateFlash, deleteFlash } from '../../utils/FlashAPI';
import {getMsProduct, getMsService } from '../../utils/ProductAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], msProductList: [],  dat: '-',
};


export default class FlashSalePage extends React.Component {

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
    this.getProductList();
    this.getDatas('ADMIN');

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
        this.handleImageUpload(data.uploadedFile, data);
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
      if (this.state.data.img !== null && this.state.data.img !== 'NO') {
        let temp_data = {
          name: this.state.data.img,
          mode: 'flash',
        };
        deleteimage(temp_data)
          .then(function(response) {
            _this.deleteData(data);
          });
      } else {
        this.deleteData(data);
      }
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'รายการทั้งหมด';
    switch (item.isView) {
      case 'LIST' : title = 'รายการทั้งหมด'; break;
      case 'VIEW' : title = 'รายละเอียดสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="Flash Sale" small={title} >
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
            <FlashList
              data={item.products}  
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <FlashForm   
              loading={item.loading}
              productList={item.msProductList}       
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
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }


  
      </div>
    );
  }

  //
  getProductList(){
    let _this = this
    getMsProduct()
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({msProductList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({msProductList: []});
      }
    });
  }


  getDatas (mode) {
    let _this = this; 
    getFlashs(mode,this.state.dat)
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
            mode: 'flash',
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
      mode: 'flash',
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
    if (this.state.isEdit === true) {
      const temp = {
        pname: data.pname,  unit: data.unit, img: data.img, price_sale: data.price_sale, 
        price_total: data.price_total, discount: data.discount, dat: data.dat,  
        start_time: data.start_time, end_time: data.end_time, 
        title: data.title, con: data.con, send: data.send, detail: data.detail,
      };
   
      const newData = {data: temp, id: data.id };
      this.updateData(newData);
    } else {
      const temp = {
        id: data.id, typ: data.typ, pid: data.pid, pname: data.pname,  unit: data.unit, price_sale: data.price_sale, 
        price_total: data.price_total, discount: data.discount, dat: data.dat,  start_time: data.start_time, end_time: data.end_time, 
        title: data.title, con: data.con, send: data.send, detail: data.detail, img: data.img,
      };        
      this.saveData(temp);
      
    }
  }

  saveData (data) { 
    let _this = this; 
    createFlash(data)
    .then(function(results) {
      if (results.data.status === '201') {    
        show_err('success','บันทึกข้อมูลเรียบร้อย') 
        _this.getDatas('ADMIN');          
      } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ')         
      }
    });
 
  }

  updateData (data) {
    let _this = this;
    updateFlash(data)
    .then(function(results) {
     
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas('ADMIN');
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
    let delData = {
      id: data.id,
      typ: 'product'
    }
  
    deleteFlash(delData)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas('ADMIN');  
      }
    });
  }


}
