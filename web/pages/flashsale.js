import React from 'react'
import moment from 'moment';
import Layout from '../components/Layout'
import ShopBox from '../components/common/ShopBox'  
import { getFlash } from '../utils/FlashAPI'


import * as config from '../config';
const imgURL = `${config.init.url}images/flash/`;

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], qty: 1, loading: false, dat: '', etime: '', h1: '0', h2: '0', m1: '0', m2: '0', isOpen: true
    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {     
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	let pid = this.props.url.query.code
    let typ = this.props.url.query.typ
    const _this = this
    getFlash(typ,pid)
    .then(function(response) {   
      if(response.data.status ==='200'){
        _this.setState({  data: response.data.data },()=>{
          window.scrollTo(0,0)   
          _this.coutTime()       
        })
      }
    })
  }


  coutTime(){  	
    const _this = this
    let now = moment();
    let dat = this.state.data.dat+" "+this.state.data.end_time;  
    let then = moment(dat);
    let tim = moment.utc(moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm")
    let txt = tim.split(":")
    this.setState({ h1: txt[0][0], h2: txt[0][1], m1: txt[1][0], m2: txt[1][1]  })
    if(tim !== '00:00'){
      setInterval(function(){
          _this.coutTime()
      }, 60000); 
    } else {
      	this.setState({ isOpen: false, })
    }    
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



  render () {  
  	let item = this.state
  	let data = this.state.data
  	console.log('ddd',data)
  	let img = imgURL+data.img

    return(
    <Layout page="flashsale">   
        <div className="container"> 
			<div className="row">
			    <div className="col-sm-9 offset-sm-1" >
		     		<section className="falsesale sectionTop" >
		     		  <br/><br/>
			          <header className="flash-header">
			          {
			          	item.isOpen ?
			            <h3>
				            Flash Sale <span className="txt-gray">จะสิ้นสุดใน</span> 
				            <span className="txt-box"><span className="txt-min">{item.h1}</span></span> 
				            <span className="txt-box"><span className="txt-min">{item.h2}</span></span>
				            <span className="txt-sl">:</span>
				            <span className="txt-box"><span className="txt-min">{item.m1}</span></span> 
				            <span className="txt-box"><span className="txt-min">{item.m2}</span></span>              
			            </h3>
			          	:
			            <h3>
				            Flash Sale <small>สิ้นสุดการขาย</small>		                       
			            </h3>	          	
			          }
			          </header> 
		    
						<div className="row">
						    <div className="col-md-6" >
						     	<img className="img-fluid img-thumbnail" src={img} />
						    </div>
						    <div className="col-md-6" >
								<h3 className="txt-green">{data.pname}</h3>
								<div className="row">
								    <div className="col-md-12 min-100" >{data.title}</div>
								</div>
								<div className="row">
								    <div className="col-md-12 price-text" >
								    	<span className="text-danger font-40">{parseFloat(data.price_sale).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
								    	<i className="fa fa-share-alt pull-right mgt-10 font-30" />
								    </div>
								</div>	
								<div className="row">
								    <div className="col-md-12" >
										<span>&#3647;{parseFloat(data.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}-{data.discount}%</span>
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
								{
									item.isOpen ?
										<div className="row">
										    <div className="col-md-12" >
											<ShopBox data={data} qty={item.qty} mode='F' typ='data.typ' img={img} />	
										    </div>
										</div>
									: null
								}																			




						      
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
						    <div className="col-md-12 mgt-30" ><h4>รายละเอียดโปรดมชั่น</h4></div>
						</div>
						<div className="row">
						    <div className="col-md-12" ><p>{data.detail}</p></div>
						</div>


		     		 </section>


			    </div>
			</div>
        </div>
    </Layout>
    )
  }
}