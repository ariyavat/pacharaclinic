import React from 'react'
import moment from 'moment';
import FlashBox from './FlashBox' 
import { getFlashs } from '../../utils/FlashAPI'

export default class FlashHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], dat: '', etime: '', h1: '0', h2: '0', m1: '0', m2: '0'
    }  
   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {
    this.getData()
  }

  coutTime(){
    const _this = this
    let now = moment();
    let dat = this.state.dat+" "+this.state.etime;  
    let then = moment(dat);
    let tim = moment.utc(moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm")
    let txt = tim.split(":")
    this.setState({ h1: txt[0][0], h2: txt[0][1], m1: txt[1][0], m2: txt[1][1]  })
    if(tim !== '00:00'){
      setInterval(function(){
          _this.coutTime()
      }, 60000); 
    } else {
      this.getData()
    }
  }

  
  render () {
  	const item = this.state

    const rows = item.data.map((row, i) => {
      
      return (  
        <FlashBox data={row} key={i} />
      )      
      
    })


    
  	return(  
    <div>  
    {
      item.data.length > 0 ?
  

      <section className="falsesale" >
        <div className="container">
          <br/>
          <header className="flash-header">
            <h3>
            Flash Sale <span className="txt-gray">จะสิ้นสุดใน</span> 
            <span className="txt-box"><span className="txt-min">{item.h1}</span></span> 
            <span className="txt-box"><span className="txt-min">{item.h2}</span></span>
            <span className="txt-sl">:</span>
            <span className="txt-box"><span className="txt-min">{item.m1}</span></span> 
            <span className="txt-box"><span className="txt-min">{item.m2}</span></span>              
            </h3>
          </header> 
          <div className="row">
            { rows }
          </div>  
        </div>
      </section>  





      :
      null
    }
    </div>
  	)
  }
  //
  getData(){
    const _this = this
    getFlashs()
    .then(function(response) {     
        let List = []       
        if(response.data.status === '200'){   
          List = response.data.data      
    
          _this.setState({ data: List, dat: List[0].dat, etime: List[0].end_time, loading: false },()=>{  
            _this.coutTime()
          }) 
        }  
    })
  }

}