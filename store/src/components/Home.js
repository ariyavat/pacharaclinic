import React, { Component } from 'react'
import { Link } from 'react-router'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      username: 'Ariyavat',
      login: true
    }
  }
  render () {
    return(
   	<div>
  	  <section className="content text-center">
      	<h1>ยินดีต้อนรับ</h1>
        <h1>เข้าสู่ระบบบริหารโรงาน</h1>
        <h1>PACHARA CLINIC</h1>
      </section>
  	</div>
    )    
  }
}
export default Home