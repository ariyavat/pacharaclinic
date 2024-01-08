import React from 'react'
import { Player } from 'video-react'
import { getVdos } from '../utils/VdoAPI'
import * as config from '../config';
const imgURL = `${config.init.web_url}API/images/vdo/`;
export default class HomeVdo extends React.Component {
  constructor(props){
    super(props);
    this.state = {  datas: [], }  
   
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {
  	this.getDatas()
  }
  render () {
  	const item = this.state

    const vdos = item.datas.map((item, i) =>{
     let img = imgURL+item.name
     let mcl = 'col-sm-6 col-md-4 col-xs-12 text-left'
    
  
      if(item.typ==='Y'){
        return(
        <div key={i}  className={mcl}>  
          <div className="row">
            <div className="col-sm-12">         
              <Player
                autoPlay                    
                src={img}
              />         
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">         
              <h4 className="mgl-10 font-01 mgt-10 txt-gn">{item.title}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">         
              {item.detail}
            </div>
          </div>

        </div>   
        )
      } else {       
        return(
        <div key={i}  className={mcl}>      

          <div className="row">
            <div className="col-sm-12">         
              <img className="img-responsive  rounded" src={img} />       
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">         
              <h4 className="txt-gn mgl-10 font-01 mgt-10 ">{item.title}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">         
              {item.detail}
            </div>
          </div>          
        </div>   
        )
      }
    })


    if(item.datas.length > 0){
      return(
      <section className="falsesale" >     
        <div className="container"> 
          <header className="review-header text-center mgt-30">       
            <h3 className="txt-gn font-01">คอร์สแนะนำ</h3>
          </header>
          <div className="row">
            <div className="col-sm-12 text-center mgt-20">         
               <div className="row">
               { item.datas.length === 1 ?  <div className="col-md-4 hidden-xs hidden-sm"> </div>: null }
               { item.datas.length === 2 ?  <div className="col-md-2 hidden-xs hidden-sm"> </div>: null }             
               {vdos}
              </div>               
            </div>
          </div>



               
        </div>
      </section>
      )
    } else {
      return null
    }
  }
  //
  getDatas(){
    const _this = this
    getVdos('WEB','C')
    .then(function(response) { 
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
    
        } 
        _this.setState({ datas: List },()=>{
           // $('.carousel').carousel()
        }) 
    })
  }


}