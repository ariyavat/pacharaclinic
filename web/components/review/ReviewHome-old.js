import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import ReviewBox from './ReviewBox' 
import ReactPlayer from 'react-player'
import { getReviews,getReview } from '../../utils/ReviewAPI'
import { getVdos } from '../../utils/VdoAPI'
import * as config from '../../config';
const imgURL = `${config.init.web_url}API/images/reviews/`;
export default class ReviewHome extends React.Component {
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

  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {
  	this.getDatas() 
    this.getVdos()
  }
  render () {
  	const item = this.state

    const { responsive, currentIndex } = this.state

    const rows = item.data.map((row, i) => {
      return (  
        <ReviewBox data={row} key={i} />
      )
    })

    const vdos = item.vList.map((item, i) =>{  
        return(
        <div key={i}  className="col-sm-12 pad-10 ">    
          <ReactPlayer url={item.name} controls={true} height="100%" width="99%" />
        </div>   
        )

    })


    const galleryItems = item.data.map((item, index) =>{
      return( 
      <div className="pad-10">            
        <img  className="img-fluid img-responsive rounded" key={index}  src={imgURL+item.img} alt="" /> 
      </div>
      )
    })


  	return(
  	<section className="review" >
  	  	<div className="container">
  		    <header className="review-header text-center">
  		      <h1>REVIEW</h1>
  		    </header>

  		    <div className="row">   
            <div className="col-sm-8" >    
            
                 
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
    
            </div> 
            <div className="col-sm-4" > 
              {vdos}

             
            </div>

  		    </div>  
          <div className="d-block d-sm-none"><br/><br/><br/></div>
  	  	</div>
  	</section>

  	)
  }
  //
  getDatas(){
    const _this = this
    getReviews('Y','WEB')
    .then(function(response) {          
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
  }

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