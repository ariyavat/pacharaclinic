import React from 'react'
import * as config from '../config';
const imgURL = `${config.init.url}/images/products/`;
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

  render () {
  	const {data} = this.props
  	console.log('dd',data)
  	//let img = imgURL+data.img
  	return(
	  <div className="col-md-2 col-sm-4 col-xs-12 box-ph-body" >
	    <div className="box-gren">
	      <div className="row">
	        <div className="col-md-12 text-center" >
	          <img className="img-fluid" src="" />
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-md-12 mgt-10" >
	          <span className="txt-blued font-16-b">sss</span>  
	        </div>
	      </div>
	      <div className="row">
	        <div className="col-sm-6 col-xs-6" >
	          <div className="row">
	            <div className="col-md-12" >
	              <span className="txt-red-price">sss</span>  
	            </div>
	            <div className="col-md-12" > 
	              <span className="txt-old-price">700.00</span> 
	            </div>
	          </div>
	        </div>
	        <div className="col-sm-6 col-xs-6 text-center" >
	          <div className="box arrow-left">
	            -70%
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>
  	)
  }
}