import React from 'react'

import AliceCarousel from 'react-alice-carousel';
import { getSlides } from '../utils/SlideAPI'
import * as config from '../config';
const imgURL = `${config.init.web_url}API/images/slider/`;

export default class HomeSlider extends React.Component {
  constructor(props){
    super(props);


    this.state = {
      datas: [], mode: true,
      currentIndex: 0,
      responsive: { 1024: { items: 1 } }, 
    }  
   
  }

  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })


  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {
  	this.getDatas()
  }
  render () {
  	const item = this.state
    const { responsive, currentIndex } = this.state


    const galleryItems = item.datas.map((item, index) =>{

      return(
        <img  className="img-fluid" key={index}  src={imgURL+item.img} alt="" /> 
      )

    })

  	return(
    <section className="falsesale min-400">
      {
        item.mode ?
          <AliceCarousel
            items={galleryItems}
            slideToIndex={currentIndex}
            autoPlay
            autoPlayInterval={5000}
            dotsDisabled 
            responsive={responsive}
            keysControlDisabled={false}
            buttonsDisabled ={true}
            onInitialized={this.handleOnSlideChange}
            onSlideChanged={this.handleOnSlideChange}
            onResized={this.handleOnSlideChange}
          />   
        : 
        <div className="container-fluid"> 
            <div className="row">
              <div className="col-sm-12"> 
                <img className="img-responsive" src="static/img/slider/22c72970-d7b9-11e9-b04c-ebf075272fda.jpg" />
          
              </div>
            </div>

        </div>
      }
    </section>




  	)
  }
  //
  getDatas(){
    const _this = this
    getSlides()
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