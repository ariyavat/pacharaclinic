import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import GroupList from '../../components/group/GroupList';
import GroupForm from '../../components/group/GroupForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getPgroup, getPgroups , createPgroup, updatePgroup, deletePgroup} from '../../utils/PgroupAPI';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';




import * as config from '../../config';
//const imgURL = `${config.init.url}images/products/`;
const imgURL = `${config.init.web_url}images/pgroup/`;


const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], mode:'P',
  groups:[
  	{mode:'P', name:'กลุ่มสินค้า'},{mode:'T', name:'กลุ่มทรีทเมนท์'},
  	{mode:'L', name:'กลุ่มเลเซอร์'},{mode:'R', name:'กลุมรีวิว'},
  	{mode:'M', name:'กลุ่มแม่หลังคลอด'}
  ]
};


export default class GroupPage extends React.Component {

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
 
    this.getDatas('P');

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
    if (data.uploadedFile.file !== null || data.uploadedFile ) {    
      this.setState({loading: true}, () => {
        this.handleImageUpload(data.uploadedFile, data);
      });
    } else {
      this.newSaveData(data);
    }



      this.newSaveData(data);    
  }

  handleDelete () {
    this.setState({isView: 'DELETE'});
  }

  handleShowdata(mode){
  	this.setState({mode:mode},()=>{
  		this.getDatas(mode);	
  	})    
  }


  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {

    	let data = {gid: this.state.data.gid, mode: this.state.data.mode} ;
       this.deleteData(data);     
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'กลุ่มรายการ';
    switch (item.isView) {
      case 'LIST' : title = 'กลุ่มรายการ'; break;
      case 'VIEW' : title = 'รายละเอียดกลุ่ม'; break;
      case 'FORM' : title = 'ข้อมูลกลุ่ม'; break;
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
            <GroupList
              data={item.products}  
              mode={item.mode}   
              groups={item.groups}    
               onShow={this.handleShowdata.bind(this)}       
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <GroupForm
              loading={item.loading}   
              mode={item.mode}  
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

  getDatas (mode) {
    let _this = this; 
    getPgroups(mode)
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


   // console.log(imgName,newData)


    if (file.edit_img === 'Y') {

      $.get(imgURL+file.oimg)
        .done(function() { 
          let data = {
            name: file.oimg,
            mode: 'pgroup',
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
      mode: 'pgroup',
      newImg: imgName,
      edit_img: file.edit_img,
    };
    uploadimage(data)
      .then(function(response) {
  
        console.log(newData)
        _this.newSaveData(newData);
      });
  }



  newSaveData (data) {
    const _this = this;
    if (this.state.isEdit === true) {
      const temp = {
        gname: data.gname, img: data.img, 
      };
      const newData = {data: temp, gid: data.gid, mode: data.mode}; 
      this.updateData(newData);
    } else {
      const temp = {
        gid: data.gid, mode: data.mode, gname: data.gname, img: data.img,
      };        
      this.saveData(temp);
      
    }
  }

  saveData (data) {   
    //const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    let _this = this; 
    const item = this.state
    createPgroup(data)
    .then(function(results) {
      if (results.data.status === '201') {    
        show_err('success','บันทึกข้อมูลเรียบร้อย') 
        _this.getDatas(item.mode);          
      } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ')         
      }
    });
 
  }

  updateData (data) {
    let _this = this;
    const item = this.state
    updatePgroup(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas(item.mode);
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
    const item = this.state
 
    deletePgroup(data)
    .then(function(results) {
    	console.log(results)
      if (results.data.status === '200') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(item.mode);  
      }
    });
  }


}
