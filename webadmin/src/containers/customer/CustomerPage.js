import React from 'react';
import moment from 'moment';
import axios from 'axios';
import uuid from 'uuid';
import CustomerHome from '../../components/customer/CustomerHome';
import CustomerList from '../../components/customer/CustomerList';
import CustomerForm from '../../components/customer/CustomerForm'; 
import CustomerProfile from '../../components/customer/CustomerProfile';  
import CustomerQueue from '../../components/customer/CustomerQueue';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getCustomer, getCustomers, serchCustomers, createCustomer, updateCustomer, deleteCustomer} from '../../utils/CustomerAPI';
import {getQueue, getQueues, createQueue, updateQueue, deleteQueue} from '../../utils/QueueAPI';
import {deleteTempOrders} from '../../utils/OrderAPI';
import {getAutonumber, getAutonumberID, setAutonumber} from '../../utils/AutonumberAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';
import {getUser} from '../../utils/UserAPI';




const initialState = {
  isView: 'HOME', oView: '', isEdit: false, data: [], customers: [], autonumber: 'N', adata: [], searchText: '',
  rowsPerPage: [20, 30, 50, 100], numberOfRows: 20, page: 0, total: null, qdata: [], qlist: [], customer_totalprice: 0,
  uplevel: 'N',
};


export default class CustomerPage extends React.Component {

