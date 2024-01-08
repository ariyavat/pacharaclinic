import React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import Review from '../components/review/Review'   
import * as config from '../config';

const imgURL = `${config.init.web_url}static/img/menu/`;
export default class extends React.Component {
  componentDidMount () {    
  	//
  }

  handleMenuclick(url){ //pathname: '/products',
	Router.push({
	    pathname: url,
	})	
  }


  render () {      
    return(
    <Layout page="reviews">   
        <div className="container-fluid">  	
	    	<div className="moble-menu-list">

		        <div className="row mgt-20">            
		        	<div className="col-4 mbt" onClick={this.handleMenuclick.bind(this,'/promotions')}>
			  		  	<div className="btn-img"><img className="img-fluid" src={imgURL+'m1.jpg'} /></div>
			  		  	<div className="btn-caption">PROMOTION</div>  
		        	</div>    
		        	<div className="col-4 mbt" onClick={this.handleMenuclick.bind(this,'/products')}>
						<div className="btn-img"><img className="img-fluid" src={imgURL+'m2.jpg'} /></div>
			  		  	<div className="btn-caption">PRODUCT</div>
		        	</div>  
		        	<div className="col-4 mbt" onClick={this.handleMenuclick.bind(this,'/cosmetics')}>
						<div className="btn-img"><img className="img-fluid" src={imgURL+'m3.jpg'} /></div>
			  		  	<div className="btn-caption">COSMETIC</div>
		        	</div>  
		        </div>

		        <div className="row">            
		        	<div className="col-4 mbt" onClick={this.handleMenuclick.bind(this,'/seedoctor')}>
			  		  	<div className="btn-img"><img className="img-fluid" src={imgURL+'m4.jpg'} /></div>
			  		  	<div className="btn-caption">SEEDOCTOR</div>  
		        	</div>    
		        	<div className="col-4 mbt" onClick={this.handleMenuclick.bind(this,'/reviews')}>
						<div className="btn-img"><img className="img-fluid" src={imgURL+'m5.jpg'} /></div>
			  		  	<div className="btn-caption">REVIEW</div>
		        	</div>  
		        	<div className="col-4 mbt" onClick={this.handleMenuclick.bind(this,'/contact')}>
						<div className="btn-img"><img className="img-fluid" src={imgURL+'m6.jpg'} /></div>
			  		  	<div className="btn-caption">CONTACT US</div>
		        	</div>  
		        </div>

		        <div className="row">            
		        	<div className="col-4 mbt" >
		        	<a href="https://www.facebook.com/Pacharaclinic">
			  		  	<div className="btn-img"><img className="img-fluid" src={imgURL+'m7.jpg'} /></div>
			  		  	<div className="btn-caption">FACEBOOK</div>  
			  		</a>
		        	</div>    
		        	<div className="col-4 mbt">
		        	<a href="https://line.me/R/ti/p/%40pacharaclinic">
						<div className="btn-img"><img className="img-fluid" src={imgURL+'m8.jpg'} /></div>
			  		  	<div className="btn-caption">LINE</div>
			  		  </a>
		        	</div>  
		        	<div className="col-4 mbt" >
		        	<a href="https://www.instagram.com/Pacharaclinic/">
						<div className="btn-img"><img className="img-fluid" src={imgURL+'m9.jpg'} /></div>
			  		  	<div className="btn-caption">INSTAGRAM</div>
			  		</a>
		        	</div>  
		        </div>




	    	</div>	         
        </div>
    </Layout>
    )
  }
}
