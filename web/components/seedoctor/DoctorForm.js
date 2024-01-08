import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import { getLocations } from '../../utils/ContactAPI'

const localizer = momentLocalizer(moment)
export default class DoctorForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      	data: null, locations:[], eList : [], cn: '1', cname: ''
    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {  	
    return (this.props !== _nextProps)  || (this.state !== nextState);
  } 
  componentDidMount () {   
    const _this = this
    getLocations()
    .then(function(response) {   
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
        } 
      
        _this.setState({ locations: List }) 
    })  


  	this.setState({ data : this.props.datas },()=>{
  		this.setDatas('1')
  	})
  }

  componentWillReceiveProps(nextProps){
  	this.setState({ data : nextProps.datas },()=>{
  		this.setDatas('1')
  	})
  }

  handleRequest(){
    this.props.onClose()
  }

  setDatas(cn){
  	let list = []; //this.state.eList
  
	this.state.data.forEach(function(item){         
    	if(item.cn === cn){
    		let temp = {
	 	        start: item.day,
		        end: item.day,
		        title: item.dname1,
		        allDay: true
    		}
    		list.push(temp)
    	}   	          		    		
    	
    }) 
    this.setState({ eList: list })

  }

  handleLactionClick(id,name){
    this.setState({ cn: id, cname: name },()=>{
    	this.setDatas(id)
    })
  }


  render () {
  	const item = this.state


    const lrows = item.locations.map((row, i) => {
      let fcl = "fa fa-square-o"
      if(row.id === item.cn){
        fcl = "fa fa-check-square-o"
      }
      return (  
      <div className="row key={i} alink" onClick={this.handleLactionClick.bind(this,row.id,row.name)} > 
        <div className="col-md-1"></div> 
        <div className="col-md-1 mgt-5"><i className={fcl} /></div>  
        <div className="col-md-6 mgt-5">{row.name}</div> 
      </div>
      )
    })



  	return(
	<div className="row">
		<div className="col-sm-3">
			<h4>สาขา</h4>
			{lrows}
		</div>
	  	<div className="col-sm-9 min-800">
			<div className="row">
			  	<div className="col-12">
            
            <h4 className="pull-right">ตารางแพทย์</h4>					               
			  	</div>

			</div>

	        <div className="row"> 
	    		<div className="col-sm-12 mgt-20">			 

	    		</div>
       	    </div>

	        <div className="row"> 
	    		<div className="col-sm-12 mgt-20">

			      			<div className="calendar-container">
					        <Calendar
					          localizer={localizer}
					          events={item.eList}
					          startAccessor="start"
					          endAccessor="end"         
                    views={['month']}
					          style={{ height: 600 }}
					         />
					      </div>

	    		</div>
       	    </div>
	  	</div>
	  

	</div>
	
  	)
  }


    



}