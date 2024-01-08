import React from 'react'
import ProductBox from './ProductBox' 
import { getProducts,getProduct, getProductWebs } from '../../utils/ProductAPI'
import { getPromotions} from '../../utils/PromotionAPI'
export default class ProductHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], pnum: 1,
    }  
   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {

    const _this = this
    getPromotions('WEB','-','-')
    .then(function(response) {         
        let n = 0
        if(response.data.status === '200'){   
          n = 1
        } 
        _this.setState({ pnum: n }) 
    })


    this.getDatas();
  }
  render () {
  	const item = this.state

    const rows = item.data.map((row, i) => {
      return (  
        <ProductBox data={row} key={i} mode="H" />
      )
    })

    let cl = 'falsesale'
    if(item.pnum  > 0){  cl = 'sectionGray';  }
    
    if(item.data.length > 0){
      return(
      <section className={cl} >
          <div className="container"> 

            <header className="review-header text-center mgt-30">       
              <h3 className="txt-gn font-01">สินค้าขายดี</h3>
            </header>
            <div className="row">            
             {rows}    
            </div>  
          </div>
      </section>
      )
    }  else {
      return(
      <div></div>
      )
    }
  }
  //
  getDatas(){
    const _this = this
    getProductWebs('product','HOME')
    .then(function(response) {     
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
  }



}