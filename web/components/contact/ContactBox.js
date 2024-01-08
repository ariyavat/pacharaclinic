import React from 'react'
import Router from 'next/router'
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/contacts/`;
export default class ContactBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }


  render () {
  	const {data} = this.props
  	let img = imgURL+data.img
  	let map = imgURL+data.map
  	let line = imgURL+data.img_line
  	let fb = imgURL+data.img_fb

  	let tel = data.tel.split(",");


  	return(
    <div className="row">
        <div className="col-md-12" >
  
	        <div className="row">            
	        	<div className="col-sm-12 ">
		  		    <header className="review-header">				  		    
		  		      <h3>พชรคลินิก <small>{data.name}</small> </h3>
		  		    </header>
	        	</div>     
	        </div>
	        <div className="row">            
	        	<div className="col-sm-5">
			        <div className="row">            
			        	<div className="col-12">
							<img className="d-block w-100" src={map} />
			        	</div>   
			        </div>
			        <div className="row">            
			        	<div className="col-6">
			        	    <span>LINE</span>
							<img className="d-block w-100" src={line} />
			        	</div>   
			        	<div className="col-6">
			        	    <span>FACEBOOK</span>
			        		<img className="d-block w-100" src={fb} />
			        	</div>
			        </div>					
	        	</div>    
	        	<div className="col-sm-7">
			        <div className="row">            
			        	<div className="col-sm-12">
							<img className="d-block w-100" src={img} />
			        	</div>  
			        </div>
			        <div className="row">            
			        	<div className="col-sm-12 mgt-10">
							<h4 className="txt-green">พชรคลินิก <br/> <small>{data.name}</small> </h4>
							<p>{data.address}</p>
							<h5 className="txt-green">
							{
								tel.map((row, i) => {
									return (
									   <a href={"tel:"+row} target="_blank" className="txt-green mr-10">
										<i className="fa fa-phone-square" />&nbsp;&nbsp;{row} &nbsp;&nbsp;&nbsp;&nbsp;
									   </a>
									)
								})
							}

							</h5>
			        	</div>  
			        </div>						        		
	        	</div>   
	        </div>
	        <br/>



        </div>
    </div>
  	)
  }
}