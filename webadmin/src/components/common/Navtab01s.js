import React, { Component } from 'react'
class Navtab01s extends Component {
	render () {	
		let createTab = function (item, key) {
		  let id = '#tab01_'+key
		  let classname = ''
		  let title = <a href={id} data-toggle="tab">{item.title}</a>
		  if(item.mode==='setting'){  
		  	classname = 'pull-right'  
		  	title = <a href={id} data-toggle="tab" className="text-muted"><i className="fa fa-gear"></i></a>
		  } else {
		  	if(key===0){ classname='active'  }
		  }

	      return <li key={key} className={classname} >{title}</li> 
	    }


		return (
		<div className="nav-tabs-custom">
	        <ul className="nav nav-tabs">
	        	{this.props.tabs.map(createTab)}	         
	        </ul>
	        <div className="tab-content">
	        	{this.props.children}
	        </div>
	    </div>
		)
	}
}

export default Navtab01s