import React, {Component} from 'react';
import Pager from 'react-pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', auth: [],

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


  handleNew () {
  	this.props.onNew();
  }

  handleEdit (data, e) {
    this.props.onEdit(data);
  }


  render() {
    const _this = this;   
    const {data} = this.props;

    
    const rows = data.map((row, i) => {
      return (
        <tr  key={i} >
          <td >{i + 1}</td>
          <td >{row.name}</td>
          <td >{row.tel}</td> 
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
            <div className="col-sm-9"> </div>
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
                  <th>สาขา</th>  
                  <th width="250">เบอร์โทร</th> 
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


