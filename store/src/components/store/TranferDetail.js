import React from 'react';
import moment from 'moment'
import {updatePo} from '../../utils/StoreAPI';


export default class TranferDetail extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
      data: { status: 'N' }, dList: []
    }; 
  }


  shouldComponentUpdate(_nextProps, nextState) {
     return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    this.setState({data: this.props.data, dList: this.props.dList});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data, dList: nextProps.dList});
  }



  render() {
  	const item = this.state;
    const {data, dList, onPrint} = this.props;  
   
    return (
        <section className="content non-printable">
          <div className="box box-info min-650" >  
            <div className="box-header" >
				<div className="row">
					<div className="col-sm-5 pad-left-20 ">
						<h4 className="line25">เลขที่ : <span >{item.data.ino}</span> </h4>		
						<h4 className="line25">ผู้ขออนุมัติ : <span >{item.data.emp_name}</span> </h4>			
											
						
					</div>
					<div className="col-sm-5 pad-left-20 ">
						<h4 className="line25">วันที่ : <span >{moment(item.data.dat).format('DD/MM/YYYY')}</span> </h4>
						<h4 className="line25">ผู้อนุมัติ : <span >{item.data.con_name}</span> </h4>
						<h4 className="line25">หมายเหตุ : <span >{item.data.mem}</span> </h4>

					</div>
					<div className="col-sm-2">
						<div className="row">
							<div className="col-sm-12">
				                <button className="btn btn-flat btn-block btn-default pull-right" onClick={onPrint} >
				                  <i className="fa fa-print"></i> พิมพ์ใบโอน
				                </button>
							</div>
						</div>

		


		          
					</div> 					
				</div>                 
            </div>
            <div className="box-body">  
              <DetailLists List={item.dList} mode={data.status} />        
            </div> 
          </div>
        </section>
   
    );
  }

}





function DetailLists (props) {
	const _this = this
	const { List, mode } = props
	let totalPrice = 0
    List.map((data, i) => {
    	totalPrice = totalPrice + parseFloat(data.price)
    });
	const list =  List.map((data,i) =>
        <tr key={i}> 
        	<td>{i+1}</td>   
        	<td>{data.product_id}</td>       
        	<td>{data.product_name}</td> 
        	<td>{data.qty}</td>        
            <td>{data.unit}</td> 
            <td>{data.barcode}</td> 
        </tr>
	)

	return(
	<table id="mytable" className="table table-bordered table-hover">
	    <thead>
	    <tr>
	      <th width='40'>#</th>	    
	      <th width='100'>รหัสสินค้า</th> 
	      <th>ชื่อสินค้า</th>		           
	      <th width='90'>จำนวน</th>	    
	      <th width='80'>หน่วย</th>   
	      <th width='130'>BARCODE</th>	                    
	    </tr>
	    </thead>
	    <tbody>
	    {list}
	    </tbody>
	</table>
	)
}

