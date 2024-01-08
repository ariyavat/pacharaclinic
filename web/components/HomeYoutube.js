import React from 'react'
import { Player } from 'video-react'
import ReactPlayer from 'react-player'
import { getVdos } from '../utils/VdoAPI'
import * as config from '../config';
const imgURL = `${config.init.url}/images/vdo/`;
export default class HomeYoutube extends React.Component {
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
        return(
        <div key={i}  className="col-sm-6 pad-10 ">    
        	<ReactPlayer url={item.name} controls={true} width="99%" />
        </div>   
        )

    })


    if(item.datas.length > 0){
  	return(
    <section className="falsesale" >	   
	    <div className="container"> 
	      <header className="review-header">
	       <br/>
	        <h3 className="txt-gn">ช่อง Youtube</h3>
	      </header>
	        <div className="row">
	         {vdos}
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
    getVdos('WEBYOU','Y')
    .then(function(response) { 
        console.log('WY',response)
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