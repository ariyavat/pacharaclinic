import React from 'react'
import Layout from '../components/Layout'
import Review from '../components/review/Review'   


export default class extends React.Component {
  shouldComponentUpdate(_nextProps, nextState) {   
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {
     
  
  }
  render () {     
  let isView = false 
  let code = '-'
  let gid = '1'
  if(this.props.url.query.code){
        code = this.props.url.query.code
        gid = this.props.url.query.cat_id
        isView = true
    }  else if(this.props.url.query.cat_id){
        gid = this.props.url.query.cat_id   
    }
    return(
    <Layout page="reviews">   
        <div className="container-fluid" >  	
	        <Review isView={isView} code={code} cat_id={gid}   />        
        </div>
    </Layout>
    )
  }
}
