import React from 'react'
import Router from 'next/router'
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/promotions/`;
export default class PromotionBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }   

    this.handleShowDetail = this.handleShowDetail.bind(this)
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
	    pathname: '/promotions',
	    query: { code: this.props.data.id, name: this.props.data.promotion_name }
	})
  }

  render () {
  	const {data, mode} = this.props
  	let img = imgURL+data.img
  	let mcl = 'col-12 col-md-3 col-sm-6 col-xs-12 box-ph-body alink'
  	if(mode==='HOME'){
  		 mcl = 'col-12 col-md-4 col-sm-6 col-xs-12 box-ph-body alink'
  	}


  	return(
	  <div className={mcl} onClick={this.handleShowDetail} >
	    <div className="box-gren">
	      <div className="row">
	        <div className="col-md-12 text-center" >
	          <img className="img-fluid" src={img} />
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-md-12 mgt-10 min-100">
	          <span className="txt-blued ">{data.promotion_name}</span>  
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-12 col-sm-12" >
	          <div className="row">
	            <div className="col-md-12" >
	              <span className="txt-red-price">{parseFloat(data.price_sale).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>  
	            </div>
	            <div className="col-md-12" > 
	              <span className="txt-old-price">{parseFloat(data.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</span> 
	            </div>
	          </div>
	        </div>




	      </div>
	    </div>
	  </div>
  	)
  }
}