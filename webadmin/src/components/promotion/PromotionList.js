import React, {Component} from 'react';
import Pager from 'react-pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default class PromotionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', auth: [], group_id: 'ALL'

    };
  }
  componentWillMount(){
   // const auth = JSON.parse(localStorage.getItem('msClinic')).auth; 
   // this.setState({auth: auth});
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

  handleDGchange (e) {
    e.preventDefault()
    let idx = this.props.gList.findIndex((x) => x.id === this.refs.dg.value);
    this.setState({group_id: this.refs.dg.value},()=>{
      this.props.onSearch(this.refs.dg.value,'');
    });
  }

  handleNew () {
  	this.props.onNew();
  }

  handleEdit (data, e) {
    this.props.onEdit(data);
  }


  render() {
    const _this = this;

    const { auth,group_id } = this.state;
    const {data} = this.props;

    
    const rows = data.map((row, i) => {
      return (
        <tr  key={i} >
          <td >{i + 1}</td>
          <td >{row.id}</td>
          <td >{row.promotion_name}</td>
          <td >{row.price_sale}</td>
          <td >{row.price_total}</td>
          <td className="text-center"  >{row.discount}</td>
          <td >{row.unit}</td>   
          <td className="text-center" >
          {
            row.status === 'Y' ?
            <i className="fa fa-check text-success"></i>
            : 
            <i className="fa fa-close text-danger"></i>   
          }
          </td>  
          <td className="text-center alink">
            <a className="text-info dblock" onClick={this.handleEdit.bind(_this,row)} >
              <i className="fa fa-pencil"></i>
            </a>
          </td> 
        </tr>
      );
    });


    return (

      <section className="content">
        <div className="box box-info min-550" >  
          <div className="box-header with-border" >
            <div className="col-sm-9">
              <form role="form">  
                <div className="row">
             
                  <div className="col-sm-5">
                      <div className="form-group">                         
                          <input type="text" 
                            className="form-control" autoComplete="off"
                            name="enter" 
                            value={this.state.searchTerm}                           
                            onChange={(e) => this.setState({searchTerm: e.target.value})}                               
                            />
                      </div>
                  </div>  
             
                </div>
              </form>
            </div>
            <div className="col-sm-3 ">
       
              <button className="btn btn-flat btn-default pull-right" onClick={this.handleNew.bind(this)} >
                <i className="fa fa-plus"></i> เพิ่มรายการใหม่
              </button>
      

            </div>          
          </div>
          <div className="box-body">        
            <table id="mytable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th width="50">#</th>
                  <th width="100">รหัส</th>
                  <th>รายการ</th>  
                  <th width="100">ราคาขาย</th>   
                  <th width="100">ราคาปกติ</th>
                  <th width="90">ส่วนลด (%)</th>
                  <th width="100">หน่วย</th>  
                  <th width="80">สถานะ</th> 
                  <th width="80"></th>                                   
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
          </div>  


        </div>
      </section>
    );
  }
}


