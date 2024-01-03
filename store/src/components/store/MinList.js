import React, {Component} from 'react';
import Pager from 'react-pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default class MinList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', auth: [], typ: 'ALL'

    };
  }
  componentWillMount(){
    const auth = JSON.parse(localStorage.getItem('msClinic')).auth; 
    this.setState({auth: auth});
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    
    this.setState({data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }



  render() {
    const _this = this;

    const { auth,typ } = this.state;
    const {data} = this.props;


    let i = 0;
    const rows = data.map((row, m) => {
    if( parseFloat(row.total) <= parseFloat(row.stotal)  ){
    	 i = i + 1
	      return (
	        <tr  key={i} >
	          <td >{i}</td>
	          <td >{row.id}</td>
	          <td >{row.name}</td>
	          <td >
	            {row.typ === 'C' ? <span>ครีม</span>  : null }
	            {row.typ === 'P' ? <span>แพ็คเก็จ</span>  : null }
	            {row.typ === 'S' ? <span>สติ๊กเกอร์</span>  : null }
	            {row.typ === 'B' ? <span>กล่องบรรจุ</span>  : null }
	          </td>   
	     
	          <td >{row.total}</td>   
	          <td >{row.stotal}</td>  
	          <td >{row.unit}</td>   
	          <td >            
	            {
	              row.typ === 'P' ? 
	              <span>แพ็คเก็จ</span> 
	              : <span>-</span> 
	            }          
	          </td> 


	          <td className="text-center" >
	          {
	            row.status === 'Y' ?
	            <i className="fa fa-check text-success"></i>
	            : 
	            <i className="fa fa-close text-danger"></i>   
	          }
	          </td> 

	        </tr>
	      );    	
    }

    });


    return (

      <section className="content">
        <div className="box box-info min-550" >  

          <div className="box-body">   
            <div className="row">
              <div className="col-sm-12">
                  <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="btn btn-fault pull-right"
                      table="mytable"
                      filename="products"
                      sheet="tablexls"
                      buttonText="Export File to Excel"
                  />  
              </div>
            </div>   
            <br/>    
            <div className="row">
              <div className="col-xs-12 col-sm-12 min-400">
                <table id="mytable" className="table table-bordered table-hover">
                    <thead>
                    <tr>
                      <th width="50">#</th>
                      <th width="200">รหัส</th>
                      <th>ชื่อรายวัตถุดิบ</th>        
                      <th>ประเภท</th>               
                      <th>จำนวน</th> 
                       <th>จุดสั่งซื้อ</th>
                      <th>หน่วย</th>  
                      <th>ขนาด/ปริมาณ</th> 
                      <th>สถานะ</th> 
                       
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>

              </div>
            </div>               


          </div>  


        </div>
      </section>
    );
  }
}


