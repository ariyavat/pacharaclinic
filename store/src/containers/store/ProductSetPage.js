import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import ProductsList from '../../components/store/ProductsList';
import ProductsForm from '../../components/store/ProductsForm';
import ProductDetail from '../../components/store/ProductDetail';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {
	getMsProduct, getProducts, getProductSet, getProductSets, serchProductSets, 
	createProductSet, updateProductSet, deleteProductSet
} from '../../utils/ProductAPI';

import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';
import {getReciveProduct} from '../../utils/StoreAPI';
//import {getGenerals} from '../../utils/GeneralAPI';


import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false, data: [], products: [],  msProductList: [], searchText: '', tempList: [],
  rowsPerPage: [20, 30, 50, 100,200], numberOfRows: 20, page: 0, total: null, reciveList: [], auth: [],
  
};


export default class ProductSetPage extends React.Component {

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
  	this.getProductList();
  	this.getTempList();
    this.getDatas(0, 20);  
  }

  handleNewForm (e) {
    this.setState({isView: 'FORM', isEdit: false, data: []});
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
    const _this = this;
    if (this.state.isEdit === true) { 
    	let temp = {
    		data: { name: data.name },
    		id: data.id,
    		mode: 'NOT',
    		dList: data.dList
    	}
      this.updateData(temp);
    } else { 
        this.saveData(data);
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
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  onSearch (data) {
    this.setState({searchText: data}, () => {

      this.getDatas(0, this.state.numberOfRows);
    });
  }

  onChangePage (pageOfItems) {
    this.setState({numberOfRows: pageOfItems.numberOfRows, page: pageOfItems.page}, () => {
      this.getDatas(pageOfItems.page, pageOfItems.numberOfRows);
    });
  }


  updateRows (newPage) {  
    this.setState({numberOfRows: this.state.numberOfRows, page: newPage}, () => {
      this.getDatas(newPage, this.state.numberOfRows);
    });    
  }

  updatePerPages (num) {     
    this.setState({numberOfRows: num, page: 0}, () => {
      this.getDatas(0, this.state.numberOfRows);
    });    
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'รายการสินค้า';
    switch (item.isView) {
      case 'LIST' : title = 'รายการสินค้า'; break;
      case 'VIEW' : title = 'รายละเอียดสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="โรงงาน" small={title} >
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
            <ProductsList
              data={item.products}      
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
            <ProductsForm
              loading={item.loading}
              tempList={item.tempList}
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
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }


  
      </div>
    );
  }

  //
  getTempList(){
    let _this = this;
    getProducts('ALL','Y')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({ tempList: results.data.data });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: []});
      }
    }); 
  }


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


  getDatas (page, perpage) {
    let _this = this;
    page = page + 1;
    serchProductSets(page, perpage, this.state.searchText)
    .then(function(results) {
    
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
      console.log('RECIVE',results)
      if (results.data.status === '200') {
        _this.setState({reciveList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({reciveList: []});
      }
    });
    
  }





  saveData (data) {
    let _this = this;
  createProductSet(data)
  .then(function(results) {
    
    if (results.data.status === '201') {
      //et newData = { id: data.id, total: 0, cn: cn  };
      //createProductTotal(newData);
      show_err('success','บันทึกข้อมูลเรียบร้อย') 
      _this.getDatas(_this.state.page, _this.state.numberOfRows);          
    } else if (results.data.status === '203') {
        show_err('warning','รหัสซ้ำ')         
    }
  });
 
  }

  updateData (data) {
    let _this = this;
    updateProductSet(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas(_this.state.page, _this.state.numberOfRows);
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
    deleteProductSet(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(_this.state.page, _this.state.numberOfRows);  
      }
    });
  }


}
