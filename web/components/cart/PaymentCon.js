import React from 'react'
import Router from 'next/router'
import moment from 'moment';
export default class PaymentCon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      order: [], order_list:[], loading: false,
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	let order = JSON.parse(localStorage.getItem('ms_order'));  
  	let order_list = JSON.parse(localStorage.getItem('ms_order_list')); 
  	this.setState({order: order, order_list: order_list})
  }



  render () {
    const item = this.state
  	let sumQty = 0

  	const rows = item.order_list.map((row, i) => {   
  	  sumQty = sumQty + parseFloat(row.qty)
      return (  
		<div className="row" key={i} > 
			<div className="col-2 col-md-2"><img className="img-fluid img-thumbnail" src={row.img} /></div>
			<div className="col-10 col-md-10">
				{row.name}<br/>
				<small className="pull-left ">จำนวน {row.qty} </small>
				<small className="pull-right ">{parseFloat(row.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</small>
			</div>
		</div>  
      ) 
  	})  



	return(
	<section className="bg-White sectionTop" >		
        <div className="row"> 
        	<div className="col-md-6 offset-md-3">
        	    <h3>การสั่งซื้อเรียบร้อยแล้ว</h3>
				<div className="row"> 
					<div className="col-md-12 bg-cart-gray ">
		        	    <br/>		        		
						<div className="row"> 
							<div className="col-sm-12 col-12"><h5>เลขที่คำสั่งซื้อ  <span className="txt-red">{item.order.ino}</span></h5></div>
						</div>
						<div className="row"> 
							<div className="col-sm-12"><b>ข้อมูลลูกค้า</b></div>
						</div>
						<div className="row"> 
							<div className="col-sm-11 offset-md-1">
								{item.order.customer_name}<br/>
							 	เบอร์โทร :  {item.order.tel}<br/>
							 	ที่อยู่ :  {item.order.address} {item.order.zip}
							</div>
						</div>
						<div className="row"> 
							<div className="col-sm-8"><b>รายละเอียดการสั่งซื้อ</b></div>
						</div>
						<br/>
						{rows}						
						<hr/>
			  	        <div className="row">            
			  	        	<div className="col-sm-8">ยอดรวม {sumQty.toLocaleString('en-US', {minimumFractionDigits: 0})} ชิ้น</div>
			  	        	<div className="col-sm-4 text-right">{parseFloat(item.order.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
			  	        </div> 
			  	        <div className="row">            
			  	        	<div className="col-sm-8">ส่วนลด </div>
			  	        	<div className="col-sm-4 text-right">{parseFloat(item.order.price_dis).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
			  	        </div> 

			  	        <div className="row">            
			  	        	<div className="col-sm-8">ค่าจัดส่ง</div>
			  	        	<div className="col-sm-4 text-right">{parseFloat(item.order.price_send).toLocaleString('en-US', {minimumFractionDigits: 2})}</div> 
			  	        </div> 
			  	        <div className="row">            
			  	        	<div className="col-sm-12 mgt-40 text-right">
			  	        		<h4>ยอดรวมทั้งสิ้น&nbsp;&nbsp;&nbsp;<span className="txt-red">{ parseFloat(parseFloat(item.order.price_total) - parseFloat(item.order.price_dis) + parseFloat(item.order.price_send)).toLocaleString('en-US', {minimumFractionDigits: 2})}  บาท</span></h4>  
			  	        	</div>
			  	        </div> 
			  	        <br/>
					
					</div>
				</div>



	

  	        </div> 


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