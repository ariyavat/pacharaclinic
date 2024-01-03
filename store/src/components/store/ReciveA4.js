import React, {Component} from 'react';
import moment from 'moment';
export default class ReciveA4 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], dList: [] };
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    this.setState({data: this.props.data.data, dList: this.props.data.dList });
  }

  componentWillReceiveProps(nextProps) { 
    this.setState({data: nextProps.data.data, dList: nextProps.data.dList });
  }

   handlePrint(){   
    const id = 'printlist'
    printElement(document.getElementById(id))
    window.print()  
    //this.setState({ printList: [] })
  }


  render() {
  	const item = this.state;
    const {onReset, title, mode, data} = this.props;    
  
    const rows = item.dList.map((data, i) => {
      return (
	    <tr key={i} >
	     	<td>{i+1}</td>
	     	{ mode === 'ADJ' ?  <td>{data.typ_name}</td>  : null }  
	      	<td >{data.product_name}</td>
	      	<td>{data.qty}</td>
	      	{ mode === 'IN' ?  <td>{data.price}</td>  : null }  	      	
	      	<td>{data.unit}</td>         
	    </tr>
      );
    });


    return (
    <div className="w-100"> 
    	<div className="line text-right"> <small>หน้า 1/1</small></div>
    	<div className="line">
	        <div className="W-50 fl">
	        	<div className="W-60 fl">
	        		<div className="line"><h5>สาขา&nbsp;&nbsp;&nbsp;&nbsp;</h5></div>
	        		<div className="line mgt-10"><h5>ผู้ตรวจสอบ&nbsp;&nbsp;&nbsp;&nbsp;</h5></div>
	        	</div>
	        	<div className="W-40 fl">
		        	<div className="line"><h5>{data.data.location_name}</h5></div>
		        	<div className="line"><h5>{data.data.con_name}</h5></div>
	        	</div>
	        </div>
	        <div className="W-50 fl">
	        	<div className="W-60 fl text-right">
	        		<div className="line"><h5>เลขที่&nbsp;&nbsp;&nbsp;&nbsp;</h5></div>
	        		<div className="line"><h5>วันที่&nbsp;&nbsp;&nbsp;&nbsp;</h5></div>
	        	</div>
	        	<div className="W-40 fl">
		        	<div className="line"><h5>{data.data.ino}</h5></div>
		        	<div className="line"><h5>{moment(data.data.dat).format('DD/MM/YYYY')}</h5></div>
	        	</div>
	        </div>
    	</div>
    	
    	<div className="line text-center mgt-20"><h3>{title}</h3></div>
    	<br/>
    	<div className="h-600">		
	      <table className="table">
	          <thead>
	          <tr>
	            <th width="30">#</th>	
	            { mode === 'ADJ' ?  <th width="90">ประเภท</th> : null }            
	            <th>รายการ</th>        
	            <th width="90">จำนวน</th>
	            { mode === 'IN' ?  <th width="90">ราคารวม</th> : null }  
	            <th  width="90">หน่วย</th>   
	          </tr>
	          </thead>
	          <tbody>
	       	   {rows}
	          </tbody>
	      </table>	
		</div>   
		

   
    </div>
    );
  }
}
