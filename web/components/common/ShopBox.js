import React from 'react'
import Router from 'next/router'
import moment from 'moment'
export default class ShopBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], qty: 1
    } 
    this.handleAddtoCart = this.handleAddtoCart.bind(this)  
    this.handleBuy = this.handleBuy.bind(this) 
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }


  componentWillReceiveProps(nextProps){
   // console.log(nextProps)         
  }

  handleAddtoCart(){
    let {data, qty, mode, typ, img} = this.props 
    let cart = JSON.parse(localStorage.getItem('ms_cart'));
    if(!cart && cart === null){  cart = [] } 

    let id = '', name = '', price = 0, price_sale = 0, price_total = 0, wg = 0, send= 'Y'; 
    switch(mode){
      case 'P':
        id = data.id; name = data.product_name
        price = parseFloat(data.price) * qty
        price_sale = parseFloat(data.price)
        price_total = parseFloat(data.price)
        wg = parseFloat(data.wg)
      break
      case 'PR':
        id = data.id; name = data.promotion_name
        price = parseFloat(data.price_sale) * qty
        price_sale = parseFloat(data.price_sale)
        price_total = parseFloat(data.price_total)
        //if(data.mode === 'N'){  send = 'N'; }
        send = 'N'
      break
      case 'TR':
        id = data.id; name = data.product_name
        price = parseFloat(data.price) * qty
        price_sale = parseFloat(data.price)
        price_total = parseFloat(data.price)
        send = 'N'
      break

    }

    

    let temp = {
      uid: mode+typ+id,
      mode : mode,
      typ : typ,   
      id : id,
      name : name,
      qty : qty,
      unit : data.unit,
      wg: wg,
      price : price,
      price_sale : price_sale,
      price_total : price_total,
      img: img,
      send: send
    }

   // console.log('add',temp)

   
    if(cart.length > 0){
      let idx = cart.findIndex((x) => x.uid === temp.uid);     
      if(idx !== -1){
        cart[idx].qty = qty
        cart[idx].price = price
        cart[idx].wg = wg
        cart[idx].img = img
      } else {
        cart.push(temp)
      }
    } else {
      cart.push(temp)
    }    
    localStorage.setItem('ms_cart', JSON.stringify(cart));  
    this.props.onUpdate()
    show_err('success','เพิ่มรายการไปยังรถเข็นเรียบร้อย...') 

  }

  handleBuy(){
    let {data, qty, mode, typ, img} = this.props 
    let cart = JSON.parse(localStorage.getItem('ms_cart'));
    if(!cart && cart === null){  cart = [] } 

    let id = '', name = '', price = 0, price_sale = 0, price_total = 0, wg = 0, send= 'Y'; 
    switch(mode){
      case 'P':
        id = data.id; name = data.product_name
        price = parseFloat(data.price) * qty
        price_sale = parseFloat(data.price)
        price_total = parseFloat(data.price)
        wg = parseFloat(data.wg)
      break
      case 'PR':
        id = data.id; name = data.promotion_name
        price = parseFloat(data.price_sale) * qty
        price_sale = parseFloat(data.price_sale)
        price_total = parseFloat(data.price_total)
        // if(data.mode === 'N'){  send = 'N'; }
        send = 'N';
      break
      case 'TR':
        id = data.id; name = data.product_name
        price = parseFloat(data.price) * qty
        price_sale = parseFloat(data.price)
        price_total = parseFloat(data.price)
        send = 'N'
      break
    }    

    let temp = {
      uid: mode+typ+id,
      mode : mode,
      typ : typ,   
      id : id,
      name : name,
      qty : qty,
      unit : data.unit,
      wg: wg,
      price : price,
      price_sale : price_sale,
      price_total : price_total,
      img: img,
      send: send

    }

   
    if(cart.length > 0){
      let idx = cart.findIndex((x) => x.uid === temp.uid);     
      if(idx !== -1){
        cart[idx].qty = qty
        cart[idx].price = price
        cart[idx].wg = wg
        cart[idx].img = img
      } else {
        cart.push(temp)
      }
    } else {
      cart.push(temp)
    }    
    localStorage.setItem('ms_cart', JSON.stringify(cart)); 
    Router.push({
        pathname: '/cart',
    })   
  }




  render () {
  	const {data} = this.props

  	return(
	<div className="row">
	    <div className="col-md-12" >
        <button type="button" className="bg-green card-green" onClick={this.handleAddtoCart} >
          <i className="fa fa-shopping-cart font-40 "></i><br/>
          <span>เพิ่มไปยังรถเข็น</span>
        </button>
        <button type="button" className="bg-red card-red" onClick={this.handleBuy}>
          <h2 className="font-01">ซื้อสินค้า</h2>
        </button>

	    </div>
	</div>
  	)
  }
}