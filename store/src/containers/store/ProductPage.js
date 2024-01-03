import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import ProductList from '../../components/store/ProductList';
import ProductForm from '../../components/store/ProductForm';
import ProductDetail from '../../components/store/ProductDetail';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getProduct, getProducts, serchProducts, createProduct, updateProduct, deleteProduct} from '../../utils/ProductAPI';

import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';
import {getReciveProduct} from '../../utils/StoreAPI';
//import {getGenerals} from '../../utils/GeneralAPI';


import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false, typ: 'ALL', data: [], products: [], autonumber: 'N', adata: [], suppliers: [], searchText: '',
  rowsPerPage: [20, 30, 50, 100,200], numberOfRows: 20, page: 0, total: null, reciveList: [], auth: [],
  gList: [{typ: 'C', name: 'ครีม'},{typ: 'P', name: 'แพ็คเก็จ'},{typ: 'S', name: 'สติ๊กเกอร์'},{typ: 'B', name: 'กล่องบรรจุ'}]
};


export default class ProductPage extends React.Component {

  constructor(props) {
    super(props);
    this.autonumber_data = null;
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
    this.getDatas('ALL',0, 20);
  }

  handleNewForm (e) {
    this.setState({isView: 'FORM', isEdit: false, data: [], loading: false});
  }

  handleEdit (data) {
    this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});
  }

  handleView (data) {
    this.setState({isView: 'VIEW', isEdit: true, data: data},()=>{
      this.getReciveProduct(data.id);
    });
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

      let data = {id: this.state.data.id, typ: this.state.data.typ} ;
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

  onSearch (typ,data) {
    this.setState({searchText: data, typ: typ}, () => {

      this.getDatas(typ,0, this.state.numberOfRows);
    });
  }

  onChangePage (pageOfItems) {
    this.setState({numberOfRows: pageOfItems.numberOfRows, page: pageOfItems.page}, () => {
      this.getDatas(this.state.typ,pageOfItems.page, pageOfItems.numberOfRows);
    });
  }


  updateRows (newPage) {  
    this.setState({numberOfRows: this.state.numberOfRows, page: newPage}, () => {
      this.getDatas(newPage, this.state.numberOfRows);
    });    
  }

  updatePerPages (num) {     
    this.setState({numberOfRows: num, page: 0}, () => {
      this.getDatas(this.state.typ,0, this.state.numberOfRows);
    });    
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'รายการสินค้า';
    switch (item.isView) {
      case 'LIST' : title = 'รายการวัตถุดิบ'; break;
      case 'VIEW' : title = 'รายละเอียดวัตถุดิบ'; break;
      case 'FORM' : title = 'ข้อมูลวัตถุดิบ'; break;
    }
    
    return (
      <div>
        <ContentHeader title="คลังวัตถุดิบ" small={title} >
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
              gList={item.gList}
              serchText={item.serchText}
              onSearch={this.onSearch.bind(this)}
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
              total={item.total}
              rowsPerPage={item.rowsPerPage}
              page={item.page}
              numberOfRows={item.numberOfRows}              
              updatePerPages={this.updatePerPages.bind(this)}
              updateRows={this.updateRows.bind(this)}
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <ProductForm
              loading={item.loading}
              suppliers={item.suppliers}
              onReset={this.reset.bind(this)}
              onSave={this.handleSaveData.bind(this)}
              onDelete={this.handleDelete.bind(this)}             
              isEdit={this.state.isEdit}
              data={item.data}
              autonumber={item.autonumber}
            />          :
          null
        }

        {
          this.state.isView === 'VIEW' ?
          <ProductDetail 
            data={item.data} 
            rList={item.reciveList}
            onEdit={this.handleEdit.bind(this)} />         

          : null
        }

        {
          this.state.isView === 'DELETE' ?
            <ConfirmBox
              mode={'DELETE'}
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }


  
      </div>
    );
  }

  //

  getDatas (typ,page, perpage) {
    let _this = this;
    page = page + 1;
    serchProducts(typ,'ALL', page, perpage, this.state.searchText)
    .then(function(results) {  
      console.log(results)  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data, total: results.data.total,  isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }

  getReciveProduct(id){
    let _this = this;
    
    getReciveProduct(id)
    .then(function(results) {
     // console.log('RECIVE',results)
      if (results.data.status === '200') {
        _this.setState({reciveList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({reciveList: []});
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
        name: data.name, unit: data.unit, size: data.size, size_unit: data.size_unit, stotal: data.stotal,
        unit: data.unit, total: data.total, status: data.status, img: data.img,
      };
      const newData = {data: temp, id: data.id, typ: data.typ};
      this.updateData(newData);
    } else {

      
        const temp = {
          id: data.id, typ: data.typ, name: data.name, unit: data.unit, size: data.size, size_unit: data.size_unit, 
          unit: data.unit, total: data.total, stotal: data.stotal, status: data.status, img: data.img,
        };   
        this.saveData(temp);
    }
  }

  saveData (data) {

    let _this = this;
    let con = 'Y'; let msg = '';
    if (data.id !== '') {
      if (data.typ !== '') {
      if (data.name !== '') {
        con = 'Y';
      } else {
        con = 'N'; msg = 'ไม่ได้กรอกชื่อ';
      }
    } else { con = 'N'; msg = 'ไม่ได้กรอกประเภท'; }
    } else { con = 'N'; msg = 'ไม่ได้กรอกรหัส'; }
    if (con === 'Y') {
      createProduct(data)
      .then(function(results) {
        console.log(results)
        if (results.data.status === '201') {
          //et newData = { id: data.id, total: 0, cn: cn  };
          //createProductTotal(newData);
          show_err('success','บันทึกข้อมูลเรียบร้อย') 
          _this.getDatas(_this.state.typ,_this.state.page, _this.state.numberOfRows);          
        } else if (results.data.status === '203') {
            show_err('warning','รหัสซ้ำ')         
        }
      });
    } else {
      show_err('warning',msg)   
      
    }
  }

  updateData (data) {
    let _this = this;
    updateProduct(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas(_this.state.typ,_this.state.page, _this.state.numberOfRows);
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
  
    deleteProduct(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(_this.state.typ,_this.state.page, _this.state.numberOfRows);  
      }
    });
    
  }


}
