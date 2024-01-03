import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input';
import Navtabs from '../common/Navtabs'; 
const KEYS_TO_FILTERS = ['id', 'name', 'tel'];
const KEYS_TO_FILTERS_EMP = ['id', 'name'];
export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     data: [], searchTerm: '', searchEmp: '', typ: 'D', cn: '', empList: [],   
     tabs: [
      {title:' ข้อมูลแพทย์ / พนักงาน ',mode:''},{title:'  กำหนดแพทย์ / พนักงานประจำสาขา  ',mode:''}         
     ]  
    };
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    this.setState({data: this.props.data, typ: this.props.typ, empList: this.props.empList});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data, typ: nextProps.typ, cn: nextProps.cn,empList: nextProps.empList });
  }

  handlechange (e) {
    e.preventDefault()
    this.setState({typ: this.refs.etyp.value},()=>{  this.props.onGetData(this.refs.etyp.value);  });
  }

  handleCnChange(e){
    e.preventDefault();
    this.props.onLocation(this.refs.cn.value);

  }

  handleNew () {
  	this.props.onNew();

  }

  handleEdit (data, e) {
    this.props.onClick(data);
  }

  handleAdditem(data,e){
    e.preventDefault();
    const newData = { cn: this.state.cn, emp_id: data.id, emp_name: data.name }
    this.props.onAddItem(newData);
  }

  handleDelitem(data,e){
    e.preventDefault();
    const newData = { cn: data.cn, emp_id: data.emp_id}
    this.props.onDelItem(newData);      
  }

  render() {
    const _this = this;
    const item = this.state;
    const {data, loactionList, empList, empLT} = this.props;
    const filteredData = item.data.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS));  	
    const filteredEmp = item.empList.filter(createFilter(item.searchEmp, KEYS_TO_FILTERS_EMP));   
    const rows = filteredData.map((row, i) => {
      return (
        <tr key={i} >
          <td >{i + 1}</td>
          <td >{row.id}</td>
          <td >{row.name}</td>
          <td >{row.tel}</td>   
          <td className="text-center">
          {
            row.status === 'Y' ?
            <span className="label label-success">ใช้งาน</span>
            : 
            <span className="label label-danger">ระงับการใช้งาน</span> 
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


    const row_emp = filteredEmp.map((row, i) => {
      return (
        <tr key={i} >
          <td >{i + 1}</td>
          <td >{row.id}</td>
          <td >{row.name}</td>      
          <td className="text-center">
            <a className="text-info dblock alink" onClick={this.handleAdditem.bind(_this,row)} >
              <i className="fa fa-plus text-green"></i>
            </a>
          </td>
        </tr>
      );
    });

    const row_empLT = empLT.map((row, i) => {
      return (
        <tr key={i} >
          <td >{i + 1}</td>
          <td >{row.emp_id}</td>
          <td >{row.emp_name}</td>      
          <td className="text-center">
            <a className="text-info dblock alink" onClick={this.handleDelitem.bind(_this,row)} >
              <i className="fa fa-remove text-red"></i>
            </a>
          </td>
        </tr>
      );
    });


    let createLG = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    return (

      <section className="content">
        <div className="box box-info min-550" >  
          <div className="row mgt-20">
            <div className="col-sm-9">
              <Navtabs tabs={item.tabs} >
                <div className="tab-pane active min-663" id="tab_0" >
                  <div className="row mgt-10">
                    <div className="col-sm-9">
                      <form role="form">  
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="form-group">
                              <label>ประเภท</label>
                              <select className="form-control"  ref="etyp" value={item.typ}  onChange={this.handlechange.bind(this)}> 
                                <option value="D">แพทย์</option>                        
                                <option value="E">พนักงาน</option> 
                              </select>
                            </div>
                          </div>  
                          <div className="col-sm-5">
                            <div className="form-group">
                                <label>ค้นหา</label>
                                <input type="text" 
                                  className="form-control" 
                                  name="enter" 
                                  value={this.state.searchTerm}                           
                                  onChange={(e) => this.setState({searchTerm: e.target.value})} />
                            </div>
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
                  <div className="row">
                    <div className="col-sm-12">
                      <table id="mytable" className="table table-bordered table-hover">
                          <thead>
                          <tr>
                            <th width="50">#</th>
                            <th width="200">รหัส</th>
                            <th>ชื่อ</th>        
                            <th>เบอร์โทร</th>
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
                </div>
                <div className="tab-pane min-663" id="tab_1" >
                <form className="form-horizontal">
                  <div className="row mgt-10">
                    <div className="col-sm-6">
                      <h4>รายชื่อแพทย์ / พนักงานทั้งหมด</h4><br/>
                      <div className="form-group">
                          <label  className="col-sm-2 control-label" >ค้นหา </label>
                          <div className="col-sm-6">
                            <input type="text" 
                              className="form-control" 
                              name="enter" 
                              value={this.state.searchEmp}                           
                              onChange={(e) => this.setState({searchEmp: e.target.value})} />
                          </div>
                      </div>
                      <table id="mytable" className="table table-bordered table-hover">
                          <thead>
                          <tr>
                            <th width="50">#</th>
                            <th>รหัส</th>
                            <th>ชื่อ-สกุล</th>                                            
                            <th width="50"></th>                 
                          </tr>
                          </thead>
                          <tbody>
                          {row_emp}
                          </tbody>
                      </table>
                    </div>
                    <div className="col-sm-6">
                        <h4>รายชื่อแพทย์ / พนักงานประจำสาขา</h4><br/>
                        
                        <div className="form-group">
                            <label  className="col-sm-2 control-label" >สาขา <span className="text-red">*</span></label>
                            <div className="col-sm-6">
                              <select className="form-control select2" id="cn" ref='cn' value={item.cn} onChange={this.handleCnChange.bind(this)} >                                         
                                {loactionList.map(createLG)}     
                              </select>            
                            </div>
                        </div> 
                        <table id="mytable" className="table table-bordered table-hover">
                            <thead>
                            <tr>
                              <th width="50">#</th>
                              <th>รหัส</th>
                              <th>ชื่อ-สกุล</th>                                            
                              <th width="50"></th>                 
                            </tr>
                            </thead>
                            <tbody>
                            {row_empLT}
                            </tbody>
                        </table>


                        
                    </div>
                    
                  </div>

                </form>
                </div>
              </Navtabs>

            </div>
            <div className="col-sm-3">
              <ul className="timeline timeline-inverse">  
                  <li className="time-label">
                      <span className="bg-aqua">
                        คำแนะนำ
                      </span>
                  </li>
                  <li>
                    <i className="fa fa-circle-o bg-blue"></i>
                    <div className="timeline-item">                          
                      <div className="timeline-body">
                        <span><b>เพิ่มแพทย์ / พนักงาน</b></span><br/>
                        <span className="pad-10"> - เลือกประเภท</span><br/>  
                        <span className="pad-10"> - กดปุ่มเพิ่มรายการใหม่</span><br/>
                        <span className="pad-10"> - กรอกข้อมูลในหน้าจอรายละเอียดแล้วบันทึกข้อมูล</span><br/>
                      </div>
                    </div>
                  </li>
                  <li>
                    <i className="fa fa-circle-o bg-blue"></i>
                    <div className="timeline-item">                          
                      <div className="timeline-body">
                        <span><b>กำหนดแพทย์ / พนักงานประจำสาขา</b></span><br/>
                        <span>คือการกำหนดให้พนักงานประจำแต่ละสาขาที่ทำงานอยู่</span>
                        <span className="pad-10"> - เลือกแท็บ กำหนดแพทย์ / พนักงานประจำสาขา</span><br/>  
                        <span className="pad-10"> - เลือกสาขาที่ต้องการ</span><br/>  
                        <span className="pad-10"> - คลิ๊กที่ปุ่ม + หลังรายชื่อแพทย์ / พนักงาน เพื่อเพิ่มพนักงานเข้าสามขา</span><br/>
                        <span className="pad-10"> - คลิ๊กที่ปุ่ม - หลังรายชื่อแพทย์ / พนักงาน เพื่อลบออกจากสาขา</span><br/>
                      </div>
                    </div>
                  </li>


              </ul>

            </div>
          </div>


        </div>
      </section>
    );
  }
}

