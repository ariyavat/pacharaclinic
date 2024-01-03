import React from 'react';
import axios from 'axios';
import ContentHeader from '../../components/common/ContentHeader';
import UploadImages from '../../components/common/UploadImages';
import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';
import {getCompany, updateCompany} from '../../utils/CompanyAPI';

import * as config from '../../config';
const imgURL = `${config.init.url}/images/`;

const initialState = {
  loading: false, data: [], img: 'NO',
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  }
};


export default class LogoPage extends React.Component {

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
  	this.getCompany();
  }

  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }

  handleSaveData () {  	
 
    if (this.state.uploadedFile.file !== null) {
      this.setState({loading: true}, () => {
        this.handleImageUpload(this.state.uploadedFile);
      });
    } else {
    	show_err('warning','ไม่ได้เลืกโลโก้') ; 
    }
    
  }

  render() {
    const item = this.state;

    return (
      <div>
        <ContentHeader title="ตั้งค่าระบบ" small='เพิ่มโลโก้บริษัท' />   
        <section className="content">
	        <div className="box box-info" > 
	        	<div className="box-body min-550">
	        		<div className="row mgt-50">
						<div className="col-sm-4 col-sm-offset-4">

	                      <UploadImages
	                        imgURL={imgURL}
	                        isEdit={true}
	                        data={item.uploadedFile}
	                        onImgChage={this.handleImageChange.bind(this)} />

						</div>
	        		</div>

		            <div className="row mgt-20">
		              	<div className="col-sm-4 col-sm-offset-4 text-center">		                       
		                	<a  className="btn btn-flat btn-success" 
		                  		onClick={this.handleSaveData.bind(this)}  > <i className="fa fa-save mgr-10"></i>  บันทึกข้อมูล   </a>  
		          		</div>
		            </div>

	        	</div>

				{
				item.loading ?
					<div className="overlay">
	              		<i className="fa fa-refresh fa-spin"></i>
	            	</div>
				: null
				}
	        </div>
  		</section>
      </div>
    );
  }


  handleImageUpload (file) {
    let _this = this;
    let txt = file.img.split(".");
    let imgNew = 'logo.'+txt[1];
    if (file.edit_img === 'Y') {
      let data = {
        name: file.oimg,
        mode: '',
      };
      deleteimage(data);
    }
    let data = {
      img: file.imagePreviewUrl,
      name: file.img,
      mode: '',
      newImg: imgNew,
      edit_img: file.edit_img,
    };
    uploadimage(data)
      .then(function(response) {
      	let upData = { logo: imgNew }
        _this.updateCompany(upData);
      });
      
  }


  getCompany(){
    const _this = this;
    getCompany()
    .then(function(results) {
      if (results.data.status === '200') {
      	 const item = results.data.data;
	     let img = null;
	     let pre = null;
	     if (item.logo !== null && item.logo !== 'NO') {
	       img = item.logo;
	       pre = imgURL + img;
	     }


	     let img_data = {
	       imagePreviewUrl: pre,
	       oimg: img,
	       img: img,
	       file: null,
	       edit_img: 'N',
	     };
        _this.setState({ img: item.img, uploadedFile: img_data, loading: false }); 
      
      } else if (results.data.status === '204') {
          show_err('warning','ไม่พบข้อมูลบริษัท')         
      }
    });
  }

  updateCompany(data) {
    let _this = this;
    updateCompany(data)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.getCompany();
        show_err('success','บันทึกมูลเรียบร้อยแล้ว'); 
      }
    });
  }


}

