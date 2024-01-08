import React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import Product from '../components/product/Product'   
import Login from '../components/profile/Login'
import Signup from '../components/profile/Signup' 
import Auth from '../components/profile/Auth'
import Profile from '../components/profile/Profile'
import Member from '../components/profile/Member'
import MemberCon from '../components/profile/MemberCon'
import Edit from '../components/profile/Edit' 
import Forgot from '../components/profile/Forgot'


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
  	if(this.props.url.query.forgot){
  		this.setState({ isView : 'FORGOT' })
    } else if(this.props.url.query.login){
      this.setState({ isView : 'LOGIN' })
  	} else if(this.props.url.query.signup){
  		this.setState({ isView : 'SIGNUP' })
  	} else if(this.props.url.query.edit){
      this.setState({ isView : 'EDIT' })
    } else if(this.props.url.query.auth){
  		this.setState({ isView : 'AUTH' })
  	} else if(this.props.url.query.uid){
  		this.setState({ isView : 'PROFILE' })
  	} else if(this.props.url.query.member){
      if(this.props.url.query.member === 'new_member'){
        this.setState({ isView : 'MEMBER' })  
      } else  if(this.props.url.query.member === 'payment'){
        this.setState({ isView : 'MEMBER_PAYMENT' })  
      }      
    } else { 		

	  	let data = JSON.parse(localStorage.getItem('ms_profile'));      

	  	if(data === null){
  			Router.push({
  			    pathname: '/profile',
  			    query: { login: 'wahsffd' }
  			})
	  	} else {
        this.setState({ data: data }) 
        Router.push({
            pathname: '/profile',
            query: { uid: data.uid, view: 'detail', gid: '1' }
        })        
      }

  	}

  }

  render () {   
  	const item = this.state
  	let isView = item.isView
    //let data = JSON.parse(localStorage.getItem('ms_profile'));
    if(this.props.url.query.forgot){ isView = 'FORGOT' ; }
  	if(this.props.url.query.login){ isView = 'LOGIN' ; }
    if(this.props.url.query.edit){ isView = 'EDIT' ; }
  	if(this.props.url.query.signup){ isView = 'SIGNUP'; }
  	if(this.props.url.query.auth){ isView = 'AUTH'; }
  	if(this.props.url.query.uid){ isView = 'PROFILE'; }
    if(this.props.url.query.member){ 
      if(this.props.url.query.member === 'new_member'){
        isView = 'MEMBER';  
      } else  if(this.props.url.query.member === 'payment'){
        isView = 'MEMBER_PAYMENT'; 
      } 
    }


    return(
    <Layout page="profile">   
        <div className="container"> 
            { isView === 'LOAD' ? <div className="min-500"></div> : null }   
          	{ isView === 'LOGIN' ? <Login mode={this.props.url.query.login}  /> : null } 
            { isView === 'EDIT' ? <Edit  /> : null } 
            { isView === 'SIGNUP' ? <Signup  mode={this.props.url.query.signup} /> : null } 
            { isView === 'AUTH' ? <Auth  /> : null } 
            { isView === 'FORGOT' ? <Forgot  /> : null }
            { isView === 'MEMBER' ? <Member  /> : null } 
            { isView === 'MEMBER_PAYMENT' ? <MemberCon  /> : null } 
            { isView === 'PROFILE' ? <Profile data={item.data} uid={this.props.url.query.uid} view={this.props.url.query.view} gid={this.props.url.query.gid} /> : null } 
 

        </div>
    </Layout>
    )
  }
}