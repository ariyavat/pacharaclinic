import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import Router from 'next/router'
import Layout from '../components/Layout'
import HomeSlider from '../components/HomeSlider'  
import HomeVdo from '../components/HomeVdo'  
import HomeYoutube from '../components/HomeYoutube'
import FlashHome from '../components/flashsale/FlashHome'  
import PromotionHome from '../components/promotion/PromotionHome'  
import ProductHome from '../components/product/ProductHome'   
import TreatmetnHome from '../components/treatment/TreatmetnHome'
import MainYoutube from '../components/review/HomeYoutube'
import ReviewHome from '../components/review/ReviewHome'
import AboutHome from '../components/AboutHome'  
import HomeTyp from '../components/HomeTyp' 
import HometypMobil from '../components/HometypMobil' 







import { getVdos } from '../utils/VdoAPI'

import * as config from '../config';
const imgURL = `${config.init.url}/images/vdo/`;

export default class extends React.Component {

  constructor(props){
    super(props);

    this.state = { 
      datas: [], 
    }    
  }




  componentDidMount () {
    
   // this.getDatas()
     // console.log(JSON.parse(localStorage.getItem('msClinic')) )     
  }

  handleMenuSelect(mode){
    let url = 'contact', query = {}, con = 'Y'    
    switch(mode){

      case '1' :  
        url = '/seedoctor'; 
      break

      case '2' :  
        url = '/booking'; 
        let data = JSON.parse(localStorage.getItem('ms_profile'));    
        if(data === null){
          Router.push({
              pathname: '/booking',
              query: { login: 'newlogin' }
          })
        } else {
          query = { uid:data.uid, view:'appointment', gid: '3' }      
        }

      break

      case '3' :  
        url = '/contact'; 
      break
    }
        
    Router.push({
      pathname: url,
      query: query
    })         
    


  }

  render () {     
    const item = this.state

    let style01 = {
        backgroundImage: "url('../static/img/shot/seedoctor.jpg')"   
    };

    let style02 = {
        backgroundImage: "url('../static/img/mm1.jpg')"   
    };

    let style03 = {
        backgroundImage: "url('../static/img/shot/callcenter.jpg')"   
    };


    return(
    <Layout page="home">
  
        <HomeSlider /> 





    
        <MainYoutube />        
        <div className="container-fluid "> 
          
          <div className="container d-none d-sm-block">
            <div className='row'>
              <div className='col-sm-12 text-center mgt-10 pad-10'>
                  <button className="pf-button pf-button4 pf-active font-30 pad-30 min-w300" onClick={this.handleMenuSelect.bind(this,'1')}>
                    ปรึกษาแพทย์
                  </button>

                  <button className="pf-button pf-button4 pf-active font-30 pad-30 min-w300" onClick={this.handleMenuSelect.bind(this,'2')}>
                    จองคิว
                  </button>

                  <button className="pf-button pf-button4 pf-active font-30 pad-30 min-w300" onClick={this.handleMenuSelect.bind(this,'3')}>
                    สายตรงปรึกษา
                  </button>
              </div>

            </div>
          </div>

          
          <div className="container d-block d-sm-none">
            <div className='row'>
              <div className='col-sm-12 text-center mgt-10 pad-10'>
                  <button className="pf-button pf-button4 pf-active  pad-10" onClick={this.handleMenuSelect.bind(this,'1')}>
                    ปรึกษาแพทย์
                  </button>

                  <button className="pf-button pf-button4 pf-active  pad-10" onClick={this.handleMenuSelect.bind(this,'2')}>
                    จองคิว
                  </button>

                  <button className="pf-button pf-button4 pf-active  pad-10" onClick={this.handleMenuSelect.bind(this,'3')}>
                    สายตรงปรึกษา
                  </button>
              </div>

            </div>
          </div>




            <PromotionHome />
            
          
            
            
        </div>
        <div className='d-none d-lg-block'>
          <HomeTyp />  
        </div>

        <div className='d-block d-lg-none'>
          <HometypMobil />  
        </div>

        <div className="container-fluid">       
            <ReviewHome />            
        </div>     
    </Layout>
    )
  }
  //




}
