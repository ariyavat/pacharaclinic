import React, { Component } from 'react'
import { Link } from 'react-router'


class Sidebar extends Component {
	constructor(props){
		super(props);
		this.state = { 
      auth: {
            reg: {status: 'N',read: 'N',add: 'N',edit: 'N'} ,
            appointment: 'N', finance: 'N', doctor: 'N', 
            treatment: 'N', store: 'N',
            store: { status: 'N',read: 'N',add: 'N',edit: 'N',in: 'N',out: 'N', adj: 'N'} ,
            service: 'N',
            setting: 'N', report: 'N', gmreport: 'N'
        }
    }
	
	}
	shouldComponentUpdate(_nextProps, nextState) {	
		return (this.props !== _nextProps)  || (this.state !== nextState);  
  }		
	componentDidMount () {			
		//this.setState({  auth:  this.props.auth })
	}
	componentWillReceiveProps(nextProps) {
	  // this.setState({  auth: nextProps.auth })	
	}
	render () {
		//const auth = this.state.auth;
	  return (    
		<aside className="main-sidebar non-printable">
			<section className="sidebar" >

            <ul className="sidebar-menu">
              <li className="header">MAIN MENU</li>           
              <li className="">       
                <Link to="/app/members"  >
                  <i className="fa  fa-circle-o"></i> <span>แจ้งสมัครสมาชิก</span>        
                </Link>                         
              </li>     

     
              <li className="">       
                <Link to="/app/doctortime"  >
                  <i className="fa  fa-circle-o"></i> <span>ตารางแพทย์</span>        
                </Link>                         
              </li> 

              <li className="">       
                <Link to="/app/employeetime"  >
                  <i className="fa  fa-circle-o"></i> <span>ตารางพนักงาน</span>        
                </Link>                         
              </li>

              <li className="">       
                <Link to="/app/seedoctor"  >
                  <i className="fa  fa-circle-o"></i> <span>See Doctor</span>        
                </Link>                         
              </li> 


              <li className="">       
                <Link to="/app/payments"  >
                  <i className="fa  fa-circle-o"></i> <span>แจ้งชำระเงิน</span>        
                </Link>                         
              </li>  

              <li className="">       
                <Link to="/app/sends"  >
                  <i className="fa  fa-circle-o"></i> <span>รอจัดส่ง</span>        
                </Link>                         
              </li> 

              <li className="">       
                <Link to="/app/order_report"  >
                  <i className="fa  fa-circle-o"></i> <span>รายงานการสั่งซื้อสินค้า</span>        
                </Link>                         
              </li>


              <li className="text-center text-white"><h5>----- ตั้งค่าระบบ ------</h5></li>  



              <li className="">       
                <Link to="/app/slide"  >
                  <i className="fa  fa-circle-o"></i> <span>Slide</span>        
                </Link>                         
              </li>  
              <li className="">       
                <Link to="/app/vdo"  >
                  <i className="fa  fa-circle-o"></i> <span>VDO</span>        
                </Link>                         
              </li>  
              <li className="">       
                <Link to="/app/youtube"  >
                  <i className="fa  fa-circle-o"></i> <span>YOUTUBE</span>        
                </Link>                         
              </li> 

             
              <li className="">       
                <Link to="/app/promotion"  >
                  <i className="fa  fa-circle-o"></i> <span>Promotion</span>        
                </Link>                         
              </li>  
              <li className="">       
                <Link to="/app/groups"  >
                  <i className="fa  fa-circle-o"></i> <span>Group Items</span>        
                </Link>                         
              </li>
              <li className="">       
                <Link to="/app/product"  >
                  <i className="fa  fa-circle-o"></i> <span>Product</span>        
                </Link>                         
              </li>   
              <li className="">       
                <Link to="/app/treatment"  >
                  <i className="fa  fa-circle-o"></i> <span>Treatment</span>        
                </Link>                         
              </li>   
 
              <li className="">       
                <Link to="/app/Laser"  >
                  <i className="fa  fa-circle-o"></i> <span>Laser</span>        
                </Link>                         
              </li>  
              <li className="">       
                <Link to="/app/review"  >
                  <i className="fa  fa-circle-o"></i> <span>Review</span>        
                </Link>                         
              </li>  
              <li className="">       
                <Link to="/app/contact"  >
                  <i className="fa  fa-circle-o"></i> <span>Contact</span>        
                </Link>                         
              </li>
              <li className="">       
                <Link to="/app/abouts"  >
                  <i className="fa  fa-circle-o"></i> <span>Abouts</span>        
                </Link>                         
              </li>
			      </ul>
				
			</section>
		</aside>  	
	    )		
	}

}

export default Sidebar