import React from 'react'
import Router from 'next/router'
import moment from 'moment';
export default class UploadImg extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	loading: false,
    }  
    this.onClearImage = this.onClearImage.bind(this)   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
 
  }

	onClearImage(e){
		e.preventDefault()
		let img = null;
		if(this.props.isEdit){	
			if(this.props.data.oimg){
				img = this.props.imgURL+this.props.data.oimg	
			}
			
		}   		
		let data = {
				imagePreviewUrl: img,
				oimg: this.props.data.oimg,
				img: img,
				file: null,
				edit_img: 'N'
		}
		this.props.onImgChage(data)
	}

	handleImageChange(e) {
	    e.preventDefault();

	    let reader = new FileReader();
	    let file = e.target.files[0];
	    let edit_img = 'N'  
	    
	    let oimg = this.props.data.oimg
	    if(this.props.isEdit){	edit_img = 'Y'   }

	    reader.onloadend = () => {
	      let data = {
	        file: file,
	        img: file.name,
	        imagePreviewUrl: reader.result,
	        edit_img: edit_img,
	        oimg: oimg
	      }
	      this.props.onImgChage(data)       
	    }
	    reader.readAsDataURL(file)
	    
	}

  render () {
    const item = this.state
    let {imagePreviewUrl} = this.props.data;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img  className="img-responsive img-thumbnail" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

	return(
		
        <div className="row"> 
        	<div className="col-12">	
        		<span>สลิปการโอน</span>
		        <div className="row"> 
		        	<div className="col-12">	
		        		{$imagePreview}
		  	        </div> 
		        </div>  
		        <div className="row"> 
		        	<div className="col-12">
		          		<span className="btn btn-primary btn-file">
						  <i className="fa fa-folder-open-o"></i> เลือกรูป <input type="file" onChange={(e)=>this.handleImageChange(e)} />
						</span>
						<button className="btn btn-default mgl-10" onClick={this.onClearImage}><i className="fa fa-remove text-danger"></i> ยกเลิก</button>			
		  	        </div> 
		        </div>  


  	        </div> 
        </div>  

	)   
  }

 //
  getDatas(){
  	/*
    const _this = this
    getPromotions('WEB','-','-')
    .then(function(response) {         
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
    */
  }



}