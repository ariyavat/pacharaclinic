import React, {Component} from 'react';
import Pager from 'react-pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], auth: [], mode: 'P'

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
    this.setState({data: nextProps.data, mode: nextProps.mode});
  }


  handleChange(e){
    e.preventDefault() 
    const _this = this
    let mode = e.target.value;

    this.setState({mode: mode},()=>{
    	_this.props.onShow(mode)
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
    const item = this.state 
    const {data, groups, mode} = this.props;

    
    const rows = data.map((row, i) => {
      let tname = 'กลุ่มสินค้า'
      switch(row.mode){
      	case 'P': tname = 'กลุ่มสินค้า'; break;
      	case 'T': tname = 'กลุ่มทรีทเมนท์'; break;
      	case 'L': tname = 'กลุ่มเลเซอร์'; break;
      	case 'R': tname = 'กลุ่มรีวิว'; break;
      	case 'M': tname = 'กลุ่มแม่หลังคลอด'; break;
      }
      return (
        <tr  key={i} >
          <td >{i + 1}</td>
          <td >{tname}</td>
          <td >{row.gname}</td>
          <td className="text-center alink">
            <a className="text-info dblock" onClick={this.handleEdit.bind(_this,row)} >
              <i className="fa fa-pencil"></i>
            </a>
          </td> 
        </tr>
      );
    });


	let createGl = function (item, key) {
      return <option value={item.mode} key={key} >{item.name}</option>
    } 

    return (

      <section className="content">
        <div className="box box-info min-550" >  
          <div className="box-header with-border" >
            <div className="col-sm-9">
              <form role="form">  
                <div className="row">
             
                  <div className="col-sm-5">
                      <div className="form-group">                         
                    <select className="form-control" id="mode" ref='mode' value={item.mode} onChange={this.handleChange.bind(this)} > 
                      <option value="-">เลือกกลุ่ม</option>                        
                      {groups.map(createGl)}     
                    </select>                  



                      </div>
                  </div>  
             
                </div>
              </form>
            </div>
            <div className="col-sm-3 ">
            
            {
              mode !== 'T' ?
              <button className="btn btn-flat btn-default pull-right" onClick={this.handleNew.bind(this)} >
                <i className="fa fa-plus"></i> เพิ่มรายการใหม่
              </button>

              : null

            }

      

            </div>          
          </div>
          <div className="box-body">        
            <table id="mytable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th width="50">#</th>
                  <th width="200">ประเภท</th>
                  <th>กลุ่ม</th>        
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


