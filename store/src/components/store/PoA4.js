import React, {Component} from 'react';
import moment from 'moment';
export default class PoA4 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], dList: [], com_name: '-', company: null };
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    this.setState({
    	data: this.props.data, dList: this.props.dList, 
    	
    });
  }

  componentWillReceiveProps(nextProps) { 
 
    this.setState({
    	data: nextProps.data, dList: nextProps.dList, 
    	
    });
  }

   handlePrint(){   
    const id = 'printlist'
    printElement(document.getElementById(id))
    window.print()  
    //this.setState({ printList: [] })
  }


  render() {
  	const item = this.state;
    const {data, dList} = this.props;    
   
    const pagenum = 15;
    const  page =  Math.ceil(item.dList.length / pagenum);
    let total =  item.dList.length;
    let k = 0;
    const rows = []; 
    let totalPrice = 0;
    item.dList.map((data, i) => {
    	totalPrice = totalPrice + parseFloat(data.price)
    });

    for (var i = 0; i < page; i++) {
    	let dlist = [];
    	let m = (i * pagenum) + pagenum ;     	
    	if(m > total) { 
    		m =  total; total = 0; 
    	} else {
    		total = total - m;
    	}  
    	for (var j = 0; j < m; j++) {
    		dlist.push(item.dList[k]);
    		k++;    		
    	}
        rows.push( <BillList key={i} data={data} pagenum={pagenum} List={dlist} page={i+1} total={page} totalPrice={totalPrice}  /> );
    } 

    return (
    <div > 		
	{rows}   
    </div>
    );
  }
}



function BillList (props) {
	const {data, List, page, total, totalPrice, pagenum } = props;	
	console.log(data)
	let m = 0;
	if(page > 1){  
		m = (parseFloat(page) - 1) * pagenum
	}  
    const rows = List.map((data, i) => {
      let uprice = parseFloat(data.price) / parseFloat(data.qty)
      m = m + 1
      return (
		<tr key={i} className="mgt-10">
	        <td width="30" height="30">{m}</td>	       
	        <td>{data.product_name}</td>      
	        <td width="80" className="text-center">{data.qty}</td>
	        <td  width="70" className="text-center">{data.unit}</td> 
	        <td width="80" className="text-center">{uprice.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
	        <td width="80" className="text-center">{parseFloat(data.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
	    </tr>
      );
    });

	return(
    <div className="w-100"> 
     	<div className="line text-right"> <small>หน้า {page}/{total}</small></div> 
    	<div className="line">				
			<div className="W-25 fl text-center">&nbsp;&nbsp;</div>
			<div className="W-50 fl text-center">
				<div className="line mgt-10"><h4>บริษัท พชร คลินิก จำกัด</h4></div>
				<div className="line mgt-10">สนง.ใหญ่ เลขที่ 169 หมู่ 4 ต.สันผักหวาน อ.หางดง จ.เชียงใหม่ 50230 โทร.053-441565</div>				
				<div className="line mgt-10"><h4>ใบสั่งซื้อ</h4></div>
			</div>
			<div className="W-25 fl">&nbsp;&nbsp;</div>
    	</div>
		<br/>
    	<div className="line">
    		<div className="border-tp">
				<div className="W-60 fl">
					<div className="border-ttp">				
					
			        	<div className="W-20 fl">
			        		<div className="line">ผู้ขาย</div>
			        		<div className="line mgt-10">ที่อยู่</div>
			        	</div>
			        	<div className="W-80 fl">
				        	<div className="line">{data.sup_name}</div>
				        	<div className="line mgt-10"></div>
			        	</div>								
			
					</div>	
				</div>
				<div className="W-40 fl">
					<div className="border-tnp">
			        	<div className="W-20 fl text-left">
			        		<div className="line">เลขที่&nbsp;&nbsp;&nbsp;&nbsp;</div>
			        		<div className="line mgt-10">วันที่&nbsp;&nbsp;&nbsp;&nbsp;</div>
			        	</div>
			        	<div className="W-80 fl text-left">
				        	<div className="line">{data.ino}</div>
				        	<div className="line mgt-10">{moment(data.dat).format('DD/MM/YYYY')}</div>
			        	</div>								
					</div>	
				</div>
			</div>
		</div>



    	<div className="line">
	    	<div className="border-header">
		    	<table className="table">
		    	<tr>
			        <td width="30">#</td>	       
			        <td className="text-center">รายการ</td>			        
			        <td width="80" className="text-center">จำนวน</td>
			        <td  width="70" className="text-center">หน่วย</td> 
			        <td width="80" className="text-center">ราคาต่อหน่วย</td>
			        <td width="80" className="text-center">ราคารวม</td>
			         
			    </tr> 
			   	</table>
	    	</div>
	    	<div className="border-body_a4">
		    	<table className="table">
					{rows} 
			   	</table>
	    	</div>
	    	<div className="border-sum">
		    	<table className="table">
		    	<tr>			        
		    		<td colSpan="5" className="text-right"><h4>ราคารวม </h4> </td>	 
		    		<td width="150" className="text-center"><h4>{totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</h4></td>	 
			    </tr> 
			   	</table>				
	    	</div>
	    	<div className="border-foot">
		    	<table className="table">
		    	<tr>
			        <td width="30" colSpan="5" ><h4>หมายเหตุ : </h4> {data.mem}</td>
			    </tr> 
			   	</table>
	    	</div>

    	</div>
    	<div className="line">
    		<div className="border-bt">
				<div className="W-50 fl text-center">
					<div className="border-tt">				
						<span className="pull-left">ผู้สั่งซื้อ</span>
						<div className="line mgt-10">
								<div className="line mgt-10 bardot text-center">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</div><br/><br/>													
						</div>	
					</div>	
				</div>
				<div className="W-50 fl text-center">
					<div className="border-tn">
						<span className="pull-left">ในนาม</span>
						<div className="line mgt-10">
								<div className="line mgt-10 bardot text-center">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</div><br/><br/>
								ผู้มีอำนาจลงนาม							
						</div>										
					</div>	
				</div>
			</div>
		</div>
		
		{ parseFloat(page) < parseFloat(total) ? <div className="page-break"></div>  : null}
		  
    </div>
    )
}
