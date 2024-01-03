import React, {Component} from 'react';
import Pager from 'react-pager';


export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], searchTerm: '',
    };
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

  handleNew () {
  	this.props.onNew();
  }

  handleEdit (data, e) {
    this.props.onClick(data);
  }

  handleClear () {
    this.setState({searchTerm: ''}, () => {
      this.props.onSearch(this.state.searchTerm);
    });
  }

  _onKeyPress (event) {
    if (event.charCode === 13) {
      event.preventDefault();
      this.handleShowItem();
    }
  }

  handleShowItem(){
    this.props.onSearch(this.state.searchTerm); 
  }

  updatePerPage() {
    this.props.updatePerPages(this.refs.perpage.value);
  }


  render() {
    const _this = this;
    const {data,total,page,numberOfRows,rowsPerPage} = this.props;
    let count_total = total / numberOfRows;
   
    let createROW = function (item, key) {
      return <option value={item} key={key} >{item}</option>
    } 

    const rows = data.map((row, i) => {
      return (
        <tr key={i} >
          <td >{i + 1 + (numberOfRows * page)}</td>
          <td >{row.emp_name}</td>
          <td >{row.username}</td>      
          <td >
          {
            row.admin === 'A' ?
            <span></span>
            : 
            <i className="fa fa-close text-danger"></i>  
          }
          </td>                   
          <td className="text-center">
            <a className="text-info dblock alink" onClick={this.handleEdit.bind(_this,row)} >
              <i className="fa fa-pencil"></i>
            </a>
          </td>
        </tr>
      );
    });


    return (

      <section className="content">
        <div className="box box-info" >  
          <div className="box-header with-border" >
            <div className="col-sm-9">
              <form role="form">  
                <div className="row">
                  <div className="col-sm-5">
                            <div className="form-group">
                                <label>ค้นหา </label>
                                <input type="text" 
                                  className="form-control" 
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
                <i className="fa fa-plus"></i> เพิ่มผู้ใช้งาน
              </button>
            </div>          
          </div>
          <div className="box-body min-300">    
            
            <table id="mytable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th width="50">#</th>
                  <th>ผู้ใช้งาน</th>
                  <th>Username</th>   
                  <th>ประเภท</th>             
                  <th width="80"></th>                 
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
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


