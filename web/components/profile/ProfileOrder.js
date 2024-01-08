import React from 'react'
import Router from 'next/router'
import moment from 'moment';

import { getOrders } from '../../utils/OrderAPI'
export default class ProfileOrder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false,
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


  handlePayment(order,e){
  	e.preventDefault()

       
    localStorage.setItem('ms_order', JSON.stringify(order));  
    localStorage.setItem('ms_order_list', JSON.stringify(order.detail));  
 
    Router.push({
        pathname: '/cart',
        query: { checkout: 'payment' }
    })

    window.scrollTo(0,0)
  }


  render () {
  const item = this.state
  const rows = item.data.map((row, i) => {   
    let sumQty = 0
  

    const item = row.detail.map((val, j) => { 
      sumQty = sumQty + parseFloat(val.qty)
      return(
      <div className="row" key={j} > 
        <div className="col-2 col-md-1 mgt-10"><img className="img-fluid" src={val.img} /></div>
        <div className="col-10 col-md-7">{val.name}</div>
        <div className="col-6 col-md-2"><small className="pull-left ">จำนวน {val.qty} {val.unit}</small></div>
        <div className="col-6 col-md-2 text-right"><small className="pull-left ">ราคา {parseFloat(val.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</small></div>
      </div> 
      )
    })
    
    return (  
    <div className="row" key={i} > 
      <div className="col-md-12 mgt-10 bg-cart-gray pad-10">
            <div className="row">   
              <div className="col-md-3">วันที่ {moment(row.dat).format('DD-MM-YYYY')}</div> 
              <div className="col-md-3">เลขที่คำสั่งซื้อ <span className="txt-red">{row.ino}</span></div> 
            </div> 
            <hr/>
            {item} 
            <hr/>
            <div className="row">            
              <div className="col-md-6">
                <h5>สถานะสินค้า</h5>
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
                    <div className="col-md-11 offset-md-1 font-20 txt-red">
                      รอตรวจสอบการชำระเงิน
                    </div> 
                  </div>              
                  : null
                }
 
                {
                  row.status === 'PAYMENT' && row.send_status === 'CONFIRM' ?
                  <div className="row">   
                    <div className="col-md-11 offset-md-1 font-20 text-warning">
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
              <div className="col-md-6">

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
                    <h4>ยอดรวมทั้งสิ้น&nbsp;&nbsp;&nbsp;<span className="txt-red">{ parseFloat(parseFloat(row.price_total) - parseFloat(row.price_dis) + parseFloat(row.price_send)).toLocaleString('en-US', {minimumFractionDigits: 2})}  บาท</span></h4>  
                  </div>
                </div>

              </div>
            </div> 







      </div> 
    </div>  
    ) 
  })    
  
	return(
  <div>
      <div className="row">   
        <div className="col-md-12">
          <h4 className="txt-gn">รายการสั่งซื้อ / แจ้งชำระเงิน</h4>
        </div> 
      </div>  

      {rows}

    <br/>
  </div>
	)   
  }
  //
  getData(){
    const _this = this

    let data = JSON.parse(localStorage.getItem('ms_profile'));  
    if(data !== null){     
      this.setState({ loading: true },()=>{
          getOrders('WEB',data.uid)
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