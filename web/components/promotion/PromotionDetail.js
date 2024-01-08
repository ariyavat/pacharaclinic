import React from 'react'
import Router from 'next/router'
import moment from 'moment';
import renderHTML from 'react-render-html'
import ShopBox from '../common/ShopBox'  
import PromotionMiniBox from './PromotionMiniBox' 
import ShopList from '../cart/ShopList'  
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/promotions/`;

export default class PromotionDetail extends React.Component {
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
  	if(mode === 'D'){
  		qty--
  		if(qty===0){ qty = 1 }
  	} else {
  		qty++
  	}
  	this.setState({ qty: qty })

  }

  handleShowDetail(e){
  	e.preventDefault()
  	/*
	Router.push({
	    pathname: '/product',
	    query: { code: this.props.data.id }
	})	
	*/
  }

  onUpdate(){
    this.setState({timers: moment().format('YYYYMMDDHHmmss') })
  }


  render () {
  	const item = this.state
  	const {data, List} = this.props
  	let img = imgURL+data.img

  	//console.log('dsd',data)


  	return(
	  <div>
  		<div className="row">            
		  	<div className="col-md-12" >	
	  		    <header className="review-header">
	  		      <h1 className="txt-green">PROMOTIONS </h1>
	  		    </header>
		  	</div> 	
  		</div>  
  		<div className="row">  
		  	<div className="col-md-8" >	
  			<div className="row">  
			  	{
			  		data.img !== 'no' ?      
				    <div className="col-md-12 mgt-30" >		    
						<div className="row">
						    <div className="col-12 col-md-6" >
						     	<img className="img-fluid img-thumbnail" src={img} />
						    </div>
						    <div className="col-12 col-md-6" >
								<h3 className="txt-green">{data.promotion_name}</h3>
								<div className="row">
								    <div className="col-md-12 min-70" >{data.title}</div>
								</div>
								<div className="row">
								    <div className="col-md-12 price-text" >
								    	<span className="text-danger font-40">{parseFloat(data.price_sale).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
								    	
								    </div>
								</div>	
								<div className="row">
								    <div className="col-md-12" >
										<span>&#3647;{parseFloat(data.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
								    </div>
								</div>		
								<div className="row">
								    <div className="col-md-12" >
										<span>โปนโมชั่นหรือราคาข้างต้นจะอยู่ถึง {moment(data.end_date).format('DD/MM/YYYY')}</span>
								    </div>
								</div>	
								<div className="row">
								    <div className="col-4 col-md-4 text-right line-qty"><b>จำนวน</b></div>
								    <div className="col-8 col-md-8 line-qty">
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
									<ShopBox data={data} qty={item.qty} mode='PR' typ='P' img={img} />	
								    </div>
								</div>



						      
						    </div>			    
						</div>
						<div className="row">
						    <div className="col-md-12 mgt-30" ><h4>เงื่อนไข</h4></div>
						</div>
						<div className="row">
						    <div className="col-md-12" >{data.con}</div>
						</div>
						<div className="row">
						    <div className="col-md-12 mgt-30" ><h4>การจัดส่ง</h4></div>
						</div>
						<div className="row">
						    <div className="col-md-12" ><p>{data.send}</p></div>
						</div>
						<div className="row">
						    <div className="col-md-12 mgt-30" ><h4>รายละเอียดโปรโมชั่น</h4></div>
						</div>
						<div className="row">
						    <div className="col-md-12" >{renderHTML(data.detail)}</div>
						</div>

				    </div>
				    :
				    <h1 className="mgt-50">LOAD DATA...</h1>
			  	}
				</div>
		  	</div>
		  	<div className="col-md-4 xs-hidden" >	              
                <ShopList timers={item.timers} />              

		  	</div>

  		</div>  
		  <div className="d-block d-lg-none"><br/><br/><br/></div>
	  </div>
  	)
  }
}