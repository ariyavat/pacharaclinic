import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { getSeedoc} from '../../utils/DoctorAPI'

export default class ViewForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null, list: [],
    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {  	
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

 
  componentDidMount () {
  	this.getDatas(this.props.id)
  }

  componentWillReceiveProps(nextProps){
  	this.getDatas(nextProps.id)
  }

  handleRequest(){
    this.props.onRequest(true)
  }

  render () {
  	const item = this.state
    const rows = item.list.map((row, i) => {

      return(
        <div className="row" key={i}> 
          <div className="col-md-12 mgt-10 bg-cart-gray pad-10">
            <div className="row">   
              <div className="col-md-9"><b>สวัสดีคุณ {item.data!==null? item.data.cname  : null}</b></div> 
              <div className="col-md-3 text-right">
                <small>{item.data!==null? moment(row.dat).format('DD-MM-YYYY H:mm:ss') : null}</small>
              </div> 
            </div> 
            <hr/>
            <div className="row">   
              <div className="col-md-12">
              {renderHTML(row.mem)}
              </div>           
            </div> 
          </div>
        </div>  
      )
    })

  	return(
	<div className="row">
	  	<div className="col-sm-12 min-500">
			<div className="row">
			  	<div className="col-sm-5">
                        <button type="button" className="bg-green btn-green"  onClick={this.handleRequest.bind(this)}  >                  
                          สร้างคำถามถึงแพทย์
                        </button>
			  	</div>
			</div>
	      <div className="row"> 
	        <div className="col-md-12 mgt-10 bg-cart-gray pad-10">
	          <div className="row">   
	            <div className="col-md-9"><b>{item.data!==null? item.data.title  : null}</b></div> 
	            <div className="col-md-3 text-right">
	              <small>{item.data!==null? moment(item.data.dat).format('DD-MM-YYYY H:mm:ss') : null}</small>
	            </div> 
	          </div> 
	          <hr/>
	          <div className="row">   
	            <div className="col-md-12">
	            {item.data!==null? renderHTML(item.data.mem)  : null}
	            </div> 	         
	          </div> 
	        </div>
	      </div>  
        {rows}	

        <br/><br/>
	  	</div>

	</div>
	
  	)
  }

  getDatas(id){
    const _this = this
    let data = JSON.parse(localStorage.getItem('ms_profile'));
    getSeedoc(data.uid,id)
    .then(function(response) {   
        //console.log(response)  
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