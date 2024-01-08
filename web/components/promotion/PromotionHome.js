import React from 'react'
import PromotionBox from './PromotionBox' 
import { getPromotions,getPromotion } from '../../utils/PromotionAPI'
export default class PromotionHome extends React.Component {
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
    this.getDatas()
  }
  render () {
  	const item = this.state
    
    const rows = item.data.map((row, i) => {
      return (  
        <PromotionBox data={row} key={i} mode="HOME" />
      )
    })

    if(item.data.length > 0){
      return(
      <section className="falsesale">
        <div className="container ">
          <header className="flash-header text-center mgt-30">          
            <h3 className="font-01 glow">PROMOTIONS</h3>
          </header>
          <div className="row">    
               { item.data.length === 1 ?  <div className="col-md-4 hidden-xs hidden-sm"> </div>: null }
               { item.data.length === 2 ?  <div className="col-md-2 hidden-xs hidden-sm"> </div>: null }  


            {rows}     
          </div>  
        </div>
      </section>  
      )      
    } else {
      return null
    }


  }
  
  getDatas(){
    const _this = this
    getPromotions('WEBHOME','-','-')
    .then(function(response) { 
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
  }


}