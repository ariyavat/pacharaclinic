import React, {Component} from 'react';
import moment from 'moment'
import Pager from 'react-pager';
import SearchInput, {createFilter} from 'react-search-input';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const KEYS_TO_FILTERS = ['aid', 'dat'];



export default class DoctorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', mnt: '-', yt:'',
    };
  }
  componentWillMount(){
    //const auth = JSON.parse(localStorage.getItem('msClinic')).auth; 
   // this.setState({auth: auth});
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () { 

    this.setState({data: this.props.data, mnt: parseFloat(moment().format('MM')), yt: moment().format('YYYY') });
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


  handleChange(e){
    e.preventDefault() 
    this.setState({mnt: e.target.value}); 
  }

  handleShowdata(e){
    e.preventDefault() 
    let dat = this.state.yt;
    if(this.state.mnt.toString().length===1){
      dat = dat+'-0'+this.state.mnt
    } else {
      dat = dat+'-'+this.state.mnt
    }
    console.log(dat)
    this.props.onShow(dat)
   // this.setState({mnt: e.target.value}); 
  }



  render() {
    const _this = this;
    const item = this.state
    const { auth,group_id } = this.state;
    const {data, monthTH, mode} = this.props; 

    let createMn = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    const rows = data.map((row, i) => {

      return (
        <tr  key={i}   >
          <td>{row.cname}</td>
          <td className="text-center">{moment(row.day).format('DD/MM/YYYY')}</td> 
          <td>
          {row.dname1}
          </td> 

          <td className="text-center alink">
            <a className="text-red dblock" onClick={this.handleEdit.bind(this,row)} >
              <i className="fa fa-trash"></i>
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
                <div className="row">
                  <div className="col-sm-3">
                    <select className="form-control" id="mnt" ref='mnt' value={item.mnt} onChange={this.handleChange.bind(this)} > 
                      <option value="-">เลือกเดือน</option>                        
                      {monthTH.map(createMn)}     
                    </select> 
                  </div>
                  <div className="col-sm-3">
                    <input type="text" 
                      className="form-control" autoComplete="off"
                      name="enter" 
                      value={this.state.yt}                           
                      onChange={(e) => this.setState({yt: e.target.value})} />
                  </div>
                  <div className="col-sm-3">
                    <button className="btn btn-flat btn-default pull-right" onClick={this.handleShowdata.bind(this)} >
                       แสดงข้อมูล
                    </button>
                  </div>
                </div>
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
                  <th className="text-center" width="250">สาขา</th>
                  <th className="text-center" width="250">วัน</th>           
                  <th className="text-center">แพทย์</th> 
                  <th className="text-center" width="100"></th>
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


