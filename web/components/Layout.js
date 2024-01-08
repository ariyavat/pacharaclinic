import React from 'react'
import moment from 'moment'
import Router from 'next/router'
import Header from '../components/Header'
import Navbar from './Navbar' 
import FotBar from './FotBar'
import Footer from './Footer'  

export default class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = { isLoad: true, isOpen: false } 
   
  }  

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  } 

  componentWillReceiveProps(nextProps){
   // console.log(nextProps)  
   window.scrollTo(0, 0);       
  }

  componentDidMount () { 
    //let temp = {  login_date: moment().format('DD/MM/YYYY H:mm:ss') }
    //localStorage.setItem('ms_login', JSON.stringify(temp))

    
    const data = JSON.parse(localStorage.getItem('msClinic'))
    if(data===null){   
      /*
      Router.push({
        pathname: '/login'
      })  
      */    
    } else {
      this.setState({ isLoad: false }) 
    }

    window.scrollTo(0, 0);

    
  }

  handleSetOpen(){
    const item = this.state
    this.setState({ isOpen: !item.isOpen })  
  }

  handleBtnClick(url){
    window.open(url,'_blank');
  }

  render () { 
    const item = this.state 
    return(
    <div id="myweb">       
      <Header title="" description="" /> 
      <Navbar page={this.props.page} />

      {this.props.children}       
      

      


      {
        item.isOpen ?
        <div className="contact-btn-list ">
          <div className="btn-line alink" onClick={this.handleBtnClick.bind(this,"https://lin.ee/DQ7xZ3A")}></div>
          <div className="btn-facebook" onClick={this.handleBtnClick.bind(this,"https://m.me/PACHARACLINIC3")}>            
          </div>          
        </div>
        : null
      }

      
      <FotBar page={this.props.page}  onPen={this.handleSetOpen.bind(this)} />
      <div className="contact-to-top d-none d-lg-block" onClick={this.handleSetOpen.bind(this)}>
      ติดต่อ
      </div>



     
      <div className='d-none d-lg-block'>
        <Footer />
      </div>
      
     
    </div>
    )

  }
}
