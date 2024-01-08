import React from 'react'
import Router from 'next/router'
import renderHTML from 'react-render-html'
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/reviews/`;
export default class ReviewDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], 
    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {
  	
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

 
  componentDidMount () {
  	// 
  }


  onUpdate(){
  	//this.props.onUpdate()
  }

  

  render () {
  	const item = this.state
  	const {data} = this.props
  	let img = imgURL+data.img

  	return(
	  <div className="row">
    
	  	{
	  		data!== null && data.img !== 'no' ?      
		    <div className="col-md-12" >
		    
				<div className="row">
				    <div className="col-md-6" >
				     	<img className="img-fluid img-thumbnail" src={img} />
				    </div>
				    <div className="col-md-6" >
						<h3 className="txt-green font-01">{data.title}</h3>
						<div className="row">
						    <div className="col-md-12 min-100" >{renderHTML(data.detail)}</div>
						</div>
				    </div>			    
				</div>	
		    </div>
		    : null
	  	}

	  </div>
  	)
  }
}