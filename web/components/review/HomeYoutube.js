import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import ReviewBox from './ReviewBox' 
import ReactPlayer from 'react-player'

import { getVdos } from '../../utils/VdoAPI'
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/reviews/`;
export default class MainYoutube extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], vList: [],
      currentIndex: 0,
      responsive: { 0: {items: 2 },
      1024: {
          items: 4
      } }, 
    }  
   
  }


  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {
 
    this.getVdos()
  }
  render () {
  	const item = this.state

    const { responsive, currentIndex } = this.state



    const vdos = item.vList.map((item, i) =>{  
   
        return(
  		    <div key={i}  className="row">   
                <div className="col-sm-6 text-center" > 
                    <br/>
                    <h4 className='font-italic'>{item.detail}</h4>

                </div> 
                <div className="col col-sm-6" > 
                <ReactPlayer url={item.name} controls={true} width="99%" />               
                </div>
  		    </div>  
   
        )

    })




  	return(
  	<section className="review" >
  	  	<div className="container">
        {vdos}  
  	  	</div>
  	</section>

  	)
  }
  //


  getVdos(){
    const _this = this
    getVdos('WEBYOU','Y')
    .then(function(response) { 
        
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data    
        } 
        _this.setState({ vList: List }) 
    })
  }

}