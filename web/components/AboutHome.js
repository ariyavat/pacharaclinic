import React from 'react'


export default class AboutHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
    
   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
  	// 
  }





  render () {
  	const item = this.state
  	return(
    <section className="falsesale font-01" >
        <div className="row">            
        	<div className="col-sm-12">
        		<img className="d-block w-100" src="static/img/about/abh.jpg" />
        	</div>     
        </div>
        <div className="container">
        <div className="row">            
        	<div className="col-sm-12">
        		<p><br/>

            คลินิกเวชกรรมพชรก่อตั้งขึ้นในวันที่ 15 เดือนมีนาคม 2555 โดยแพทย์หญิงนวรัตน์ เพชรมณีทวีสิน หรือคุณหมอนก ด้วยปณิธานที่ต้องการมีคลินิกผิวหนังที่รักษาเห็นผล ,ใส่ใจคุณภาพ,ผลิตภัณท์ที่มีคุณภาพใช้แล้วเห็นผลตามสรรพคุณ, บริการด้วยใจ บนพื้นฐานราคาที่เหมาะสม จับต้องได้ทุกฐานะ สามารถรักษาได้ทุกระดับบนมาตราฐานการรักษาเดียวกันและตอบโจทย์ปัญหาของคนไข้ได้ในทุกสภาพผิว เนื่องด้วยก่อนหน้านี้คุณหมอนกได้ทำงานเป็นแพทย์ผู้เชี่ยวชาญด้านผิวหนังให้กับคลินิกความงามชั้นนำหลายแห่ง แต่ด้วยข้อจำกัดในหลายๆด้าน จึงไม่สามารถดูแลคนไข้ได้ตามปณิธานที่วางไว้ หลังจากเก็บเกี่ยวประสบการณ์อยู่นานหลายปี พร้อมทั้งศึกษาหาความรู้เพิ่มเติมในหลายๆด้านที่เกี่ยวข้อง ซึ่งได้แก่การสำเร็จการศึกษา American board ด้านผิวหนัง , สำเร็จปริญญาโทสาขาเวชศาสตร์เครื่องสำอาง มหาวิทยาลัยแม่ฟ้าหลวง รวมถึงศาสตร์การนวดกดจุดบริเวณใบหน้าที่ถูกต้อง จึงได้ตัดสินใจเปิดคลินิกผิวหนังเป็นของตนเอง เพื่อสานฝันและปณิธานที่ได้วางไว้คือ การดูแลรักษาคนไข้ ให้เห็นผลดีขึ้นชัดเจน พร้อมทั้งเสนอแต่บริการหรือผลิตภัณฑ์ที่มีคุณภาพมาตรฐาน ในราคาที่ยุติธรรม


				  	</p>
        	</div>     
        </div>
        </div>
    </section>

  	)
  }
}