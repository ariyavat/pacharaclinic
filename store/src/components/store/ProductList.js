 import React, {Component} from 'react';
import Pager from 'react-pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default class ProductList extends Component {
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

  handleDGchange (e) {
    e.preventDefault()
    let idx = this.props.gList.findIndex((x) => x.id === this.refs.dg.value);
    this.setState({typ: this.refs.dg.value},()=>{
      this.props.onSearch(this.refs.dg.value,'');
    });
  }

  handleNew () {
  	this.props.onNew();
  }

  handleEdit (data, e) {
    this.props.onEdit(data);
  }

  handleView (data, e) {
    this.props.onView(data);
  }

  handleClear () {
    this.setState({searchTerm: ''}, () => {
      this.props.onSearch(this.state.typ,this.state.searchTerm);
    });
  }

  _onKeyPress (event) {
    if (event.charCode === 13) {
      event.preventDefault();
      this.handleShowItem();
    }
  }

  handleShowItem(){
    this.props.onSearch(this.state.typ,this.state.searchTerm); 
  }

  updatePerPage() {
    this.props.updatePerPages(this.refs.perpage.value);
  }

  render() {
    const _this = this;

    const { auth,typ } = this.state;
    const {data, gList, total,page,numberOfRows,rowsPerPage} = this.props;
    let count_total = total / numberOfRows;
   
    let createDG = function (item, key) {
      return <option value={item.typ} key={key} >{item.name}</option>
    } 

    let createROW = function (item, key) {
      return <option value={item} key={key} >{item}</option>
    } 
    
    const rows = data.map((row, i) => {
      return (
        <tr className="alink" key={i} >
          <td onClick={this.handleView.bind(_this, row)}>{i + 1 + (numberOfRows * page)}</td>
          <td onClick={this.handleView.bind(_this, row)}>{row.id}</td>
          <td onClick={this.handleView.bind(_this, row)}>{row.name}</td>
          <td onClick={this.handleView.bind(_this, row)}>
            {row.typ === 'C' ? <span>ครีม</span>  : null }
            {row.typ === 'P' ? <span>แพ็คเก็จ</span>  : null }
            {row.typ === 'S' ? <span>สติ๊กเกอร์</span>  : null }
            {row.typ === 'B' ? <span>กล่องบรรจุ</span>  : null }
          </td>   
     
          <td onClick={this.handleView.bind(_this, row)}>{row.total}</td>   
          <td onClick={this.handleView.bind(_this, row)}>{row.stotal}</td>  
          <td onClick={this.handleView.bind(_this, row)}>{row.unit}</td>   
          <td onClick={this.handleView.bind(_this, row)}>            
            {
              row.typ === 'P' ? 
              <span>แพ็คเก็จ</span> 
              : <span>-</span> 
            }          
          </td> 


          <td className="text-center" onClick={this.handleView.bind(_this, row)}>
          {
            row.status === 'Y' ?
            <i className="fa fa-check text-success"></i>
            : 
            <i className="fa fa-close text-danger"></i>   
          }
          </td> 
          <td className="text-center">
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
                  <div className="col-sm-4">
                    <label>ประเภท <span className="text-red">*</span></label>
                    <select className="form-control" id="dg"  ref="dg" value={typ}  onChange={this.handleDGchange.bind(this)}> 
                      <option value="ALL">แสดงทั้งหมด</option>                        
                      {gList.map(createDG)}     
                    </select>   


                  </div>
                  <div className="col-sm-5">
                      <div className="form-group">
                          <label>ค้นหา <span className="text-red">*</span></label>
                          <input type="text" 
                            className="form-control" autoComplete="off"
                            name="enter" 
                            value={this.state.searchTerm}                           
                            onChange={(e) => this.setState({searchTerm: e.target.value})}                               
                            onKeyPress={this._onKeyPress.bind(this)} />
                      </div>
                  </div>  
                  <div className="col-sm-2 pad-top-25">
                    <button type="button" className="btn btn-flat btn-default" onClick={this.handleShowItem.bind(this)} >
                      <i className="fa fa-search"></i> แสดงข้อมูล
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-sm-3 pad-top-25">
        
              <button className="btn btn-flat btn-default pull-right" onClick={this.handleNew.bind(this)} >
                <i className="fa fa-plus"></i> เพิ่มรายการใหม่
              </button>


            </div>          
          </div>
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
                      <th width="80"></th>        
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>

              </div>
            </div>               

            <div className="row">
              <div className="col-xs-2 col-sm-2 pad-top-15">
                  <select className="form-control" id="perpage" ref="perpage" onChange={this.updatePerPage.bind(this)} >                          
                    {rowsPerPage.map(createROW)}     
                  </select> 

              </div>
              <div className="col-xs-10 col-sm-10">
                <Pager
                  total={count_total}
                  current={page}
                  visiblePages={5}
                  titles={{ first: '<', last: '>' }}
                  className="pagination-sm pull-right"
                  onPageChanged={this.props.updateRows}
                /> 
              </div>
            </div>
          </div>  


        </div>
      </section>
    );
  }
}


