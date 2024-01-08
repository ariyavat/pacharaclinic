import React from 'react'
import Router from 'next/router'
export default class ProfileEms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false,
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	//
  }


  handleSubmit(e){
  	e.preventDefault()

  }


  render () {
    const item = this.state
  
	return(
  <div>
      <div className="row">   
        <div className="col-md-12">
          <h4 className="txt-gn">เช็คเลขพัสดุ</h4>
        </div> 
      </div>  

      <div className="row">   
        <div className="col-md-12 mgt-10">1. XXXXXXXXXXXXXXXXXXXXXXXXXX     10 ครั้ง   คงเหลือ  5  ครั้ง</div> 
      </div>  

      <div className="row">   
        <div className="col-md-12 mgt-10">2. XXXXXXXXXXXXXXXXXXXXXXXXXX     10 ครั้ง   คงเหลือ  5  ครั้ง</div> 
      </div>  


      <div className="row">   
        <div className="col-md-12 mgt-10">3. XXXXXXXXXXXXXXXXXXXXXXXXXX     10 ครั้ง   คงเหลือ  5  ครั้ง</div> 
      </div>  

      <div className="row">   
        <div className="col-md-12 mgt-10">4. XXXXXXXXXXXXXXXXXXXXXXXXXX     10 ครั้ง   คงเหลือ  5  ครั้ง</div> 
      </div> 

    <br/>
  </div>
	)   
  }




}