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

    const { responsive, currentIndex } = this.state

    const rows = item.data.map((row, i) => {
      if(i < 12){
        return (  
          <ReviewBox data={row} key={i} />
        )
      }
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
              {rows}    
  		    </div>  
          <div className="d-block d-lg-none"><br/><br/><br/></div>
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



}