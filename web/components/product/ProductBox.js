import React from 'react'
import Router from 'next/router'
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/products/`;
export default class ProductBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
  	// 
  }

  handleShowDetail(e){
  	e.preventDefault()
	Router.push({
	    pathname: '/products',
	    query: { code: this.props.data.id, name: this.props.data.product_name, cat_id: this.props.data.mode }
	})	
  }

  render () {
  	const {data, mode} = this.props
  	let img = imgURL+data.img
  	let cls = "col-6 col-md-3 col-sm-4  box-ph-body alink"
  	if(mode === 'W'){
  		cls = "col-6 col-md-3 col-sm-4  box-ph-body alink"
  	}
  	return(
	  <div className={cls} onClick={this.handleShowDetail.bind(this)} >
	    <div className="box-gren">
	      <div className="row">
	        <div className="col-md-12 text-center" >
	          <img className="img-fluid" src={img} />
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-md-12 mgt-10 min-100" >
	          <span className="txt-blued font-01">{data.product_name}</span>  <br/>
	          <small>ขนาด {data.wg} ml.</small>
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-12" >	        
	              <span className="txt-red-price">{parseFloat(data.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>  
	         
	        </div>
	
	      </div>
	    </div>
	  </div>
  	)
  }
}