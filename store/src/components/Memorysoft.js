import React, { Component } from 'react'
import moment from 'moment'
import {getCustomer} from '../utils/UserAPI';
class Memorysoft extends Component {
	constructor (props) {
		super(props);	
		this.state = { isLogin: false }	
	}
	componentDidMount () {		
		const data = JSON.parse(localStorage.getItem('msClinic'));
		
		if(data){


		    //const customer = JSON.parse(localStorage.getItem('msCustomer'));     
		    //if(customer){ 
		      var startTime = moment(data.date).format();
		      var endTime = moment().format();
		      var duration = moment.duration(moment(endTime).diff(startTime));
		      var hours = duration.asHours('H');
		      console.log(hours);
		      if(hours > 3){ 		      
		      	localStorage.removeItem('msClinic');  
				this.context.router.push({
			       	pathname: '/login',
			    });	
		      } else {
				this.context.router.push({
		       	 pathname: '/app',
		    	});				      	
		      }
		    //} 
    



		} else {
			this.context.router.push({
	       	 pathname: '/login',
	    	});	
		}

	}
	render () {	
		return(
		<div className="ng-memorysof text-center">
	        <br/><br/><br/><br/><br/><br/><br/>
			<span className="f-100">MEMORYSOFT</span><span className="f-40">co.th</span>
		</div>
		)
	}
}

Memorysoft.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Memorysoft