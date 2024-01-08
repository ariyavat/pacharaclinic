import React from 'react'
import Layout from '../components/Layout'

import Treatment from '../components/treatment/Treatment'   


export default class extends React.Component {

  shouldComponentUpdate(_nextProps, nextState) {   
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  render () {   
    let isView = false
    let code = '-'
    let gid = '6'    
    let typ = 'T'
    console.log('main',this.props.url.query)
    if(this.props.url.query.code){
        code = this.props.url.query.code
        gid = this.props.url.query.cat_id
        typ = this.props.url.query.type  
        isView = true
    } else if(this.props.url.query.cat_id){
        gid = this.props.url.query.cat_id 
        typ = this.props.url.query.type 
        isView = false  
    }

    return(
    <Layout page="cosmetic">   
        <div className="container-fluid">   
          <Treatment isView={isView} code={code} cat_id={gid} type={typ}  />            
        </div>
    </Layout>
    )
  }
}
