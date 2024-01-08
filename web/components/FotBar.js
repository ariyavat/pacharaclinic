import React from 'react'
import Router from 'next/router'
import Link from 'next/link'


export default class FotBar extends React.Component {
    constructor (props) {
      super(props);      
      this.state = {
        loading: false, page: '', empname: '-', 
      }
    }

  	componentDidMount () {
  		//
  	}

  	handleMenuClick(url){  	
      	Router.push({
        	pathname: url
      	})     		
  	}

	render(){
	const item = this.state
	const { page, onPen } = this.props
	 	return(
	      <div className="moble-menu d-block d-lg-none">
	   
	        <div className={ page === 'menu' ? 'bmenu-active' : 'bmenu' } onClick={this.handleMenuClick.bind(this,'/menu')} > 
	         
	          <small>หมวดหมู่</small>
	        </div>
	        <div className={ page === 'cart' ? 'bmenu-active' : 'bmenu' } onClick={this.handleMenuClick.bind(this,'/cart')}>
	        
	          <small>รถเข็น</small>
	        </div>
	        <div className={ page === 'profile' ? 'bmenu-active' : 'bmenu' } onClick={this.handleMenuClick.bind(this,'/profile')}>
	        
	          <small>บัญชี</small>
	        </div>

	        <div className='bmenu' onClick={onPen}>
	        
	          <small>ติดต่อ</small>
	        </div>


	      </div>
		)		
	}
}
