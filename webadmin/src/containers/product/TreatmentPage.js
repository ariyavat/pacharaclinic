import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import ProductList from '../../components/product/ProductList';
import ProductForm from '../../components/product/ProductForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getMsService, getProduct, getProducts , createProduct, updateProduct, deleteProduct } from '../../utils/ProductAPI';
import {getPgroups} from '../../utils/PgroupAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
//const imgURL = `${config.init.url}images/products/`;
const imgURL = `${config.init.web_url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], msProductList: [], groupList:[]
};


export default class TreatmentPage extends React.Component {

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
    this.getDatas('treatment','ALL');

    let _this = this; 
    getPgroups('T')
    .then(function(results) { 
      if (results.data.status === '200') {
        _this.setState({groupList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({groupList: []});
      }
    });



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
          mode: 'products',
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
    let title = 'รายการสินค้า';
    switch (item.isView) {
      case 'LIST' : title = 'รายการทั้งหมด'; break;
      case 'VIEW' : title = 'รายละเอียดสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="Treatment" small={title} >
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
            <ProductList
              data={item.products}     
              groupList={item.groupList}     
              mode='T'            
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <ProductForm
              mode='T'
              groupList={item.groupList}
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
              mode="DELETE"
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }


  
      </div>
    );
  }

  //
  getProductList(){
    let _this = this
    getMsService('T')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({msProductList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({msProductList: []});
      }
    });
  }


  getDatas (typ,status) {
    let _this = this; 
    getProducts(typ,status)
    .then(function(results) {
      //console.log(results)
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
            mode: 'products',
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
      mode: 'products',
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
        mode: data.mode, product_name: data.product_name,  unit: data.unit, price: data.price, 
        status: data.status, img: data.img, state: data.state,
        title: data.title, con: data.con, send: data.send, detail: data.detail,
      };
      const newData = {data: temp, id: data.id, typ: 'treatment'};
      this.updateData(newData);
    } else {
      const temp = {
        id: data.id, mode: data.mode,  typ: 'treatment', product_name: data.product_name, 
         unit: data.unit, price: data.price, 
        title: data.title, con: data.con, send: data.send, detail: data.detail,
        status: data.status, img: data.img, state: data.state,
      };        
      this.saveData(temp);
      
    }
  }

  saveData (data) {

   // const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    let _this = this;
 
    createProduct(data)
    .then(function(results) {

      if (results.data.status === '201') {    
        show_err('success','บันทึกข้อมูลเรียบร้อย') 
        _this.getDatas('treatment','ALL');          
      } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ')         
      }
    });
 
  }

  updateData (data) {
    let _this = this;
    updateProduct(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas('treatment','Y');
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
    let delData = {
      id: data.id,
      typ: 'treatment'
    }
    
    deleteProduct(delData)
    .then(function(results) {
      //console.log(results.data)
      if (results.data.status === '200') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas('treatment','ALL');  
      }
    });
  }


}
