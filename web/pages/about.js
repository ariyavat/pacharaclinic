import React from 'react'
import renderHTML from 'react-render-html'
import Layout from '../components/Layout'
import { getAbouts } from '../utils/ContactAPI' 
import * as config from '../config';
const imgURL = `${config.init.web_url}API/images/abouts/`; 
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	data: [],
     	eList : [
			{
	        start: '2020-04-01',
	        end: '2020-04-01',
	        title: 'test',
	        allDay: true
	      	}
     	]
    }   
  }
  componentDidMount () {
    const _this = this
    getAbouts()
    .then(function(response) {   
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })       
  
  }



  render () {  
    const item = this.state    
    return(
    <Layout page="about">   
        <div className="container-fluid">         
        	<section className="sectionTop review" >	
		        <div className="container">
			        <div className="row">            
			        	<div className="col-sm-12 ">
				  		    <header className="review-header">				  		   
				  		      <h1>พชรคลินิก </h1>
				  		    </header>
			        	</div>     
			        </div>

			        <div className="row">            
			        	<div className="col-sm-12">
			        		<p><br/>
			            	&nbsp; &nbsp; &nbsp; &nbsp; คลินิกเวชกรรมพชรก่อตั้งขึ้นในวันที่ 15 เดือนมีนาคม 2555 โดยแพทย์หญิงนวรัตน์ เพชรมณีทวีสิน หรือคุณหมอนก ด้วยปณิธานที่ต้องการมีคลินิกผิวหนังที่รักษาเห็นผล ,ใส่ใจคุณภาพ,ผลิตภัณท์ที่มีคุณภาพใช้แล้วเห็นผลตามสรรพคุณ, บริการด้วยใจ บนพื้นฐานราคาที่เหมาะสม จับต้องได้ทุกฐานะ สามารถรักษาได้ทุกระดับบนมาตราฐานการรักษาเดียวกันและตอบโจทย์ปัญหาของคนไข้ได้ในทุกสภาพผิว เนื่องด้วยก่อนหน้านี้คุณหมอนกได้ทำงานเป็นแพทย์ผู้เชี่ยวชาญด้านผิวหนังให้กับคลินิกความงามชั้นนำหลายแห่ง แต่ด้วยข้อจำกัดในหลายๆด้าน จึงไม่สามารถดูแลคนไข้ได้ตามปณิธานที่วางไว้ หลังจากเก็บเกี่ยวประสบการณ์อยู่นานหลายปี พร้อมทั้งศึกษาหาความรู้เพิ่มเติมในหลายๆด้านที่เกี่ยวข้อง ซึ่งได้แก่การสำเร็จการศึกษา American board ด้านผิวหนัง , สำเร็จปริญญาโทสาขาเวชศาสตร์เครื่องสำอาง มหาวิทยาลัยแม่ฟ้าหลวง รวมถึงศาสตร์การนวดกดจุดบริเวณใบหน้าที่ถูกต้อง จึงได้ตัดสินใจเปิดคลินิกผิวหนังเป็นของตนเอง เพื่อสานฝันและปณิธานที่ได้วางไว้คือ การดูแลรักษาคนไข้ ให้เห็นผลดีขึ้นชัดเจน พร้อมทั้งเสนอแต่บริการหรือผลิตภัณฑ์ที่มีคุณภาพมาตรฐาน ในราคาที่ยุติธรรม


							</p>
							<p>
							&nbsp; &nbsp; &nbsp; &nbsp; หลังจากที่ก่อตั้งสาขาแยกรวมโชคซึ่งเป็นสาขาแรกเมื่อปี2555 คลินิกเวชกรรมพชรได้มีการขยายกิจการและเติบโตขึ้นอย่างต่อเนื่อง ตามลำดับดังนี้
							</p>
							<p>
 							&nbsp; &nbsp; &nbsp; &nbsp; -1 เมษายน ปี2557  ได้เปิดสาขาที่2 คือ คลินิกเวชกรรมพชร สาขาหน้าราชภัฏเชียงใหม่ 
							</p>
							<p>
							&nbsp; &nbsp; &nbsp; &nbsp;-14 พฤษภาคม ปี2558  ได้เปิดร้านพชรบิวตี้ช็อป สาขาหนองผึ้งขึ้น เพื่อเป็นที่จัดจำหน่ายผลิตภัณฑ์บำรุงผิวภายใต้แบรนด์พชร 
							</p>
							<p>
							&nbsp; &nbsp; &nbsp; &nbsp;-15 มกราคม ปี2560 ได้เปิดคลินิกเวชกรรมพชร สาขาหางดง ซึ่งเป็นสาขาที่3 
							</p>
							<p>
							&nbsp; &nbsp; &nbsp; &nbsp;ถึงแม้ว่าคลินิกเวชกรรมพชรจะมีการขยายกิจการและเติบโตขึ้นอย่างต่อเนื่อง แต่เรายังคงมุ่งมั่นในปณิธานเดิม เน้นนวัตกรรมใหม่ๆ ,รักษาคุณภาพและบริการให้ดีมากขึ้นเรื่อยๆต่อไป
							</p> 
			        	</div>     
			        </div>
			        <div className="row">            
			        	<div className="col-sm-12">
			        		<img className="d-block w-100" src="../static/img/about/about_01.jpg" />
			        	</div>     
			        </div>
			        <br/>
			        {
			        	item.data.map((row, i) => {
			        		let img = imgURL+row.img
						    if (i%2 == 0){
						      return (  
						        <div className="row xs-hideen" key={i}>            
						        	<div className="col-6 col-sm-6 ">
						        		<img className="d-block w-100" src={img} />
						        	</div> 
						        	<div className="col-6 col-sm-6">	
						        	    <br/>						
										<h4 className="txt-green">
										{row.dname}<br/>
										<small className="txt-small">{row.sname}</small>
										</h4>
										{renderHTML(row.detail)}
						        	</div>    
						        </div>
						      )
						    } else {

						      return (  
						        <div className="row xs-hideen" key={i}>      
						        	<div className="col-6 col-sm-6 text-right">
						        	    <br/>	
										<h4 className="txt-green">
										{row.dname}<br/>
										<small className="txt-small">{row.sname}</small>
										</h4>
						        		{renderHTML(row.detail)}
						        	</div> 
						        	<div className="col-sm-6">
						        		<img className="d-block w-100" src={img} />
						        	</div>    
						        </div>
						      )
						    }

					    })
			        }







		        </div>
				<br/><br/><br/><br/>
        	</section>
        </div>
    </Layout>
    )
  }
}