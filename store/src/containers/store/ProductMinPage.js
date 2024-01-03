
import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import MinList from '../../components/store/MinList';
import ContentHeader from '../../components/common/ContentHeader';
import {getProduct, getProducts, serchProducts, createProduct, updateProduct, deleteProduct} from '../../utils/ProductAPI';

import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';
import {getReciveProduct} from '../../utils/StoreAPI';
//import {getGenerals} from '../../utils/GeneralAPI';


import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false, typ: 'ALL', data: [], products: [], autonumber: 'N', adata: [], suppliers: [], searchText: '',
  rowsPerPage: [20, 30, 50, 100,200], numberOfRows: 1000, page: 0, total: null, reciveList: [], auth: [],
  gList: [{typ: 'C', name: 'ครีม'},{typ: 'P', name: 'แพ็คเก็จ'},{typ: 'S', name: 'สติ๊กเกอร์'},{typ: 'B', name: 'กล่องบรรจุ'}]
};


export default class ProductMinPage extends React.Component {

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
    this.getDatas('ALL',0, 1000);

  }




  render() {
    const item = this.state;
    let title = 'รายการสินค้า';
    switch (item.isView) {
      case 'LIST' : title = 'รายการใกล้หมดสต็อค'; break;
      case 'VIEW' : title = 'รายละเอียดวัตถุดิบ'; break;
      case 'FORM' : title = 'ข้อมูลวัตถุดิบ'; break;
    }
    
    return (
      <div>
        <ContentHeader title="คลังวัตถุดิบ" small={title} >

        </ContentHeader>

        {
          this.state.isView === 'LOAD' ?
          'LOADING.....' : null
        }

        {
          this.state.isView === 'LIST' ?
            <MinList
              data={item.products}
            
            /> :
          null
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
     
      if (results.data.status === '200') {
        _this.setState({products: results.data.data, total: results.data.total,  isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }



}
