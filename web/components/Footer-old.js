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
	const { page } = this.props
	 	return(
	      <div className="moble-menu xs-visible">

<div className="row">
        <div className="col col-sm-6 col-md-4 col-lg-3">col 1</div>
        <div className="col col-sm-6 col-md-4 col-lg-3">col 2</div>    
        <div className="col col-sm-6 col-md-4 col-lg-3">col 3</div>
        <div className="col col-sm-6 col-md-4 col-lg-3">col 4</div>
      </div>



	        <div className ={ page === 'home' ? 'bmenu-active' : 'bmenu' } onClick={this.handleMenuClick.bind(this,'/')}>
	          <i className="fa fa-home mgt-5 font-30" /><br/>
	          <small>Home</small>
	        </div>
	        <div className={ page === 'menu' ? 'bmenu-active' : 'bmenu' } onClick={this.handleMenuClick.bind(this,'/menu')} > 
	          <i className="fa fa-list mgt-5 font-30" /><br/>
	          <small>หมวดหมู่</small>
	        </div>
	        <div className={ page === 'cart' ? 'bmenu-active' : 'bmenu' } onClick={this.handleMenuClick.bind(this,'/cart')}>
	          <i className="fa fa-shopping-cart mgt-5 font-30" /><br/>
	          <small>รภเข็น</small>
	        </div>
	        <div className={ page === 'profile' ? 'bmenu-active' : 'bmenu' } onClick={this.handleMenuClick.bind(this,'/profile')}>
	          <i className="fa fa-user font-30 mgt-5"></i><br/>
	          <small>บัญชี</small>
	        </div>

	      </div>
		)		
	}
}
