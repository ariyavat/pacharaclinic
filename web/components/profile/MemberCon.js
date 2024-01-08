import React from 'react'
import Router from 'next/router'
import moment from 'moment';
export default class MemberCon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     loading: false,
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

	return(
	<section className="bg-White sectionTop" >		
        <div className="row"> 
        	<div className="col-md-6 offset-md-3">
        	    <h3>แจ้งการชำระเงินค่าสมัครสมาชิกเรียบร้อยแล้ว</h3>
				<div className="row"> 
					<div className="col-md-12 bg-cart-gray text-center">
		        	    <br/><br/><br/><br/><br/><br/>			        		
						<h1 className="txt-gn">รอการยืนยันการสมัครสมาชิก</h1>
						<br/><br/><br/><br/><br/><br/>						
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