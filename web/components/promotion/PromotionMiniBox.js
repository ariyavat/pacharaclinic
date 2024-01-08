import React from 'react'
import Router from 'next/router'
import * as config from '../../config';
const imgURL = `${config.init.web_url}/API/images/promotions/`;
export default class PromotionMiniBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }   

    this.handleShowDetail = this.handleShowDetail.bind(this)
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
	    pathname: '/promotions',
	    query: { code: this.props.data.id, name: this.props.data.promotion_name }
	})
  }

  render () {
  	const {data} = this.props
  	let img = imgURL+data.img

  	return(
	  <div className="col-md-12 col-sm-12 col-xs-12 box-ph-body alink" onClick={this.handleShowDetail} >
	    <div className="box-gren">
	      <div className="row">
	        <div className="col-md-12 text-center" >
	          <img className="img-fluid" src={img} />
	        </div>
	      </div>
	    </div>
	  </div>
  	)
  }
}