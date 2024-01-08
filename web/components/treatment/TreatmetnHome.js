import React from 'react'
import TreatmentBox from './TreatmentBox' 
import { getProducts,getProduct, getProductWebs } from '../../utils/ProductAPI'
export default class TreatmetnHome extends React.Component {
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
    this.getDatas(this.props.mode)
  }
  render () {
  	const item = this.state
  	const { title } = this.props

    const rows = item.data.map((row, i) => {
      return (  
        <TreatmentBox data={row} key={i} />
      )
    })
    if(item.data.length > 0){
    	return(
    	<section className="falsesale" >
    	  	<div className="container">
            <br/>
    		    <header className="flash-header">
    		      <h3>{title}</h3>
    		    </header>
    		    <div className="row">            
    		      {rows}
    		 
    		    </div>  
    	  	</div>
    	</section>
    	)
    } else {
      return(
      <div></div>
      )
    }
  }

  getDatas(mode){
    const _this = this
    getProductWebs(mode,'HOME')
    .then(function(response) {         
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
  }



}