import React from 'react'
import Router from 'next/router'
import renderHTML from 'react-render-html'
import ShopBox from '../common/ShopBox'  
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/products/`;
export default class TreatmentDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], qty: 1,
    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {
  	
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

 
  componentDidMount () {
  	// 
  }

  handleAddQty(mode,e){
  	e.preventDefault()
  	let qty = parseFloat(this.state.qty)
  	if(mode === 'T'){
  		qty--
  		if(qty===0){ qty = 1 }
  	} else {
  		qty++
  	}
  	this.setState({ qty: qty })

  }

  onUpdate(){
  	this.props.onUpdate()
  }


  render () {
  	const item = this.state
  	const {data} = this.props
  	let img = imgURL+data.img
  	//let cls = "col-xs-6 col-md-2 col-sm-4  box-ph-body alink"
  	//if(mode === 'W'){
  	//	cls = "col-xs-6 col-md-3 col-sm-4  box-ph-body alink"
  	//}
  	return(
	  <div className="row">

	  	{
	  		data.img !== 'no' ?      
		    <div className="col-md-12" >
		    
				<div className="row">
				    <div className="col-md-6" >
				     	<img className="img-fluid img-thumbnail" src={img} />
				    </div>
				    <div className="col-md-6" >
						<h3 className="txt-green font-01">{data.product_name}</h3>
						<div className="row">
						    <div className="col-md-12 min-150" >{data.title}</div>
						</div>
						<div className="row">
								    <div className="col-md-12 price-text" >
								    	<span className="text-danger font-40">{parseFloat(data.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
								   
								    </div>
						</div>		
						<div className="row">
						    <div className="col-md-4 text-right line-qty"><b>จำนวน</b></div>
						    <div className="col-md-8 line-qty">
							<form className="form-horizontal">
                                <button type="button" className="qty-btn-l" onClick={this.handleAddQty.bind(this,'D')}  >-</button>									
								<input  type="text"  className="qty-input" 
									value={item.qty} 
									onChange={(e) => this.setState({qty: e.target.value})}  />
								<button type="button" className="qty-btn-r" onClick={this.handleAddQty.bind(this,'A')}  >+</button>	
							</form>
						    </div>
						</div>	


						<div className="row">
						    <div className="col-md-12" >
							<ShopBox data={data} qty={item.qty} mode='TR' typ='T' img={img} onUpdate={this.onUpdate.bind(this)}  />	
						    </div>
						</div>
				      
				    </div>			    
				</div>
				<div className="row">
				    <div className="col-md-12 mgt-30" ><h4 className="font-01">เงื่อนไข</h4></div>
				</div>
				<div className="row">
				    <div className="col-md-12" >{data.con}</div>
				</div>
				<div className="row">
				    <div className="col-md-12 mgt-30" ><h4 className="font-01">การจัดส่ง</h4></div>
				</div>
				<div className="row">
				    <div className="col-md-12" ><p>{data.send}</p></div>
				</div>
				<div className="row">
				    <div className="col-md-12 mgt-30" ><h4 className="font-01">รายละเอียดสินค้า</h4></div>
				</div>
				<div className="row">
				    <div className="col-md-12" >{renderHTML(data.detail)}</div>
				</div>

		    </div>
		    : null
	  	}

	  </div>
  	)
  }
}