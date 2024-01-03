import React from 'react';
import moment from 'moment'

export default class StoreReportDetail extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
      data: [], dList: []
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
    const {data, dList, mode, onPrint} = this.props;
    return (
        <section className="content non-printable">
          <div className="box box-info min-650" >  
            <div className="box-header" >
				<div className="row">
					<div className="col-sm-5 pad-left-20 ">
						<h4 className="line25">เลขที่ : <span >{item.data.ino}</span> </h4>						
						{ mode !== 'A'? <h4 className="line25">ประเภท : <span >{item.data.typ_name}</span> </h4> : null }
						{ mode !== 'A'? <h4 className="line25">รับจาก : <span >{item.data.sup_name}</span> </h4> : null }						
						<h4 className="line25">หมายเหตุ : <span >{item.data.mem}</span> </h4>
					</div>
					<div className="col-sm-5 pad-left-20 ">
						<h4 className="line25">วันที่ : <span >{moment(item.data.dat).format('DD/MM/YYYY')}</span> </h4>
						{ mode !== 'A'? <h4 className="line25">พนักงาน : <span >{item.data.emp_name}</span> </h4> : null }
						{ mode !== 'A'? <h4 className="line25">ผู้ตรวจสอบ : <span >{item.data.con_name}</span> </h4> : null }

					</div>
					<div className="col-sm-2">
		              <a className="btn btn-app pull-right" onClick={onPrint} >
		                <i className="fa fa-print"></i> พิมพ์
		              </a>
					</div> 					
				</div>                 
            </div>
            <div className="box-body">  
              <DetailLists List={item.dList} mode={mode} />        
            </div> 
          </div>
        </section>
   
    );
  }

}



function DetailLists (props) {
	const _this = this
	const { List, mode } = props
	const list =  List.map((data,i) =>
        <tr key={i}> 
        	<td>{i+1}</td>   
        	<td>{data.product_id}</td>       
        	<td>{data.product_name}</td> 
        	<td>{data.qty}</td> 
        	{ mode !== 'A' ? <td>{data.price}</td>  : null }
            <td>{data.unit}</td> 
        </tr>
	)

	return(
	<table id="mytable" className="table table-bordered table-hover">
	    <thead>
	    <tr>
	      <th>#</th>	    
	      <th>รหัสสินค้า</th> 
	      <th>ชื่อสินค้า</th>	 	           
	      <th>จำนวน</th>	
	      { mode !== 'A' ? <th>ราคารวม</th>  : null }	      
	      <th>หน่วย</th>                      
	    </tr>
	    </thead>
	    <tbody>
	    {list}
	    </tbody>
	</table>
	)
}

