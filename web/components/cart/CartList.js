import React from 'react'
import Router from 'next/router'
import moment from 'moment'
//import PromotionBox from './PromotionBox' 
// PromotionDetail from './PromotionDetail' 
//import FlashHome from '../flashsale/FlashHome' 

import { createOrder } from '../../utils/OrderAPI'
import { updateCustomer, getMsCustomer } from '../../utils/CustomerAPI'

export default class CartList extends React.Component {
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


  componentDidMount () {   
    const _this = this  
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

  getSumprice(){
    let dis = this.state.dis
    let cart = JSON.parse(localStorage.getItem('ms_cart'));  

    let sumPrice = 0, sumQty = 0, weight = 0, discount = 0, totalPrice=0, sumDis = 0, send_price= 0;
    if(!cart && cart === null){  cart = [] }     

   // console.log('dd',cart)
    cart.forEach(function(row){           
          totalPrice = totalPrice +  parseFloat(row.price)   
          sumPrice = sumPrice +  parseFloat(row.price)  
          sumQty = sumQty +  parseFloat(row.qty) 
         // sumDis = sumDis + parseFloat(row.price)  
          if(row.send==='Y'){            
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


    // let total = parseFloat(data.price);
    // discount = (total * dis) / 100;
    // discount = Math.floor(discount);


    discount = (sumDis * dis) / 100;
    discount = Math.floor(discount);    
    totalPrice = (totalPrice - discount) +  send_price    




    this.setState({ 
      tempList : cart, send_price : send_price,
      send_price: send_price, sumQty: sumQty, sumPrice: sumPrice, totalPrice: totalPrice, discount: discount
    
    })
  }

  handleAddQty(mode,i,e){
  	e.preventDefault()  	
  	let qty = parseFloat(this.state.tempList[i].qty)  
  	let List = this.state.tempList
  	if(mode === 'D'){
  		qty--
  		if(qty===0){ qty = 1 }
  	} else {
  		qty++
  	}
  	List[i].qty = qty
  	List[i].price = parseFloat(this.state.tempList[i].price_sale) * qty
  	this.setState({ tempList: List },()=>{
  		localStorage.setItem('ms_cart', JSON.stringify(List));  
      this.getSumprice()
  	})
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

  handleDeleteAll(e){
  	e.preventDefault() 
  	let List = []
  	this.setState({ tempList: List },()=>{
  		localStorage.setItem('ms_cart', JSON.stringify(List));  
      this.getSumprice()
  		show_err('success','ลบรายการสินค้าเรียบร้อยแล้ว...') 
  	})	  	

  }

  handleEditAddress(mode){ 
    let view = false
    if(mode==='OPEN'){
      view = true
    }
    this.setState({  isEdit: view })
    
  }

  handleLogin(e){
    e.preventDefault() 
    Router.push({
        pathname: '/profile',
        query: { login: 'cart' }
    })
  }

  handleEditData(e){
    e.preventDefault()
    const item = this.state 
    const _this = this
    let temp = {
      address: item.adr, 
      tm: item.tm,
      am: item.am,
      province: item.province,
      zip: item.zip
    }
    let data = { data: temp, uid: item.customer.uid }
    updateCustomer(data)
    .then(function(response) {         
        let List = []
        if(response.data.status === '200'){   
          let address = item.adr+ 'ต.'+item.tm+ 'อ.'+item.am+ 'จ.'+item.province
          _this.setState({ isEdit: false, address: address })
        }          
    })   
  }

  handlePayment(e){
  	e.preventDefault() 
    if(this.state.customer !== null){


        const _this = this
        const item = this.state


        let List = this.state.tempList
        if(item.tempList.length > 0){
          let data = {
            ino: '-', uid: item.customer.uid, dat: '-', customer_name: item.customer_name, 
            address: item.address, zip: item.zip,tel: item.tel, status: 'NONE', 
            pay_date: '', pay_time: '', pay_total: 0, price_total: item.sumPrice, 
            price_send: item.send_price, price_dis: item.discount, send_status: 'NONE',
            dList: item.tempList
          }


          createOrder(data)
          .then(function(results) { 
            if (results.data.status === '201') {        
              
              let order = results.data.data
              localStorage.setItem('ms_order', JSON.stringify(order));  
              localStorage.setItem('ms_order_list', JSON.stringify(item.tempList));  
              localStorage.removeItem('ms_cart');
              Router.push({
                  pathname: '/cart',
                  query: { checkout: 'payment' }
              })
            } else {  show_err('warning',results.data.msg);  }

          })          
        } else { show_err('warning','ไม่มีรายการสินค้า');  }

    } else { 
        Router.push({
            pathname: '/profile',
            query: { login: 'wahsffd' }
        })
    }

  }




  render () {
    	const item = this.state
      	const rows = item.tempList.map((row, i) => {   

          return (  
	        <div className="row" key={i} >            
	        	<div className="col-sm-11 col-12  bg-cart-gray min-100 pad-10 mgt-20">
		  	        <div className="row">
		  	        	<div className="col-3 col-sm-2"><img className="img-fluid img-thumbnail" src={row.img} /></div>
		  	        	<div className="col-4 col-sm-6 d-none d-sm-block">{row.name}</div>
		  	        	<div className="col-7 col-sm-3 text-center">		  	        		
		  	        		<span className="text-danger font-20">{parseFloat(row.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</span><br/>
    							  <div className="line-qty text-center">
        							<form className="form-horizontal">
                        <button type="button" className="qty-btn-l" onClick={this.handleAddQty.bind(this,'D',i)}  >-</button>									
        								<input  type="text"  className="qty-input" 
        									value={row.qty} 
        									onChange={this.handleOnChange.bind(this,i)}  />
        								<button type="button" className="qty-btn-r" onClick={this.handleAddQty.bind(this,'A',i)}  >+</button>	
        							</form>
    						    </div>		  	        		
		  	        	</div>
		  	        	<div className="col-2 col-sm-1">
							       <a onClick={this.handleDeleteItem.bind(this,i)} className="text-danger alink font-17 pull-right"><i className="fa fa-trash" /></a>
		  	        	</div>
                  <div className="col-12 d-block d-sm-none">{row.name}</div>


		  	        </div>  
	        	</div>
	        </div>  
          ) 
      	})  
  
    	return(
    	<section className="bg-White sectionTop" >
    	
  	        <div className="row">            
  	        	<div className="col-sm-8">
		  	        <div className="row">            
		  	        	<div className="col-sm-11 bg-green ">
				  	        <div className="row">            
				  	        	<div className="col-sm-8 col-8 line-50">
				  	        		<h5 className="font-white">รายการสินค้า</h5>
				  	        	</div>
				  	        	<div className="col-sm-4 col-4 pad-10">
				  	        		<a onClick={this.handleDeleteAll.bind(this)} href="#" className="font-white alink font-20 pull-right"><i className="fa fa-trash" /> ลบทั้งหมด</a>
				  	        	</div>				  	        	
				  	        </div>  

		  	        		
		  	        				  	        		
		  	        	</div>
		  	        </div>  
		  	        {
		  	        	item.tempList.length > 0?
						        rows
		  	        	:
			  	        <div className="row">            
			  	        	<div className="col-sm-11 bg-cart-gray min-500">
			  	        	
			  	        	</div>
			  	        </div>
		  	        }
					

  	        	</div>  

              {
                item.isEdit ?
                <div className="col-sm-4">
                  <div className="row">            
                    <div className="col-sm-12 bg-red text-center line-50">
                      <h5 className="font-gray">แก้ไขที่อยู่</h5>
                    </div>
                  </div> 
                  <div className="row">            
                    <div className="col-sm-12 bg-cart-gray min-500">
                        <br/>
                        <div className="row">            
                          <div className="col-sm-8 txt-red"> ที่อยู่สำหรับจัดส่ง </div>
                          <div className="col-sm-4 txt-red"> 
                            <a onClick={this.handleEditAddress.bind(this,'CLOSE')} href="#" className="txt-red alink pull-right">
                              <i className="fa fa-close" /> ปิด
                            </a>
                          </div>
                        </div> 

                        <div className="row">            
                          <div className="col-sm-12">
                          <form role="form">  
                            <div className="form-group mgt-20">
                              <label >ที่อยู่ *</label>
                              <input type="text" className="reg_inp" name="adr" id="adr" autoComplete="off" 
                                value={item.adr}                  
                                onChange={(e) => this.setState({adr: e.target.value})}/>
                            </div>
                            <div className="form-group mgt-20">
                              <label >ตำบล *</label>
                              <input type="text" className="reg_inp" name="tm" id="tm" autoComplete="off" 
                                value={item.tm}                  
                                onChange={(e) => this.setState({tm: e.target.value})}/>
                            </div>
                            <div className="form-group mgt-20">
                              <label >อำเภอ *</label>
                              <input type="text" className="reg_inp" name="am" id="am" autoComplete="off" 
                                value={item.am}                  
                                onChange={(e) => this.setState({am: e.target.value})}/>
                            </div>
                            <div className="form-group mgt-20">
                              <label >จังหวัด *</label>
                              <input type="text" className="reg_inp" name="province" id="province" autoComplete="off" 
                                value={item.province}                  
                                onChange={(e) => this.setState({province: e.target.value})}/>
                            </div>
                            <div className="form-group mgt-20">
                              <label >รหัสไปรษณีย์ *</label>
                              <input type="text" className="reg_inp" name="zip" id="zip" autoComplete="off" 
                                value={item.zip}                  
                                onChange={(e) => this.setState({zip: e.target.value})}/>
                            </div>



                          </form>
                          </div>
                        </div>  

                    </div>
                  </div>
                  <div className="row">            
                      <div className="col-sm-12 bg-green text-center">
                        <button className="bg-green btn-green" onClick={this.handleEditData.bind(this)}>
                          บันทึกข้อมูล
                        </button>
                        
                      </div>
                    </div>



                </div>
                :

                <div className="col-sm-4">
                  <div className="row">            
                    <div className="col-sm-12 bg-red text-center line-50">
                      <h5 className="font-gray">รายละเอียดการสั่งซื้อ</h5>
                    </div>
                  </div>  
                  <div className="row">            
                    <div className="col-sm-12 bg-cart-gray min-500">
                      <br/>
                      {
                        item.customer !== null ?
                        <div className="row">            
                          <div className="col-sm-8 txt-red"> ที่อยู่สำหรับจัดส่ง </div>
                          <div className="col-sm-4 txt-red"> 
                            <a onClick={this.handleEditAddress.bind(this,'OPEN')} href="#" className="txt-red alink pull-right">
                              <i className="fa fa-edit" /> แก้ไข
                            </a>
                          </div>
                        </div> 
                        :null
                      }
   
                      <br/>
                      {
                        item.customer !== null ?
                              <div className="row">            
                                <div className="col-sm-12 min-200">
                                  {item.customer_name} <br/>
                                  โทร. {item.tel} <br/>
                                  { item.address}  {item.zip}<br/>

                                  
                                </div>
                              </div> 
                        :
                              <div className="row">            
                                <div className="col-sm-12 min-200 text-center font-40">
                                  <h4>ยังไม่ได้ LOGIN</h4>               
                                  <button className="pf-button pf-button4 pf-active" onClick={this.handleLogin.bind(this)}>
                                    เข้าสู่ระบบ
                                  </button>
                              



                                </div>
                              </div>
                      }


                          <b>สรุปข้อมูลการสั่งซื้อ</b>
                          <div className="row">            
                            <div className="col-sm-8">ยอดรวม {item.sumQty.toLocaleString('en-US', {minimumFractionDigits: 0})} ชิ้น</div>
                            <div className="col-sm-4 text-right">{item.sumPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                          </div> 


                          <div className="row">            
                            <div className="col-sm-8">ส่วนลด</div>
                            <div className="col-sm-4 text-right text-red">{item.discount.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                          </div> 



                          <div className="row">            
                            <div className="col-sm-8">ค่าจัดส่ง</div>
                            <div className="col-sm-4 text-right">{item.send_price.toLocaleString('en-US', {minimumFractionDigits: 2})}</div> 
                          </div> 

                          <div className="row">            
                            <div className="col-sm-12 mgt-20 ">
                              <input type="text" className="inp-ku" placeholder="กรุณาระบุคูปองส่วนลด"  />
                              <button className="btn-ku">ตกลง</button>
                            </div>
                          </div> 

                          <div className="row">            
                            <div className="col-sm-12 mgt-40 text-right">
                              <h4>ยอดรวมทั้งสิ้น&nbsp;&nbsp;&nbsp;<span className="txt-red">{item.totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}  บาท</span></h4>  
                            </div>
                          </div> 


                        </div>
                      </div>  
                      <div className="row">            
                        <div className="col-sm-12 bg-red text-center">
                          <button className="btn-buy" onClick={this.handlePayment.bind(this)}>
                            ซื้อสินค้า
                          </button>                          
                        </div>
                      </div>
                      <br/><br/>

                </div> 


              }  
  	        </div> 


			<br/><br/>
    	</section>
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