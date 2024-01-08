import React from 'react'
import Router from 'next/router'
import moment from 'moment'
//import PromotionBox from './PromotionBox' 
// PromotionDetail from './PromotionDetail' 
//import FlashHome from '../flashsale/FlashHome' 

import { createOrder } from '../../utils/OrderAPI'
import { updateCustomer, getMsCustomer } from '../../utils/CustomerAPI'

export default class ShopList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], tempList: [], loading: false, qty: 1, dis: 0, customer: null, send_price: 0, sumQty: 0, sumPrice: 0, discount: 0, totalPrice: 0,
      ino: '',uid: '',customer_name: '', sum_qty: 0, sumPrice: 0, send_price: 0, 
      address: '', zip: '', tel: '', status: 'NONE', slip: '', pay_date:'', pay_time:'', pay_total:'',
      isEdit: false, adr: '', tm: '', am: '',
    }  
   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
  	this.getDatas() 
  }

  componentDidMount () { 
  	this.getDatas() 
  	//setInterval(this.getDatas(), 100);
  	
  }

  getSumprice(){
    let dis = this.state.dis
    let cart = JSON.parse(localStorage.getItem('ms_cart'));  
    
    let sumPrice = 0, sumQty = 0, weight = 0, discount = 0, totalPrice=0, sumDis = 0, send_price= 0;
    if(!cart && cart === null){  cart = [] }     

    //console.log('shopcart',cart)
    cart.forEach(function(row){           
          totalPrice = totalPrice +  parseFloat(row.price)   
          sumPrice = sumPrice +  parseFloat(row.price)  
          sumQty = sumQty +  parseFloat(row.qty)  
          if(row.send==='Y'){
            //sumDis = sumDis + parseFloat(row.price) 
            send_price = 100
          }

          if(row.mode === 'P'){
            sumDis = sumDis + parseFloat(row.price)             
          }

         // weight = weight +  parseFloat(row.wg) * parseFloat(row.qty)        
    }) 
    /*
    if(weight > 0){
      if(weight >= 1000 && weight < 2000){
        send_price = 150
      } else if(weight >= 2000){
        send_price = 200
      }
    }
    */
    
    discount = (sumDis * dis) / 100;
    totalPrice = (totalPrice - discount) +  send_price    
    this.setState({ 
      tempList : cart, send_price : send_price,
      send_price: send_price, sumQty: sumQty, sumPrice: sumPrice, totalPrice: totalPrice, discount: discount
    
    })
  }


  getDatas(){
    const _this = this 
     //console.log('sss')
    let customer = JSON.parse(localStorage.getItem('ms_profile'));
    let address = '', zip = '', tel = '', customer_name = '', adr = '', tm = '', am = '', province = '', dis = 0;
    if(customer !== null){
      customer_name = customer.fullname
      address = customer.address+ 'ต.'+customer.tm+ 'อ.'+customer.am+ 'จ.'+customer.province
      zip = customer.zip
      tel = customer.tel
      tm = customer.tm
      am = customer.am
      province = customer.province


      getMsCustomer(customer.id)
      .then(function(response) {
        if(response.data.status === '200'){
            let level = response.data[0].level 
            if(level === 'S'){ dis = 5; }
            if(level === 'G'){ dis = 10; }
            if(level === 'P'){ dis = 15;  }   
            if(level === 'D'){ dis = 10;  }
        }        
        _this.setState({ 
          customer: customer, customer_name: customer_name, address: address, tel: tel, zip: zip,
           adr: adr, tm: tm, am : am, province: province, dis: dis
        },()=>{
          _this.getSumprice()
        })        
      })
    } else {
      this.getSumprice()
    }
  }

  handleOnChange(i,e){
  	e.preventDefault()  
  	let qty = parseFloat(e.target.value)  
  	let List = this.state.tempList
  	List[i].qty = qty
  	List[i].price = parseFloat(this.state.tempList[i].price_sale) * qty  
  	this.setState({ tempList: List },()=>{
  		localStorage.setItem('ms_cart', JSON.stringify(List));  
      this.getSumprice()
  	})	
  }



  handleDeleteItem(i,e){
  	e.preventDefault()  
  	let List = this.state.tempList
  	List.splice(i, 1);
  	this.setState({ tempList: List },()=>{
  		localStorage.setItem('ms_cart', JSON.stringify(List));  
      this.getSumprice()
  		show_err('success','ลบรายการสินค้าเรียบร้อยแล้ว...') 
  	})	
  }



  render () {
    	const item = this.state
      	const rows = item.tempList.map((row, i) => {   

          return (  
	        <div className="row" key={i} >            
	        	<div className="col-sm-12 col-12  bg-cart-gray border-bottom min-100 pad-10 ">
		  	        <div className="row">
		  	        	<div className="col-4 col-sm-7 d-none d-sm-block">{row.name}</div>
		  	        	<div className="col-7 col-sm-3 text-center">		  	        		
		  	        		<span className="text-danger">{parseFloat(row.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</span><br/>
    								  	        		
		  	        	</div>
		  	        	<div className="col-2 col-sm-2">
							       <a onClick={this.handleDeleteItem.bind(this,i)} className="text-danger alink font-17 pull-right"><i className="fa fa-trash" /></a>
		  	        	</div>
		  	        </div>  
	        	</div>
	        </div>  
          ) 
      	})  
  
    	return(
    	
    	
  	        <div className="row">            
  	        	<div className="col-sm-12">
		  	        <div className="row">            
		  	        	<div className="col-sm-11 bg-green line-50">
				  	        <h5 className="font-white">รายการสินค้าในตะกร้า</h5> 

		  	        	</div>
		  	        </div> 
		  	        <div className="row">            
		  	        	<div className="col-sm-11 bg-cart-gray min-200 ft-13">
			  	        {
			  	        	item.tempList.length > 0?
							        rows
			  	        	: null
			  	        }




			  	        {
			  	        	item.tempList.length > 0?
				  	        <div className="ft-13">

	                          <b>สรุปข้อมูลการสั่งซื้อ</b>
	             

	                          <div className="row">            
	                            <div className="col-sm-8">ส่วนลด</div>
	                            <div className="col-sm-4 text-right text-red">{item.discount.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
	                          </div> 

	                          <div className="row">            
	                            <div className="col-sm-8">ค่าจัดส่ง</div>
	                            <div className="col-sm-4 text-right">{item.send_price.toLocaleString('en-US', {minimumFractionDigits: 2})}</div> 
	                          </div> 
	                          <div className="row">            
	                            <div className="col-sm-12 mgt-40 text-right">
	                              <b>ยอดรวมทั้งสิ้น&nbsp;&nbsp;&nbsp;<span className="txt-red">{item.totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}  บาท</span></b>  
	                            </div>
	                          </div> 
				  	        </div>
			  	        	: null
			  	        }



		  	        	</div>
		  	        </div> 

              <div className="row">            
                  <div className="col-sm-11  line-50">
                    <small className="txt-red">**หมายเหตุ (ด้านล่างรวมยอดรายการ) </small><br/>
                    <small className="txt-red">
                      **ทางAdminจะดำเนินการตรวจสอบภายใน 24 ชั่วโมงและทำการจัดส่งสินค้า
                    </small>
                  </div>
                </div> 



	
  	        	</div>
  	        </div>
		
    	)   
  }



}