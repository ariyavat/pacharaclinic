import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name', 'tel'];

export default class GerneralList extends Component {
  constructor(props, context) {
    super(props, context);
    this.filterValueTimer = undefined;
    this.filterInput = undefined;
    this.state = {
      selected: [1], isSearch: false, data: [],  searchTerm: '',

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

  render() {
    const _this = this;
    const filteredData = this.state.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)); 

    const rowsA = filteredData.map((row, i) => {
      return (
        <tr key={i} >
          <td >{i + 1}</td>    
          <td >{row.name}</td>       
          <td className="text-center">
            <a className="text-info dblock alink" onClick={this.handleEdit.bind(_this,row)} >
              <i className="fa fa-pencil"></i>
            </a>
          </td>
        </tr>      
      );
    });


    const rowsB = filteredData.map((row, i) => {
      return (
        <tr key={i} >
          <td >{i + 1}</td>    
          <td >{row.name}</td> 
          <td >{row.val1}</td>
          <td >{row.val2}</td>
          <td >{row.val3}</td>      
          <td className="text-center">
            <a className="text-info dblock alink" onClick={this.handleEdit.bind(_this,row)} >
              <i className="fa fa-pencil"></i>
            </a>
          </td>
        </tr>
      );
    });


    return (
      <div className="box box-info min-600" >  
        <div className="box-header with-border" >     
        
           
                  <h3 className="box-title">{this.props.title}</h3> 
             
                        
        </div>
        <div className="box-body"> 
            <div className="row">
                <div className="col-sm-6 form-group">                    
                    <label  className="col-sm-2 control-label" >ค้นหา</label>
                    <div className="col-sm-10">
                      <input type="text" 
                        className="form-control" 
                        name="enter" 
                        value={this.state.searchTerm}                           
                        onChange={(e) => this.setState({searchTerm: e.target.value})} />
                    </div>
                </div>
                <div className="col-sm-6">
                  <button className="btn btn-flat btn-default pull-right" onClick={this.handleNew.bind(this)} >
                    <i className="fa fa-plus"></i> เพิ่มรายการ
                  </button>
                </div> 
            </div>
            <table id="mytable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th width="50">#</th>
                  {this.props.mode === 'A' ? <th>รายการ</th> : null }                  
                  {this.props.mode === 'B' ? <th>บัญชีเลขที่</th> : null }  
                  {this.props.mode === 'B' ? <th>ชื่อบัญชี</th> : null }  
                  {this.props.mode === 'B' ? <th>ธนาคาร</th> : null }  
                  {this.props.mode === 'B' ? <th>สาขา</th> : null } 
                  <th width="80"></th>                 
                </tr>
                </thead>
                <tbody>
                {this.props.mode === 'A' ? rowsA : null }   
                {this.props.mode === 'B' ? rowsB : null }  
                </tbody>
            </table>
        </div>  
    </div>

    );
  }
}

