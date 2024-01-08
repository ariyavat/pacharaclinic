import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import uuid from 'uuid'
import renderHTML from 'react-render-html'
import { getAppointments, createAppointment } from '../../utils/AppointmentAPI'



const monthTH = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
const tmList = [
  {id: '11.00', end:'12.00', status: 'N', hn: ''}, {id: '12.00', end:'13.00', status: 'N', hn: ''},  
  {id: '13.00', end:'14.00', status: 'N', hn: ''}, {id: '14.00', end:'15.00', status: 'N', hn: ''},  
  {id: '15.00', end:'16.00', status: 'N', hn: ''}, {id: '16.00', end:'17.00', status: 'N', hn: ''},
  {id: '17.00', end:'18.00', status: 'N', hn: ''}, {id: '18.00', end:'19.00', status: 'N', hn: ''},
  
]
export default class BookForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: {id:'',end: ''}, list: [], timeList:  [], isForm: false, isLoad: false, appList: [],

    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {  	
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

 
  componentDidMount () {
  	this.setState({ timeList:  tmList },()=>{
  		this.getDatas()
  	})
  }

  componentWillReceiveProps(nextProps){
  	this.setState({ timeList:  tmList },()=>{
  		this.getDatas()	
  	})
  	
  }

  handleBook(data){
  	console.log(data)
  	this.setState({ data: data, isForm: true })
  }

  handleSaveBook(){
  
  	const _this = this
  	let item = this.state
    let { dat, cn, cname } = this.props
    let add_dat = moment().format('YYYY-MM-DD')
  	let customer = JSON.parse(localStorage.getItem('ms_profile'));
  	let temp = {
          id: uuid.v1(), 
          cn: cn, cname: cname, 
          add_date:  moment().format(), app_date: dat, 
          start_time: item.data.id, end_time: item.data.end,
          customer_id: customer.id, customer_name: customer.fullname, 
          tel: customer.tel, 
          doctor_id: '-', doctor_name: 'ไม่ระบุแพทย์',
          emp_id: '', emp_name: '', room_id: '', room_name: '', mem: '', status: 'NONE',
  	}
  	this.setState({ isLoad: true },()=>{
		createAppointment(temp)
			.then(function(results) {    
			if (results.data.status === '201') {          
			  _this.setState({ isLoad : false, isForm: false },()=>{
			    show_err('success','จองคิวเรียบร้อยแล้ว..')
			    _this.getDatas(dat)
			  })

			} else {
			  show_err('warning',results.data.msg);   
			}
		});  		
  	})
  	


  }

  handleCloseForm(){
  	this.setState({ isForm: false })
  }

  render () {
  	const item = this.state
  	const { dat, data } = this.props
  	let customer = JSON.parse(localStorage.getItem('ms_profile'));

  	let mnt = moment(dat).format('MM')
  	let year = parseFloat(moment(dat).format('YYYY')) + 543
  	let idx = parseFloat(mnt) - 1

  
    const rows = item.timeList.map((row, i) => {  
    	let mode = 'N', qty = 0
    	let idx = item.list.findIndex(x => x.btime === row.id);         
      	if(idx > -1){
      		mode = 'Y'
      		qty = item.list[idx].qty
      		 	
      	} 
      

      	let trows = data.tlist.map((val, j) => { 
      		let txt = '', status = 'N'

      		if(mode==='Y'){
      			if(j + 1 <= qty){
      				status = 'Y'
      				txt = 'ไม่ว่าง'
      				if(customer.id === item.list[idx].list[j].hn) {  txt = item.list[idx].list[j].name }   

      			}
      		}
      		return(
      			<td cls="text-right" key={j}>    
      			    { status === 'Y'? <span className="text-danger">{txt}</span>  : null  }

      				{
      					status === 'N'? 
      					<button className="btn-book pull-right" onClick={this.handleBook.bind(this,row)}><i className="fa fa-plus "/> จองคิว</button>
      					: null
      				}
      			</td>
      		)
      	})


      return(
	    <tr key={i}  >
	        <td className="text-center">{row.id} - {row.end}</td> 
	        {trows}
	    </tr> 
      )
    })

  	return(
	<div className="row">
	  	<div className="col-sm-12 min-500">
			<div className="row">
			  	<div className="col-sm-5">
			  	   <h3>
              		วันที่  {parseFloat(moment(dat).format('DD'))}  {monthTH[idx]} พ.ศ.{year}
              		</h3>

			  	</div>
			</div>
	      <div className="row"> 
	      {
	      	!item.isForm?
	      	<div className="col-md-12">
			   <table id="mytable" className="table table-bordered table-hover">
			      <thead>
			        <tr className="bg-cart-gray text-center">    
			          <th width="170"></th>   
			          {
			          	data.qty > 0 && data.tlist.map((row, i) => {
			          		return(
			          			<th  height="50" key={i}>{row.name}</th>
			          		)
			          	})
			          }
			          
			        </tr>
			      </thead>
			      <tbody>
			   		{rows}
			      </tbody>
			    </table>



	      	</div>
	      	: null
	      }

	          {
	          	item.isForm?
	        	<div className="col-md-12 mgt-10">



		          <div className="row"> 
		            <div className="col-2"></div>  
		            <div className="col-8 text-center">
		            <h2 className="txt-gn">ยืนยันการจองคิว</h2>
		            <h5>รหัส : {customer.id}</h5>
		            <h5>คุณ {customer.fullname}</h5>
		            <h5>จองคิว เวลา {item.data.id} - {item.data.end}</h5>

		            <button className="btn-cancel pull-left" onClick={this.handleCloseForm.bind(this)}><i className="fa fa-close"/> ยกเลิก</button>
		            <button className="btn-book pull-right" onClick={this.handleSaveBook.bind(this)}><i className="fa fa-check"/> ตกลง</button>
		            </div> 
		          </div> 
		         </div> 
	          	:null 
	        
	    	}
	      </div>  
     

        <br/><br/>
	  	</div>

	</div>
	
  	)
  }
  //
  getDatas(){
    const _this = this
    const { dat, data, cn } = this.props

    let tlist = tmList
    getAppointments(cn, 'NONE', dat, dat)
    .then(function(response) {   console.log(response.data)  	
        let list = []   
        let data = []    
        if(response.data.status === '200'){   
           data = response.data.data            
           data.forEach(function(item){    
          	let st = '-';          	
          	if(item.start_time!==''){
          		var txt = item.start_time.split(".");
          		if(txt.length > 1){          			
          			st = item.start_time
          		} else {
          			st = item.start_time+'.00'
          		}
          	}
          	
          	if(st!== '-'){
          		let idx = list.findIndex(x => x.btime === st);   
          		if(idx === -1){
          			let tmp = { btime: st, qty: 1, list: [{hn: item.customer_id, name: item.customer_name}]  }
          			list.push(tmp)
          		} else {
          			list[idx].qty =  list[idx].qty + 1
          			list[idx].list.push({hn: item.customer_id, name: item.customer_name})
          		}
          	}
          	
          })
        } 
        console.log(list)
        _this.setState({ list: list, timeList: tlist }) 
    })
  }




    



}