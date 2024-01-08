import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import PromotionList from '../../components/promotion/PromotionList';
import PromotionForm from '../../components/promotion/PromotionForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getMsProduct, getMsService} from '../../utils/ProductAPI';
import {getPromotion, getPromotions , createPromotion, updatePromotion, deletePromotion} from '../../utils/PromotionAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
//const imgURL = `${config.init.url}images/products/`;
const imgURL = `${config.init.web_url}API/images/promotions/`;


const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], msProductList: []
};


export default class PromotionPage extends React.Component {

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
          mode: 'promotions',
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
    let title = 'รายการโปรโมชั่น';
    switch (item.isView) {
      case 'LIST' : title = 'รายการทั้งหมด'; break;
      case 'VIEW' : title = 'รายละเอียดสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="Promotion" small={title} >
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
            <PromotionList
              data={item.products}    
                     
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <PromotionForm
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
    getMsService('P')
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
    getPromotions(mode,'-','-')
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
            mode: 'promotions',
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
      mode: 'promotions',
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
        id: data.id, typ: 'P',   promotion_name: data.promotion_name,  unit: data.unit, price_total: data.price_total, price_sale: data.price_sale,
        status: data.status, img: data.img,title: data.title, con: data.con, detail: data.detail, discount: data.discount, 
        start_date: data.start_date, end_date: data.end_date,
      };
      const newData = {data: temp, id: data.id};

      console.log(newData)
      this.updateData(newData);
    } else {
      const temp = {
        id: data.id, typ: 'P', promotion_name: data.promotion_name,  unit: data.unit, price_total: data.price_total, 
        price_sale: data.price_sale,title: data.title, con: data.con, detail: data.detail, discount: data.discount, 
        status: data.status, img: data.img, start_date: data.start_date, end_date: data.end_date,
      };        
      this.saveData(temp);
      
    }
  }

  saveData (data) {
    //const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    let _this = this; 
    createPromotion(data)
    .then(function(results) {
     
      if (results.data.status === '201') {    
        show_err('success','บันทึกข้อมูลเรียบร้อย') 
        _this.getDatas('ALL');          
      } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ')         
      }
    });
 
  }

  updateData (data) {
    let _this = this;
    console.log('update',data)
    updatePromotion(data)
    .then(function(results) {
    
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas('Y');
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
    let delData = {
      id: data.id,
    }

    deletePromotion(delData)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas('ALL');  
      }
    });
  }


}
