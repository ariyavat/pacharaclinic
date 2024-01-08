import React from 'react'
import Router from 'next/router'
import { forgot } from '../../utils/CustomerAPI'
export default class Forgot extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false, email: '', isView : 'FORM'
      
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	//
  }


  handleSubmit(e){
  	e.preventDefault()
  	const item = this.state
  	const _this = this
  	if(item.email !== ''){  	
	
	    forgot(item.email)
	    .then(function(results) { 
	      console.log(results)		   
	      if (results.data.status === '200') {
	      	_this.setState({ isView: 'CON' })
	      } else {
	      	show_err('warning',results.data.message); 
	      }

	    });  		

 	
  	} else { show_err('warning','ยังไม่ได้กรอก Email!')  }
  	
  }


  render () {
    const item = this.state
  
	return(
	<section className="bg-White sectionTop" >
		    {
		    	item.isView === 'FORM'?
			        <div className="row">   
			        	<div className="col-sm-12">
			        	<div className="row">
			        		<div className="col-md-12 text-center">
			        			<div className="profile-userb"><i className="fa fa-key"></i></div>
			        			<span className="font-30 txt-gn mgl-10">การกู้คืนรหัสผ่าน</span>
			        		</div>
			        	</div>

			  	        <div className="row">            
			  	  
			  	        	<div className="col-md-6 offset-md-3"> 
				  	        	<div className="row">            
					  	        	<div className="col-sm-12 bg-cart-gray min-400">	 	  
							            <form role="form">			             
							                <div className="form-group mgt-30">
							                  <label>Email</label>
							                  <input type="text" className="form-control reg_inp" id="email" autoComplete="off" 
							                  	value={item.email}                  
		                  						onChange={(e) => this.setState({email: e.target.value})}/>
							                </div>
							                <div className="row"> 
												<div className="col-sm-12 text-red">
													กรอก Email ที่ใช้ในการสมัครสมาชิก เพื่อรับข้อมูลการเปลี่ยนรหัสผ่าน
												</div>
							                </div>	
							                     

							            </form>	
							            <br/>
					  	        	</div>
					  	        </div>  
			  	        	</div>
			  	        </div> 

			  	        <div className="row">            
			  	        	<div className="col-md-4 offset-sm-4  text-center mgt-30">
				  	        	<div className="row">            
					  	        	<div className="col-sm-12 " >
					  	        		<button className="btn btn-block btn-signup" onClick={this.handleSubmit.bind(this)} >
											แจ้งขอรหัสผ่าน
					  	        		</button>
					  	        	</div>
					  	        </div>  
			  	        	</div>
			  	        </div>

			        	</div> 
			        </div> 

		    	:
		    	<div className="row">   
		        	<div className="col-sm-12">
			        	<div className="row">
			        		<div className="col-md-12 text-center">
			        			<div className="profile-userb"><i className="fa fa-key"></i></div>
			        			<span className="font-30 txt-gn mgl-10">ยืนยันการกู้คืนรหัสผ่าน</span>
			        		</div>
			        	</div>

			        	<div className="row">
			        		<div className="col-md-12 text-center min-300">			        			
			        			<span className="font-30 mgt-200"> รหัสผ่านถูกส่งไปยัง Email ที่ได้ลงทะเบียนไว้แล้ว </span>
			        		</div>
			        	</div>


			        </div>
			    </div>
		    }
 
		<br/><br/><br/><br/>
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