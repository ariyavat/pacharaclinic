import React from 'react'
import Router from 'next/router'
import ReviewBox from './ReviewBox' 
import ReviewDetail from './ReviewDetail' 
import { getReviews,getReview } from '../../utils/ReviewAPI'
import { getPgroups  } from '../../utils/ProductAPI'
export default class ReviewHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempList: [], isLoad: false,  data: null, mode: '1',
      menu:[{gid:1, gname: ''}]
    }  
   
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

    /*
    if(nextProps.isView){
      this.getDetail(nextProps.code)
    }
    */    
  }

  componentDidMount () {

    let _this = this; 
    getPgroups('R')
    .then(function(results) {  
      let list = []
      if (results.data.status === '200') {
        list = results.data.data
      } 

      _this.setState({ loading: true, mode: list[0].gid, menu: list },()=>{
        _this.getDatas();  
            
      })   

    });

  }

  handleMenuSelect(i,e){
    e.preventDefault()
    this.setState({ mode: this.state.menu[i].gid, vgroup: false },()=>{
      Router.push({
          pathname: '/reviews',
          query: { cat_id: this.state.menu[i].gid, category: this.state.menu[i].gname }
      })      
    })

  }


  render () {
  	const item = this.state
    const { isView, code  } = this.props
    
    const rows = item.tempList.map((row, i) => {

      if(row.mode === item.mode){
        return (  
          <ReviewBox data={row} key={i}  />
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
  	<section className="review sectionTop" >
  	  	<div className="container">
  		    <header className="review-header text-center">  
  		      <h1>REVIEW </h1>
  		    </header>

          <div className="row">            
            <div className="col-3">

                <div className={vcls}>
                  <ul id="MenuF">
                      {mrows}                 
                  </ul>
                </div> 
       
                <div className="col-12 xs-hidden">
                  <ul id="MenuF">
                      {mrows}                 
                  </ul>
                </div> 
          

            </div>
            <div className="col-9">

              {
                !isView ?
                <div className="row">            
                    {rows}
                 </div>
                : null            
              }
              {
                isView && item.data !== null ?
                <ReviewDetail data={item.data}  />
                : null
              }

            </div>
          </div>






  		    <br/>
  	  	</div>
  	</section>

  	)
  }

  getDatas(){
    const _this = this
    getReviews('Y','WEB')
    .then(function(response) {    
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ tempList: List }) 
    })
  }


  getDetail(code){
    const _this = this
    getReview(code)
    .then(function(response) {  
      if(response.data.status ==='200'){
        _this.setState({  data: response.data.data },()=>{
          window.scrollTo(0,0)
          
        })
      }
    })
  }

}