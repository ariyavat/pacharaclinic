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
import ReviewHome from '../components/review/ReviewHome'
import AboutHome from '../components/AboutHome'  
import HomeTyp from '../components/HomeTyp' 



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
   
        <section className="menuSlide" >
          <div className="container text-center mainBorder">  

              <div className="row">
                <div className="col-6 col-md-4 pad-10" >
                  <div className="mbox" style={style01}>
                    <div className="row">
                      <div className="col-sm-12 mboxd">
                          <h4 className="txt-gn font-01 mgt-10 tsimple">SEE DOCTOR</h4>
                          <p className="mgt-100 d-sm-block">"ปรึกษาแพทย์โดยไม่ต้องเข้าคลินิก"</p>
                      </div>
                    </div>
                    <div className="btn-container" >
                      <a className="btn standard-btn" href="/seedoctor" >SEE MORE <i className="fa fa-long-arrow-right" /></a> 
                    </div>  

                  </div>
                </div>
                <div className="col-6 col-md-4 pad-10" >
                  <div className="mbox" style={style02}>
                    <div className="row">
                      <div className="col-sm-12 mboxd">
                          <h4 className="txt-gn font-01 mgt-10">ONLINE BOOKING</h4>
                          <p>จองคิวเข้ารับบริการ</p>
                      </div>
                    </div>
                    <div className="btn-container" onClick={this.handleMenuSelect.bind(this,'2')} >
                      <a className="btn standard-btn-01" href="javascript: ;" >BOOKING NOW <i className="fa fa-long-arrow-right" /></a> 
                    </div> 
                  </div>
                </div>
                <div className="col-6 col-md-4 pad-10 xs-hideen">
                  <div className="mbox" style={style03}>
                    <div className="row">
                      <div className="col-sm-12 min-225">
                          <h4 className="txt-gn font-01 mgt-10">Call Contact</h4>
                          <p className="mgt-50">“สายตรงปรึกษา สอบถามข้อมูล”</p>
                      </div>
                    </div>
                    <div className="btn-container" onClick={this.handleMenuSelect.bind(this,'3')} >
                      <a className="btn standard-btn-01" href="javascript: ;" >ALL CONTACT <i className="fa fa-long-arrow-right" /></a> 
                    </div> 
                  </div>
                </div>

              </div>
          </div>
        </section>

        <div className="container-fluid"> 
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



            <PromotionHome />
            <ProductHome />
            <HomeVdo /> 
        </div>
        <HomeTyp />  
        <div className="container-fluid">       
            <ReviewHome />            
        </div>     
    </Layout>
    )
  }
  //




}
