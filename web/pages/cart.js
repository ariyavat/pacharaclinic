import React from 'react'
import moment from 'moment'
import Layout from '../components/Layout'
import CartList from '../components/cart/CartList'   
import Payment from '../components/cart/Payment'
import PaymentCon from '../components/cart/PaymentCon'

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isView: 'CART',  data: []
    }   
  }

  shouldComponentUpdate(_nextProps, nextState) {     
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {    
    let data = JSON.parse(localStorage.getItem('ms_signup'))
    if(data){
      let then = JSON.parse(localStorage.getItem('ms_login')).login_date    
      let now = moment().format('DD/MM/YYYY H:mm:ss'); 
      let tim = moment.utc(moment(now,"DD/MM/YYYY H:mm:ss").diff(moment(then,"DD/MM/YYYY H:mm:ss"))).format("H")
      if(parseFloat(tim) > 2){
        localStorage.removeItem('ms_profile');   
      }
    }



  }

  render () {  
    const item = this.state
    let isView = item.isView
   // if(this.props.url.query.checkout){ isView = 'PAYMENT' ; }
    if(this.props.url.query.checkout){ isView = 'PAYMENT' ; }
     if(this.props.url.query.confirm){ isView = 'CONFIRM' ; }
    return(
    <Layout page="cart">   
        <div className="container"> 
          { isView === 'CART' ? <CartList  /> : null } 
          { isView === 'PAYMENT' ? <Payment  /> : null } 
          { isView === 'CONFIRM' ? <PaymentCon  /> : null } 
        </div>
    </Layout>
    )
  }
}
