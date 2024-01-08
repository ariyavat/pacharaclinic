import React, { Component } from 'react'
import { Link } from 'react-router'



function MessageMenu () {
	return (
      <li className="dropdown messages-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-envelope-o"></i>
          <span className="label label-success">4</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have 4 messages</li>
          <li>			              
            <ul className="menu">
              <li>
                <a href="#">
                  <div className="pull-left">k
                   </div>
                  <h4>
                    Support Team
                    <small><i className="fa fa-clock-o"></i> 5 mins</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>			                 
            </ul>
          </li>
          <li className="footer"><a href="#">See All Messages</a></li>
        </ul>
      </li>
	)
}

function NotificationsMenu () {
	return (
      <li className="dropdown notifications-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-bell-o"></i>
          <span className="label label-warning">10</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have 10 notifications</li>
          <li>			             
            <ul className="menu">
              <li>
                <a href="#">
                  <i className="fa fa-users text-aqua"></i> 5 new members joined today
                </a>
              </li>
            </ul>
          </li>
          <li className="footer"><a href="#">View all</a></li>
        </ul>
      </li>
	)
}

function AccountMenu (props) {    
  const { data, onLogout, onProfile} = props
  return (
          <li className="dropdown user user-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src="vendor/dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
              <span className="hidden-xs">{data.emp_name}</span>
            </a>
            <ul className="dropdown-menu">
              
              <li className="user-header">
                <img src="vendor/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>

                <p>
                  Admin
                  <small></small>
                </p>
              </li>

              <li className="user-footer">
                <div className="pull-left">
                  <button className="btn btn-default btn-flat" onClick={onProfile} >Profile</button>
                </div>
                <div className="pull-right">
                  <button className="btn btn-default btn-flat" onClick={onLogout} >Sign out</button>
                </div>
              </li>
            </ul>
          </li>
  )
}
//
class Navbar extends Component {
    constructor (props) {
      super(props); 
      this.state = { loading: false, data: [] }        
    }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
    componentDidMount () {
      const data = JSON.parse(localStorage.getItem('msClinic'));
      this.setState({ data: data });
    }

    handleLogout(e){
      e.preventDefault();
      localStorage.removeItem('msClinic');
      this.context.router.push({
           pathname: '/',
      }); 
    }

    handleProfile(e){
      /*
      e.preventDefault();
      this.context.router.push({
           pathname: '/app/profile',
      }); 
      */
    }

    render () { 
      const item = this.state;
      return (    
      <header className="main-header">
          <a href="#" className="logo">
            <span className="logo-mini"><b>P</b>R</span>
            <span className="logo-lg"><b>P</b>achara <b>C</b>linic</span>
          </a>
          <nav className="navbar navbar-static-top">
              <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </a>        

              <div className="navbar-custom-menu">
                

      
              </div>
          </nav>
        </header> 
      )
    }


}

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default Navbar