import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import ProductBox from './ProductBox' 
import ProductDetail from './ProductDetail' 
import ShopList from '../cart/ShopList'  



import { getPgroups, getProducts,getProduct, getProductWebs } from '../../utils/ProductAPI'


export default class Product extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef()
    this.state = {
      data: [], loading: false, mode: '1', product:{img:'no',product_name:'oooo'}, vgroup : false, timers: '',
      menu:[{gid:1, gname: ''}]
    }  

    this.handleMenuSelect = this.handleMenuSelect.bind(this)
   
  }

  shouldComponentUpdate(_nextProps, nextState) {    
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
    
      this.setState({ mode: nextProps.cat_id },()=>{
        if(nextProps.isView){
          this.getDetail(nextProps.code)
        } else {
          //this.getDatas();  
        }            
      })  
  }

  componentDidMount () {  

    let _this = this; 
    getPgroups('P')
    .then(function(results) {  
      let list = []
      if (results.data.status === '200') {
        list = results.data.data
      } 

      _this.setState({ loading: true, mode: _this.props.cat_id, menu: list },()=>{
        _this.getDatas();  
        _this.getDetail(_this.props.code)       
      })   

    });
       
  }

  handleMenuSelect(i,e){
    e.preventDefault()
    this.setState({ mode: this.state.menu[i].gid, vgroup: false },()=>{
      Router.push({
          pathname: '/products',
          query: { cat_id: this.state.menu[i].gid, category: this.state.menu[i].gname }
      })      
    })

  }

  handleViewGroup(){
    let view = !this.state.vgroup;
    this.setState({ vgroup: view })
  }

  onUpdate(){
    this.setState({timers: moment().format('YYYYMMDDHHmmss') })
  }


  render () {
    	const item = this.state  
      const { isView, code  } = this.props
      const rows = item.data.map((row, i) => {

        if(row.mode === item.mode){
          return (  
            <ProductBox data={row} key={i} mode="W" />
          )      
        }
      })
     
      const mrows = item.menu.map((row, i) => {
        let cls = ''
        let active = ''
        if(item.mode === row.gid){ 
          cls = 'txt-green' 
          active = 'active'
        }
        return (  
          <li key={i} className={cls} onClick={this.handleMenuSelect.bind(this,i)}>
            <a href="#" ><span className={cls}>{row.gname}</span></a>
          </li>
        )
      })   
    
      let vcls = 'col-12 list-enable'
      if(item.vgroup === true){ vcls = 'col-12 list-visible';   }

      let ccls = 'col-sm-9'
      if(isView){
        ccls = 'col-sm-8'
      }   

       let idx = item.menu.findIndex(x => x.gid === item.mode);  
  
    	return(
    	<section  className="bg-White sectionTop"   >
    	  	<div className="container">    	
            <div className="row"> 
              <div className="col-12  xs-visible">
                <button type="button" className="mobile-group-btn pull-right" onClick={this.handleViewGroup.bind(this)}>
                  <i className="fa fa-list"></i> <span className="font-13">หมวดหมู่สินค้า</span>
                </button>
                <br/>
              </div>
              {
                !isView?
                <div className={vcls}>
                  <ul id="MenuF">
                      {mrows}                 
                  </ul>
                </div> 
                : null
              }
              {
                !isView?
                <div className="col-3 col-sm-3 xs-hidden">
                  <ul id="MenuF">
                      {mrows}                 
                  </ul>
                </div> 
                : null
              }


                <div  className={ccls}>  
                  <div className="row">
                  {
                    idx!== -1 ?
                    <div className="col-sm-12"><h3 className="font-01 ">{item.menu[idx].gname}</h3></div>
                    : null
                  }
                  </div>
                  {
                    item.loading ?
                    <div className="row">            
                      <div className="col-sm-12 text-center mgt-100">  
                        <h1>LOAD DATA...</h1>
                      </div>
                    </div>                    
                    : null
                  }

                  {
                    isView ?
                    <ProductDetail data={item.product}  onUpdate={this.onUpdate.bind(this)} />
                    :                    
                    <div className="row">            
                     {rows}    
                    </div>                        
                  }
                  <br/><br/>
                </div>

                {
                isView?
                <div className="col-4 col-sm-4 xs-hidden">
                  <ShopList timers={item.timers} />

                </div> 
                : null
                }
                              
              

            </div>


    	  	</div>
    	</section>
    	)   
  }

  getDatas(){
    const _this = this
    getProductWebs('product','WEB')
    .then(function(response) {   console.log(response.data)      
        let List = []       
        if(response.data.status === '200'){   
          List = response.data.data
        }  
        _this.setState({ data: List, loading: false }) 
    })
  }

  getDetail(code){
    const _this = this
    getProduct('product',code)
    .then(function(response) {   
      if(response.data.status ==='200'){
        _this.setState({  product: response.data.data },()=>{
          window.scrollTo(0,0)
          
        })
      }
    })
  }



}