  constructor(props) {
    super(props);
    this.autonumber_data = null;
    this.state = initialState;
  }
  reset (e) {
    e.preventDefault();
    this.setState({isView: 'HOME', isEdit: false, data: []});
  }
  qreset (e) {
    e.preventDefault();
    let view = 'HOME';
    if(this.state.oView==='DETAIL'){ view='DETAIL';  }
    this.setState({isView: view,  isEdit: false});
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {
    this.getQueueList(); 
    const _this = this
    const eid = JSON.parse(localStorage.getItem('msClinic')).uid;
    getUser(eid)
    .then(function(results) {      
      if (results.data.status === '200') {
        _this.setState({ uplevel: results.data.data.report })
      }
    })

    
  }

  handleNewForm (e) {
    let _this = this;
    const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    getAutonumber('PT',cn)
    .then(function(results) {
      if (results.data.status === '200') {
        let data = results.data.data;
        _this.setState({isView: 'FORM', oView: 'HOME', isEdit: false, data: [], adata: data, autonumber: data.typ});
      } else {
        _this.setState({isView: 'FORM', isEdit: false, data: [], adata: [], autonumber: 'N'});
      }
    });
  }

  handleEdit (data,view) {
    this.setState({isView: 'FORM', oView: view, isEdit: true, data: data});
  }

  handleQueue () {
    this.setState({isView: 'QUEUE'});
  }

  handleAppQueue (data) {
    const _this = this;
    this.setState({ loading: true },()=>{
      getCustomer(data.customer_id)
      .then(function(results) {        
        if (results.data.status === '200') {
          _this.setState({ isView: 'QUEUE', data:results.data[0], oView: 'HOME', loading: false,}); 
        } else {   
          _this.setState({ loading: false}); 
        }
      });
    });
  }

  handleSaveData (data) {
    this.setState({ data: data },()=>{
      if (data.uploadedFile.file !== null) {
        this.setState({loading: true}, () => {
          this.handleImageUpload(data.uploadedFile, data);
        });
      } else {
        this.newSaveData(data);
      }      
    })
  }

  handleDelete () {
    this.setState({isView: 'DELETE'});
  }

  DeleteResult (status) {
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

  handleShowView(data,view){  
    const _this = this;  

    getCustomer(data.id)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({data: results.data[0], customer_totalprice: results.data.totalprice },()=>{
          getQueue(data.id)
          .then(function(results) {

            let qdata = null
            if (results.data.status === '200') {
              qdata = results.data.data; 
            }
            _this.setState({qdata: qdata, isView: 'DETAIL', isEdit: false, oView: 'DETAIL' });
          });           
        });

      }
    });

   
  }

  handleShowSerchForm(e){
    e.preventDefault();
    this.setState({ isView: 'LIST', loading: true}, () => {      
      this.getDatas(0, 20);
    });    
  }

  handleSendQueue(data){

    this.setState({ loading: true },()=>{
      if(data.img_mode !== 'NONE'){
        if(data.img_mode === 'UPLOAD'){          
            this.handleImageUploadQueue(data.uploadedFile, data);         
        } else {            
            this.handleImageUploadQueue(data.imageSrc, data);   
        }
      } else {
        this.saveQueue(data.data);  
      }
      
    });    
  }

  handleSendEditQueue(data){
    this.setState({ loading: true },()=>{

      if(data.img_mode !== 'NONE'){
        if(data.img_mode === 'UPLOAD'){          
            this.handleImageUploadQueue(data.uploadedFile, data);         
        } else {
          this.handleImageUploadQueue(data.imageSrc, data); 
        }
      } else {
        const uData = { data: data.data, id: data.id }
        this.updateQueue(uData);
      }
      
    });
  }

  handleEditQueue(data){
    const _this = this;
    this.setState({ loading: true},()=>{
      getCustomer(data.customer_id)
      .then(function(results) {        
        if (results.data.status === '200') {
          _this.setState({ isView: 'QUEUE', data:results.data[0], qdata: data, oView: 'HOME', loading: false, isEdit: true}); 
        } else {   
          _this.setState({ loading: false, isEdit: false}); 
        }
      });      
    });    
  }

  handleSendDeleteQueue(data){
    this.setState({ loading: true },()=>{
      this.deleteQueue(data);
    });    
  }

  handleUplevel(level){


    let _this = this;
    updateCustomer(data)
    .then(function(results) {    
      if (results.data.status === '200') {
        _this.setState({ loading: false  },()=>{
          _this.handleShowView(_this.state.data,'HOME'); 
          show_err('success','แก้ไขข้อมูลเรียบร้อย');         
        })            
      }
    });



    /*
    getCustomer(data.id)
    .then(function(results) {
    
      if (results.data.status === '200') {
        _this.setState({data: results.data[0], customer_totalprice: results.data.totalprice },()=>{
          getQueue(data.id)
          .then(function(results) {

            let qdata = null
            if (results.data.status === '200') {
              qdata = results.data.data; 
            }
            _this.setState({qdata: qdata, isView: 'DETAIL', isEdit: false, oView: 'DETAIL' });
          });           
        });

      }
    });
    */


  }

  render() {   
    const item = this.state;

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        <ContentHeader title="ประชาสัมพันธ์" small="ข้อมูลลูกค้า" />    

        {
          item.isView === 'HOME' ?
          <CustomerHome 
            loading={item.loading}
            qlist={item.qlist}
            onQueue={this.handleAppQueue.bind(this)}
            onEditQueue={this.handleEditQueue.bind(this)}
            onSerch={this.handleShowSerchForm.bind(this)}  
            onNew={this.handleNewForm.bind(this)} />
          : null
        }

        {
          item.isView === 'LIST' ?
            <CustomerList     
              mode={'CUSTOMER'}  
              loading={item.loading}
              data={item.customers}
              serchText={item.serchText}
              onView={this.handleShowView.bind(this)}
              onSearch={this.onSearch.bind(this)}
              onClick={this.handleEdit.bind(this)}              
              onReset={this.reset.bind(this)}
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
          item.isView === 'FORM' ?
            <CustomerForm
              loading={item.loading}
              onReset={this.reset.bind(this)}
              onSave={this.handleSaveData.bind(this)}
              onDelete={this.handleDelete.bind(this)}
              isEdit={item.isEdit}
              data={item.data}
              autonumber={item.autonumber}
            /> 
            :  null
        }

        {
          item.isView === 'DETAIL' ?
          <CustomerProfile 
            data={item.data} 
            qdata={item.qdata}
            uplevel={item.uplevel}
            customer_totalprice={item.customer_totalprice}
            onQueue={this.handleQueue.bind(this)}
            onEdit={this.handleEdit.bind(this)}  
            onReset={this.reset.bind(this)}
            onUplevel={this.handleUplevel.bind(this)} />
          : null
        }

        {
          item.isView === 'QUEUE' ?
          <CustomerQueue
            mode={'CUSTOMER'}
            data={item.data}  
            qdata={item.qdata}
            isEdit={item.isEdit}           
            loading={item.loading}
            onSendQueue={this.handleSendQueue.bind(this)}
            onEditQueue={this.handleSendEditQueue.bind(this)}
            onDeleteQueue={this.handleSendDeleteQueue.bind(this)}
            onReset={this.qreset.bind(this)} />
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

  getQueueList(){
    const _this = this;
    getQueues('ALL')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({qlist: results.data.data});
      } else {
        _this.setState({qlist: []});
      }
    });
  }

  getDatas(page, perpage) {
    let _this = this;
    page = page + 1;
    serchCustomers('ALL', page, perpage, this.state.searchText)
    .then(function(results) {

      if (results.data.status === '200') {
        _this.setState({customers: results.data.data, total: results.data.total,  isView: 'LIST', loading: false});
      } else if (results.data.status === '204') {
        _this.setState({customers: [], isView: 'LIST', loading: false});
      }
    });
  }

  handleImageUpload (file, newData) {
    let _this = this;

    var txt = file.img.split(".");
    newData.img = newData.id+"."+txt[1];

    if (file.edit_img === 'Y') {
      let data = {
        name: file.oimg,
        mode: 'customers',
      };
      deleteimage(data)
      .then(function(response) {   });
    }

    let data = {
      img: file.imagePreviewUrl,
      name: file.img,
      mode: 'customers',
      newImg: newData.img,
      edit_img: file.edit_img,
    };
    
    uploadimage(data)
      .then(function(response) {
        _this.newSaveData(newData);
      });
  }

  handleImageUploadQueue (file, data) { 
    let _this = this;
    let newData = data.data;
    const imgName = uuid.v1()+'.jpg';
    if(data.img_mode==='UPLOAD'){
      var txt = file.img.split(".");
      newData.img = newData.id+"."+txt[1];
      if (file.edit_img === 'Y') {
        let data = {
          name: file.oimg,
          mode: 'customers',
        };
        deleteimage(data)
        .then(function(response) {   });
      }
    } else {      
      let delimg = newData.img;
      newData.img = imgName;
      if (this.state.isEdit) {
        let data = {
          name: delimg,
          mode: 'customers',
        };
        deleteimage(data)
        .then(function(response) {   });
      }
    }

    let udata = [];
    if(data.img_mode === 'UPLOAD'){         
      udata = {
        img: file.imagePreviewUrl,
        name: file.img,
        mode: 'customers',
        newImg: newData.img,
        edit_img: file.edit_img,
      };     
    } else {
      udata = {
        img: file,
        name: imgName,
        mode: 'customers',
        newImg: imgName,
        edit_img: this.state.isEdit,
      };  
    }
   
    uploadimage(udata)      
      .then(function(response) {
        if(_this.state.isEdit){
          let updateData = { data: newData, id: data.id} 
          _this.updateQueue(updateData); 
        } else {          
          _this.saveQueue(newData); 
        }
        
      });
  }

  newSaveData (data) {
    const _this = this;
    if (this.state.isEdit === true) {
      const temp = {
        title: data.title,fname: data.fname, lname: data.lname, nname: data.nname, fullname: data.fname+'  '+data.lname,
        nationality: data.nationality, idcard: data.idcard, dob: data.dob, sex: data.sex, level: data.level,
        address: data.address, am: data.am, tm: data.tm, food: data.food, color: data.color, 
        sport: data.sport, hobbies: data.hobbies, shop: data.shop, spa: data.spa,  
        province: data.province, zip: data.zip, tel: data.tel, img: data.img, 
        email: data.email, facebook: data.facebook, lineID: data.lineID, status: data.status, mode: data.mode,
        occupation: data.occupation, occ_address: data.occ_address,  druge: data.druge, 
      };
      const newData = {data: temp, id: data.id};
      this.updateData(newData);
    } else {

      const temp = {
        cn: data.cn, cname: data.cname, add_date: data.add_date, level: data.level,
        id:data.id,title: data.title,fname: data.fname, lname: data.lname, nname: data.nname, fullname: data.fname+'  '+data.lname, 
        nationality: data.nationality, idcard: data.idcard, dob: data.dob, sex: data.sex,
        address: data.address, am: data.am, tm: data.tm, food: data.food, color: data.color, 
        sport: data.sport, hobbies: data.hobbies, shop: data.shop, spa: data.spa,  
        province: data.province, zip: data.zip, tel: data.tel,  img: data.uploadedFile.img, 
        email: data.email, facebook: data.facebook, lineID: data.lineID, status: data.status, mode: data.mode,
        occupation: data.occupation, occ_address: data.occ_address,  druge: data.druge, 
      };

      if (this.state.autonumber === 'Y') {
        let newData = getAutonumberID(this.state.adata);
        temp.id = newData.lastID;
        setAutonumber(newData.id, newData.maxID)
        .then(function(results) {
          _this.saveData(temp);
        });
      } else {
        this.saveData(temp);
      }
    }
  }


  saveData(data) {

    let _this = this;
    createCustomer(data)
    .then(function(results) {
     
      if (results.data.status === '201') {
        
        _this.setState({ loading: false  },()=>{
          _this.handleShowView(data,'HOME'); 
          show_err('success','บันทึกข้อมูลเรียบร้อย');         
        })
        //_this.getDatas(_this.state.page, _this.state.numberOfRows);
        
      } else if (results.data.status === '203') {
          show_err('warning',results.data.message)         
      }
    });
  
  }

  updateData(data) {
    let _this = this;
    updateCustomer(data)
    .then(function(results) {    
      if (results.data.status === '200') {
        _this.setState({ loading: false  },()=>{
          _this.handleShowView(_this.state.data,'HOME'); 
          show_err('success','แก้ไขข้อมูลเรียบร้อย');         
        })            
      }
    });
  }

  deleteData(data) {
    let _this = this;
    deleteCustomer(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(_this.state.page, _this.state.numberOfRows);      
      }
    });
  }


  saveQueue(data) {
    let _this = this;
    createQueue(data)
    .then(function(results) {
      if (results.data.status === '201') {        
        _this.setState({ loading: false, isView: 'HOME'  },()=>{   
          _this.getQueueList();   
          show_err('success','บันทึกเข้ารับบริการเรียบร้อย');         
        })        
      } else if (results.data.status === '203') {
          show_err('warning',results.data.message)         
      }
    });  
  }

  updateQueue(data) {
    let _this = this;
    updateQueue(data)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({ loading: false, isView: 'HOME'  },()=>{
          _this.getQueueList(); 
          show_err('success','แก้ไขข้อมูลเรียบร้อย');         
        })            
      }
    });
  }

  deleteQueue(data){
    let _this = this;
    let delData = { id: data.id }


    let deldata = {
      name: data.img,
      mode: 'customers',
    };
    deleteimage(deldata)
      .then(function(response) {   });


    deleteQueue(delData)
    .then(function(results) {      
      if (results.data.status === '201') {
        delData = { customer_id: data.customer_id }
        deleteTempOrders(delData);
        _this.setState({ loading: false, isView: 'HOME'  },()=>{
          _this.getQueueList();
          show_err('success','ลบข้อมูลเรียบร้อยแล้ว');   
        })            
      }
    });
  }



}

