import React from 'react'
import Router from 'next/router'
import * as config from '../../config';
const imgURL = `${config.init.url}/images/flash/`;
export default class FlashBox extends React.Component {
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
	    pathname: '/flashsale',
	    query: { code: this.props.data.id, name: this.props.data.pname, typ: this.props.data.typ  }
	})
	
  }

  render () {
  	const {data} = this.props
  	let img = imgURL+data.img

  	return(
	  <div className="col-md-3 col-sm-3 col-xs-12 box-ph-body alink" onClick={this.handleShowDetail} >
	    <div className="box-gren">
	      <div className="row">
	        <div className="col-md-12 text-center" >
	          <img className="img-fluid" src={img} />
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-md-12 mgt-10" >
	          <span className="txt-blued font-16-b">{data.pname}</span>  
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-sm-6 col-xs-6" >
	          <div className="row">
	            <div className="col-md-12" >
	              <span className="txt-red-price">{parseFloat(data.price_sale).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>  
	            </div>
	            <div className="col-md-12" > 
	              <span className="txt-old-price">{parseFloat(data.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</span> 
	            </div>
	          </div>
	        </div>
	        <div className="col-sm-6 col-xs-5 text-center" >
	          <div className="box arrow-left">
	            -{data.discount}%
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>
  	)
  }
}