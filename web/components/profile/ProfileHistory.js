import React from 'react'
import Router from 'next/router'
import moment from 'moment';
import ShopList from '../cart/ShopList' 
import { getOrders } from '../../utils/OrderAPI'
export default class ProfileHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false, timers: '',
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentWillReceiveProps(nextProps){
       this.getData()      
  } 
  componentDidMount () {   
    this.getData()
  }

  onUpdate(){
    this.setState({timers: moment().format('YYYYMMDDHHmmss') })
  }

  handleAddItem(data){
    console.log(data)

    //let {data, qty, mode, typ, img} = this.props 
    let qty = data.qty, typ = data.typ, mode = data.mode, img = data.img
    let cart = JSON.parse(localStorage.getItem('ms_cart'));
    if(!cart && cart === null){  cart = [] } 

    let id = '', name = '', price = 0, price_sale = 0, price_total = 0, wg = 0, send= 'Y'; 
    switch(mode){
      case 'P':
        id = data.id; name = data.name
        price = parseFloat(data.price) * qty
        price_sale = parseFloat(data.price)
        price_total = parseFloat(data.price)
        wg = parseFloat(data.wg)
      break
      case 'PR':
        id = data.id; name = data.name
        price = parseFloat(data.price_sale) * qty
        price_sale = parseFloat(data.price_sale)
        price_total = parseFloat(data.price_total)
        if(data.mode === 'N'){  send = 'N'; }
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
    this.setState({timers: moment().format('YYYYMMDDHHmmss') })


  }


  render () {
  const item = this.state
  const rows = item.data.map((row, i) => {   
    let sumQty = 0


    const item = row.detail.map((val, j) => { 
      sumQty = sumQty + parseFloat(val.qty)
      return(
      <div className="row" key={j} > 
        <div className="col-12 col-md-12">
          <div className="row" > 
            <div className="col-12 col-md-12 ft-13"> - {val.name}
            {
              val.mode!== 'PR' ?
              <a onClick={this.handleAddItem.bind(this,val)} className="text-warning alink ft-13 pull-right"><i className="fa fa-plus" /> ซื้อซ้ำ</a>
              : null
            }
                    
            </div>
          </div> 
          <div className="row" > 
            <div className="col-6 col-md-6"><small className="pull-left ">จำนวน {val.qty} {val.unit}</small></div>
            <div className="col-6 col-md-6 text-right"><small className="pull-left ">ราคา {parseFloat(val.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</small></div>
          </div> 

        </div>
      </div> 




      )
    })
    let cls = " col-11  bg-cart-gray pad-10 "
    if(i > 0){ cls = cls + " mgt-10 "  }


     // console.log('list',row)
    
    return (  
    <div className="row" key={i} > 
      <div className={cls}>
            <div className="row">   
              <div className="col-6">วันที่ {moment(row.dat).format('DD-MM-YYYY')}</div> 
              <div className="col-6">เลขที่คำสั่งซื้อ <span className="txt-red">{row.ino}</span></div> 
            </div> 
            <hr/>
            {item} 
            <hr/>
            <div className="row">            
              <div className="col-md-6">
                <b>สถานะสินค้า</b>
                {
                  row.status === 'NONE' ?
                  <div className="row">   
                    <div className="col-md-11 offset-md-1">
                    <button className="btn-buy" onClick={this.handlePayment.bind(this, row)}  >
                      แจ้งการชำระเงินชำระเงิน
                    </button>                      
                    </div> 
                  </div>
                : null
                }

                {
                  row.status === 'PAYMENT' && row.send_status === 'NONE' ?
                  <div className="row">   
                    <div className="col-md-11 offset-md-1 font-18  mgt-10 txt-red">
                      รอตรวจสอบการชำระเงิน
                    </div> 
                  </div>              
                  : null
                }
 
                {
                  row.status === 'PAYMENT' && row.send_status === 'CONFIRM' ?
                  <div className="row">   
                    <div className="col-md-11 offset-md-1 font-18 mgt-10 text-warning">
                      รอจัดส่งสินค้า
                    </div> 
                  </div>              
                  : null
                }

                {
                  row.status === 'PAYMENT' && row.send_status === 'COMPLETE' ?
                  <div className="row">   
                    <div className="col-md-11 offset-md-1 font-20 txt-gn">
                      จัดส่งสินค้าแล้ว
                    </div> 
                  </div>              
                  : null
                }

              </div>
              <div className="col-md-6 ft-14">

                <div className="row">            
                  <div className="col-md-6 text-right">ยอดรวม {sumQty.toLocaleString('en-US', {minimumFractionDigits: 0})} ชิ้น</div>
                  <div className="col-md-6 text-right">{parseFloat(row.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                </div> 
                <div className="row">            
                  <div className="col-md-6 text-right">ส่วนลด </div>
                  <div className="col-md-6 text-right">{parseFloat(row.price_dis).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                </div> 
                <div className="row">            
                  <div className="col-md-6 text-right">ค่าจัดส่ง</div>
                  <div className="col-md-6 text-right">{parseFloat(row.price_send).toLocaleString('en-US', {minimumFractionDigits: 2})}</div> 
                </div> 
                <div className="row">            
                  <div className="col-md-12 mgt-40 text-right">
                    <b>ยอดรวมทั้งสิ้น&nbsp;&nbsp;&nbsp;<span className="txt-red">{ parseFloat(parseFloat(row.price_total) - parseFloat(row.price_dis) + parseFloat(row.price_send)).toLocaleString('en-US', {minimumFractionDigits: 2})}  บาท</span></b>  
                  </div>
                </div>

              </div>
            </div> 

      </div> 
    </div>  
    ) 
  })    
  
  return(
  <div className="row">
    <div className="col-md-12">
        <div className="row">   
          <div className="col-md-12">
            <h4 className="txt-gn">ประวัติการสั่งซื้อ</h4>
          </div> 
        </div>  
        <div className="row">   
          <div className="col-8">
            {rows}
          </div> 
          <div className="col-4">
            <ShopList timers={item.timers} />
          </div> 
        </div> 
        

        <br/>
    </div>
  </div>
  )   
  }
  //
  getData(){
    const _this = this
    let data = JSON.parse(localStorage.getItem('ms_profile'));  
    if(data !== null){     
      this.setState({ loading: true },()=>{
          getOrders('WEBHR',data.uid)
          .then(function(response) { 
              let List = []
              if(response.data.status === '200'){   
                List = response.data.data
              } 
              _this.setState({ data: List }) 
          }) 
      })  
    } else {
        Router.push({
            pathname: '/profile',
            query: { login: 'wahsffd' }
        })
    } 

  }
}


