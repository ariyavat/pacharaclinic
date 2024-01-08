import React from 'react'
import Router from 'next/router'
import { Player } from 'video-react'
import ReactPlayer from 'react-player'

import { getPgroups  } from '../utils/ProductAPI'

import * as config from '../config';
const imgURL = `${config.init.web_url}API/images/pgroup/`;

export default class HomeTyp extends React.Component {
  constructor(props){
    super(props);
      this.items = [
        {mode: '1', name: 'รักษาสิว', typ: 'T', 'img': "url('../static/img/m014.jpg')", 'msg':"ทรีทเม้นท์รักษาสิว ปัญหาสิว ลดรอยสิว สิวอักเสบ รักษาสิวครบวงจร"}, 
        {mode: '2', name: 'ผิวกระจ่างใส', typ: 'T', 'img': "url('../static/img/m01.jpg')",'msg':" ทรีทเม้นท์บำรุงผิวขาว กระจ่างใส ลดจุดด่างดำ ลดริ้วรอย"},
        {mode: '3', name: 'รักษาฝ้า', typ: 'T', 'img': "url('../static/img/m012.jpg')",'msg':"ทรีทเม้นท์บำรุงผิวขาว ลดฝ้ากระ จดด่างดำ กระชับรูขุมขน ผิวหน้าเนียนนุ่ม"}, 
        {mode: '4', name: 'ทำความสะอาดผิว', typ: 'T', 'img': "url('../static/img/m0336.jpg')",'msg':"ทำความสะอาดผิวอย่างล้ำลึก ช่วยขจัดสิ่งสกปรกใต้ผิวหนังให้หลุดออก"},
        {mode: '5', name: 'ยกกระชับ', typ: 'T', 'img': "url('../static/img/m0205.jpg')",'msg':"ทรีทเม้นท์บำรุงผิวกระจ่างใส ยกกระชับผิวหน้า กระตุ้นการสร้างคอลลาเจน"}, 
        {mode: '6', name: 'คุณแม่หลังคลอด', typ: 'T', 'img': "url('../static/img/m0106.jpg')",'msg':""}, 
       

        {mode: '1', name: 'เลเซอร์', typ: 'L', 'img': "url('../static/img/m013.jpg')",'msg':" Laser รักษาแก้ปัญหาผิวพรรณ ช่วยให้ผิวกระจ่างใส ลดฝ้ากระจุดด่างดำ กระตุ้นการสร้างคอลลาเจน"}, 
        {mode: '2', name: 'ฉีดผิว', typ: 'L', 'img': "url('../static/img/m011.jpg')",'msg':"บำรุงผิวพรรณ ขับสารพิษโลหะหนัก ผิวสวยใสจากภายในสู่ภายนอก"},
      ]

    this.state = {  datas: [], tempList:[] }  
   
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {

    let _this = this; 
    getPgroups('T')
    .then(function(results) {  
      let list = []
      if (results.data.status === '200') {
        list = results.data.data
      } 
      //console.log(list)

      _this.setState({ tempList: list })   

    });

  }

  handleMenuSelect(i,typ,mode,e){
    e.preventDefault()
      let  gname = this.state.tempList[i].name   
        Router.push({
          pathname: '/cosmetics',
          query: { cat_id: mode, type: typ, category: gname}
        }) 
  }


  render () {
  	const item = this.state

    const rows = item.tempList.map((item, i) =>{

      let img = imgURL+item.img
      let style = {
        backgroundImage: 'url('+img+')'
      };
      let typ = 'T'

      let mcl = 'col-6  col-md-4 col-lg-3'
      return(
	    <div key={i} className={mcl} > 
	    	<div className="mainBody text-center">
	    		
          <div className="row">
          <div className="col-md-12 text-center" >
            <img className="img-fluid" src={img} />
          </div>
          </div>


	 
				<div className="btn-container" onClick={this.handleMenuSelect.bind(this,i,typ,item.gid)} >
					<a className="btn standard-btn" href="#" >VIEW MORE <i className="fa fa-long-arrow-right" /></a> 
				</div>	  
			</div>
	    </div>   
      )
    })


  	return(
    <section id="mainType" >	   
	    <div className="mainType-head">
	    <div className="container">
	        <div className="row">
	            {rows}
	        </div>
		</div>
	    </div>
    </section>
  	)
  
  }
}