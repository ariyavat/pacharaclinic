import React from 'react'
import NextHead from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import Container from './common/Container' 
import Icon from './common/Icon'

export default class Navbar extends React.Component {
    constructor (props) {
      super(props);      
      this.state = {
        loading: false, page: '', empname: '-', mcls : 'fa fa-bars'
      }
      this.handleSingout = this.handleSingout.bind(this)
    }

  	componentDidMount () {
    	const data = JSON.parse(localStorage.getItem('msClinic'))	
    	if(data!==null){ 
    		this.setState({ empname: data.emp_name })
    	}
    	this.setState({ mcls: 'fa fa-bars' },()=>{ 
    		//console.log('sdfsdf')
    	})    
  	}

  	handleSingout(e){
  		e.preventDefault()
  		localStorage.clear()
      	Router.push({
        	pathname: '/'
      	})     		
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
  	<header id="header" >
	    <div className="container">    	
	    <div className="row">
	    	<div className="col-12">
		    	<div className="h-left">
			        <div className ="bmenu-active" onClick={this.handleMenuClick.bind(this,'/')}>
			          <i className="fa fa-home mgt-5 font-30" /><br/>
			          <small>Home</small>
			        </div>


		    	</div>
		    	<div className="h-center min-70">
		    		<div className="logo brand">
			        <a href="/" ><img src="../static/img/logo.png" alt="" className="img-fluid" /></a>
			      </div>

		    	</div>
		    	<div className="h-right">R</div>
	    	</div>
	    </div>


	    	
	    	<div className="row">
	    		<div className="col-md-12">
			      <nav className="main-nav float-left d-none d-lg-block font-menu">

			        <ul>
			          <li className={ page === 'home' ? 'active' : '' } ><Link href="/">HOME</Link></li>
			          <li className={ page === 'promotions' ? 'active' : '' }><Link href="/promotions">PROMOTIONS</Link></li>
			          <li className={ page === 'products' ? 'active' : '' } ><Link href="/products">PRODUCT</Link></li>	   
			          <li className={ page === 'cosmetic' ? 'active' : '' } ><Link href="/cosmetics">COSMETIC</Link></li>	 
			          <li className={ page === 'reviews' ? 'active' : '' }><Link href="/reviews">REVIEW</Link></li>
			          <li className={ page === 'about' ? 'active' : '' }><Link href="/about">ABOUT</Link></li>
			          <li className={ page === 'contact' ? 'active' : '' }><Link href="/contact">CONTACT US</Link></li> 

			        </ul>
			      </nav>
			      <nav className="main-nav float-right d-none d-lg-block">
			        <ul>

			          <li className="text-center">
			          	<a href="/cart">
			          	 	{
			          	    	page === 'cart' ?
			          	    	<i className="fa fa-opencart txt-gn"></i>
			          	    	:
			          	    	<i className="fa fa-shopping-cart txt-gn"></i>
			          	    }	          		
			          		<br/><small className="txt-gn">&nbsp;&nbsp;&nbsp;รถเข็น</small>
			          	</a>
			          </li>
			          <li className="text-center">
			          	<a href="/profile">
			          	 	{
			          	    	page === 'profile' ?
			          	    	<i className="fa fa-user"></i>
			          	    	:
			          	    	<i className="fa fa-user txt-gn"></i>
			          	    }	          		
			          		<br/><small className="txt-gn">&nbsp;&nbsp;บัญชี</small>
			          	</a>
			          </li>
			        </ul>

			      </nav>

			      <nav className="mobile-nav">
			        <ul>
			          <li className={ page === 'home' ? 'active' : '' } ><Link href="/">HOME</Link></li>
			          <li className={ page === 'promotions' ? 'active' : '' }><Link href="/promotions">PROMOTIONS</Link></li>
			          <li className={ page === 'products' ? 'active' : '' } ><Link href="/products">PRODUCT</Link></li>	   
			          <li className={ page === 'cosmetic' ? 'active' : '' } ><Link href="/cosmetics">COSMETIC</Link></li>	 
			          <li className={ page === 'reviews' ? 'active' : '' }><Link href="/reviews">REVIEW</Link></li>
			          <li className={ page === 'about' ? 'active' : '' }><Link href="/about">ABOUT</Link></li>
			          <li className={ page === 'contact' ? 'active' : '' }><Link href="/contact">CONTACT US</Link></li> 			        
			        </ul>
			      </nav>



	    		</div>
	    	</div>
	      
	    </div>

    <NextHead>   
    	<script src="/static/lib/mobile-nav/mobile-nav.js"></script>
    </NextHead>



  	</header>
	)		
	}
}
