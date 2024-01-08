import React from 'react'
import moment from 'moment'
import Router from 'next/router'
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/reviews/`;
export default class ReviewBox extends React.Component {
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

  handleShowDetail(e){
    e.preventDefault()
    Router.push({
        pathname: '/reviews',
        query: { code: this.props.data.id, cat_id: this.props.data.mode , name: this.props.data.title }
    })  
  }

  render () {
  	const {data} = this.props
  	let img = imgURL+data.img
  	return(
	  <div className="col-3 mgb-30 alink" onClick={this.handleShowDetail.bind(this)}>
	      <div className="row">
	        <div className="col-md-12 text-center" >
	          <img  src={img}  className="img-rounded img-responsive rounded" />
	        </div>
	      </div>	  
	  </div>
  	)
  }
}