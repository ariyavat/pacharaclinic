import React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import Login from '../components/profile/Login'
import Bookmain from '../components/book/bookmain'



export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isView: 'LOAD',  data: [],
    }   
  }

  shouldComponentUpdate(_nextProps, nextState) {   
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){   
    let data = JSON.parse(localStorage.getItem('ms_profile'));
    this.setState({ data: data })        
  }
 
  componentDidMount () {
  //localStorage.removeItem('ms_profile');
  	if(this.props.url.query.login){
      this.setState({ isView : 'LOGIN' })
  	}  else if(this.props.url.query.uid){
  		this.setState({ isView : 'PROFILE' })
  	}  else { 		

	  	let data = JSON.parse(localStorage.getItem('ms_profile'));      

	  	if(data === null){
  			Router.push({
  			    pathname: '/booking',
  			    query: { login: 'booking' }
  			})
	  	} else {
        this.setState({ data: data }) 
        Router.push({
            pathname: '/booking',
            query: { uid: data.uid, view: 'detail', gid: '1' }
        })        
      }

  	}

  }

  render () {   
  	const item = this.state
  	let isView = item.isView
    //let data = JSON.parse(localStorage.getItem('ms_profile'));
 
  	if(this.props.url.query.login){ isView = 'LOGIN' ; } 

    return(
    <Layout page="profile">   
    
        <div className="container"> 
            { isView === 'LOAD' ? <div className="min-500"></div> : null }   
          	{ isView === 'LOGIN' ? <Login mode={this.props.url.query.login}  /> : null }
            { isView === 'PROFILE' ? <Bookmain data={item.data} uid={this.props.url.query.uid} view={this.props.url.query.view} gid={this.props.url.query.gid} /> : null } 
 

        </div>
    </Layout>
    )
  }
}