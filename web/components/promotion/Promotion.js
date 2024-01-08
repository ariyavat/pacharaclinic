import React from 'react'
import PromotionBox from './PromotionBox' 
import PromotionDetail from './PromotionDetail' 
import FlashHome from '../flashsale/FlashHome' 

import { getPromotions, getPromotion} from '../../utils/PromotionAPI'
export default class Promotion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false, product:{img:'no',product_name:'oooo'},
    }  
   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isView){
      this.getDetail(nextProps.code)
    }    
  }

  componentDidMount () {   
    this.getDatas();
    if(this.props.isView){
      this.getDetail(this.props.code)
    }
  }
  render () {
    	const item = this.state
      const { isView, code  } = this.props
      
      const rows = item.data.map((row, i) => {
        return (  
          <PromotionBox data={row} key={i} mode="LIST" />
        )
      })
    
  
    	return(
    	<section className="bg-White sectionTop" >
        {
          !isView ?
          <div>
            <FlashHome />   	
      	  	<div className="container bg-White">
      	  	    <div className="row">
  					     <div className="col-sm-12 text-center "><h3 className="txt-red">Promotions </h3></div>
      	  	    </div>			
      		    <div className="row">            
      	       	{rows}		 
      		    </div>  
      	  	</div>
          </div>
          :
          <div className="container bg-White">
            <div className="row"> 
              <div className="col-sm-12" > 
                <PromotionDetail data={item.product}  List={item.data} />
              </div>
            </div>             
          </div>          
        }
        <div className="d-block d-lg-none"><br/><br/><br/></div>
    	</section>
    	)   
  }
 //
  getDatas(){
    const _this = this
    getPromotions('WEB','-','-')
    .then(function(response) {         
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
  }

  getDetail(code){
    const _this = this
    getPromotion(code)
    .then(function(response) {   
      if(response.data.status ==='200'){
        _this.setState({  product: response.data.data },()=>{
          window.scrollTo(0,0)          
        })
      }
    })
  }

}