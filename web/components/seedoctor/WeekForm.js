import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { getSeedoc} from '../../utils/DoctorAPI'

export default class WeekForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null, list: [],
      times:[
      	{id:'10.00'}, {id:'10.30'}, {id:'11.00'}, {id:'11.30'}, {id:'12.00'}, {id:'12.30'}, 
      	{id:'13.00'}, {id:'13.30'}, {id:'14.00'}, {id:'14.30'}, {id:'15.00'}, {id:'15.30'},
      	{id:'16.00'}, {id:'16.30'}, {id:'17.00'}, {id:'17.30'}, {id:'18.00'}, {id:'18.30'},
      	{id:'19.00'}, {id:'19.30'}, {id:'20.00'}, {id:'20.30'}, {id:'21.00'}, {id:'21.30'}, 
      	{id:'22.00'}
      ]
    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {  	
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

 
  componentDidMount () {
  	//this.getDatas(this.props.id)
  }

  componentWillReceiveProps(nextProps){
  	//this.getDatas(nextProps.id)
  }

  handleRequest(){
    this.props.onRequest(true)
  }

  render () {
  	const item = this.state




  	return(
	<div className="row">
	  	<div className="col-sm-12 min-500">
	        <div className="row">       
	            <div className="col-sm-12 ">
	            WEEK
	            </div>                       
	        </div> 
	      <div className="row"> 
	        <div className="col-md-12 ">
	        <div className="ccontainer">
	            <div className="ctitle">
	                title February 2019 Week 6
	            </div>   
	            <div className="cdays">
		        	<div className="filler"></div>
		        	<div className="filler"></div>
		        	<div className="cday">Sun 3</div>
		        	<div className="cday current">Mon 4</div>
		        	<div className="cday">Tue 5</div>
		        	<div className="cday">Wed 6</div>
		        	<div className="cday">Thu 7</div>
		        	<div className="cday">Fri 8</div>
		        	<div className="cday">Sat 9</div>
	            </div>  
		      	<div className="ccontent">
					<div className="time">
q1
					</div>
					<div className="filler-col"></div>
		      	</div>

	            
	        </div>




	        </div>
	      </div>  
 
	  	</div>

	</div>
	
  	)
  }

  getDatas(id){
    const _this = this
    let data = JSON.parse(localStorage.getItem('ms_profile'));
    getSeedoc(data.uid,id)
    .then(function(response) {   
        console.log(response)  
        let List = []
        let data = null
        if(response.data.status === '200'){   
          data = response.data.data
          if(response.data.list !== 'NO'){
          	List = response.data.list
          }
        } 
        _this.setState({ data: data, list: List }) 
    })
  }

    



}