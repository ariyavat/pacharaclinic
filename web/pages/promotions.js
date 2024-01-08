import React from 'react'
import Layout from '../components/Layout'

import Promotion from '../components/promotion/Promotion'   


export default class extends React.Component {
  shouldComponentUpdate(_nextProps, nextState) {     
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  

  render () {  
    let isView = false
    let code = '-'
    if(this.props.url.query.code){
        code = this.props.url.query.code
        isView = true
    }

    return(
    <Layout page="promotions">   
        <div className="container-fluid"> 
          <Promotion  isView={isView} code={code} />        
        </div>
    </Layout>
    )
  }
}
