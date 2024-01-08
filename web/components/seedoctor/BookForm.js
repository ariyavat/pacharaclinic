import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { getSeedoctors, createSeedoctor} from '../../utils/DoctorAPI'

const monthTH = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
const tmList = [
	
	{id: '11.00', end:'11.30', status: 'N', hn: ''}, {id: '11.30', end:'12.00', status: 'N', hn: ''},  
	{id: '12.00', end:'12.30', status: 'N', hn: ''}, {id: '12.30', end:'13.00', status: 'N', hn: ''},  
	{id: '13.00', end:'13.30', status: 'N', hn: ''}, {id: '13.30', end:'14.00', status: 'N', hn: ''},  
	{id: '14.00', end:'14.30', status: 'N', hn: ''}, {id: '14.30', end:'15.00', status: 'N', hn: ''},  
	{id: '15.00', end:'15.30', status: 'N', hn: ''}, {id: '15.30', end:'16.00', status: 'N', hn: ''},  
	{id: '16.00', end:'16.30', status: 'N', hn: ''}, {id: '16.30', end:'17.00', status: 'N', hn: ''},  
	{id: '17.00', end:'17.30', status: 'N', hn: ''}, {id: '17.30', end:'18.00', status: 'N', hn: ''}, 
	{id: '18.00', end:'18.30', status: 'N', hn: ''}, {id: '18.30', end:'19.00', status: 'N', hn: ''},  
]
export default class BookForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: {id:'',end: ''}, list: [], timeList:  [], isForm: false, isLoad: false,

    }   
  }


  shouldComponentUpdate(_nextProps, nextState) {  	
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

 
  componentDidMount () {
  	this.setState({ timeList:  tmList },()=>{
  		this.getDatas(this.props.dat)
  	})
  }

  componentWillReceiveProps(nextProps){
  	this.setState({ timeList:  tmList },()=>{
  		//this.getDatas(nextProps.dat)	
  	})
  	
  }

  handleBook(data){
  	this.setState({ data: data, isForm: true })
  }

  handleSaveBook(){
  	const _this = this
    let {dat, data} = this.props
  	let customer = JSON.parse(localStorage.getItem('ms_profile'));
  	let temp = {
  		id: customer.id,
  		uid: customer.uid,
  		cname: customer.fullname,
  		doctor: data.dname1,
  		dat: dat,
  		btime: this.state.data.id, 
  		status: 'N'
  	}
  	this.setState({ isLoad: true },()=>{
		createSeedoctor(temp)
			.then(function(results) {  console.log(results)  
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
    	let txt = '', status = 'N'

    	let idx = item.list.findIndex(x => x.btime === row.id);         
      	if(idx > -1){
      		status = 'Y'
      		txt = 'ไม่ว่าง'
      		if(customer.id === item.list[idx].id) {  txt = item.list[idx].cname }      	
      	} 
      return(
	    <tr key={i}  >
	        <td className="text-center">{row.id} - {row.end}</td>         
	        <td cls="text-right">
	        	{ status === 'Y'? <span className="text-danger">{txt}</span>  : null  }

	        	{
	        		status === 'N' ?
	        		<button className="btn-book pull-right" onClick={this.handleBook.bind(this,row)}><i className="fa fa-plus "/> จองคิว</button>
	        		: null
	        	}
	        	
	        </td> 
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
	      	<div className="col-md-6">
			   <table id="mytable" className="table table-bordered table-hover">
			      <thead>
			        <tr className="bg-cart-gray text-center">    
			          <th width="60"></th>               
			          <th width="200" height="50">{data.dname1? data.dname1 : null}</th>
			        </tr>
			      </thead>
			      <tbody>
			   		{rows}
			      </tbody>
			    </table>



	      	</div>
	        <div className="col-md-6 mgt-10">
	          {
	          	!item.isForm?
		          <div className="row">   
		            <div className="col-md-12 text-center">

		            <h2>คำแนะนำ</h2>
		            <h5>คลิ๊กที่ ปุ่ม <span className="txt-gn">"จองคิว"</span>  เพื่อจองคิวพบแพทย์</h5><br/>
		            <span className="pull-left">
		            หากทีการแก้ไขเวลานัดหมาย กรุณาติดต่อ<br/>
					053-230423 สาขารวมโชค<br/>
					053-213485 สาขาราชภัฏ<br/>
					053-441565 สาขาหางดง<br/>
		            </span>
		            </div> 
		          </div> 
	          	:null 
	          }

	          {
	          	item.isForm?
		          <div className="row"> 
		            <div className="col-2"></div>  
		            <div className="col-8 text-center">
		            <h2 className="txt-gn">ยืนยันการจองคิว</h2>
		            <h5>รหัส : {customer.id}</h5>
		            <h5>คุณ {customer.fullname}</h5>
		            <h5>จองคิวพบ {data.dname1} เวลา {item.data.id} - {item.data.end}</h5>

		            <button className="btn-cancel pull-left" onClick={this.handleCloseForm.bind(this)}><i className="fa fa-close"/> ยกเลิก</button>
		            <button className="btn-book pull-right" onClick={this.handleSaveBook.bind(this)}><i className="fa fa-check"/> ตกลง</button>
		            </div> 
		          </div> 
	          	:null 
	          }

	        </div>
	      </div>  
     

        <br/><br/>
	  	</div>

	</div>
	
  	)
  }
  //
  getDatas(dat){
    const _this = this
    let tlist = tmList
    getSeedoctors(dat)
    .then(function(response) {
        let data = []       
        if(response.data.status === '200'){   
          data = response.data.data  
        } 
        _this.setState({ list: data, timeList: tlist  }) 
    })
  }




    



}