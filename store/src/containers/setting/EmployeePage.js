import React from 'react';
import axios from 'axios';

import EmployeeList from '../../components/setting/EmployeeList';
import EmployeeForm from '../../components/setting/EmployeeForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {
    getEmployee, getEmployees, createEmployee, updateEmployee, deleteEmployee,
    getEmployeeLocation, createEmployeeLocation, deleteEmployeeLocation
} from '../../utils/EmployeeAPI';
import {getAutonumber, getAutonumberID, setAutonumber} from '../../utils/AutonumberAPI';
import {getLocations} from '../../utils/CompanyAPI';

const initialState = {
  isView: 'LIST', isEdit: false, data: [], employees: [], autonumber: 'N', adata: [], typ: 'D', loading: true,
  empList: [], loactionList: [], empLT: [], cn: '',
 
};


export default class EmployeePage extends React.Component {

  constructor(props) {
    super(props);
    this.autonumber_data = null;
    this.state = initialState;
  }
  reset (e) {
    e.preventDefault();
    this.setState({isView: 'LIST', isEdit: false, open: false, data: []});
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {
    const _this = this;
    getLocations()
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({ loactionList: results.data.data, cn: results.data.data[0].id},()=>{  
          _this.getEmpLocation(_this.state.cn);
        });
      }
    });

    this.getAllData();
    this.getDatas();
  }

  handleShowdata(typ){
    this.setState({ typ: typ },()=>{ this.getDatas();  });     
  }

  handleNewForm (e) {
    let _this = this;
    const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    let typ = 'DT';
    if(this.state.typ === 'D'){ typ='DT'; } else { typ='EP'; }
    getAutonumber(typ,cn)
    .then(function(results) {
      if (results.data.status === '200') {
        let data = results.data.data;
        _this.setState({isView: 'FORM', isEdit: false, data: [], adata: data, autonumber: data.typ});
      } else {
        _this.setState({isView: 'FORM', isEdit: false, data: [], adata: [], autonumber: 'N'});
      }
    });
  }

  handleEdit (data) {
    this.setState({isView: 'FORM', isEdit: true, data: data});
  }

  handleSaveData (data) {
    const _this = this;
    if (this.state.isEdit === true) {
      const temp = {
        name: data.name, typ: data.typ, address: data.address, tel: data.tel,
        status: data.status,
      };
      const newData = {data: temp, id: data.id};
      this.updateData(newData);
    } else {
      if (this.state.autonumber === 'Y') {
        let newData = getAutonumberID(this.state.adata);
        data.id = newData.lastID;
        setAutonumber(newData.id, newData.maxID)
        .then(function(results) {
          _this.saveData(data);
        });
      } else {
        this.saveData(data);
      }
    }
  }

  handleDelete () {
    this.setState({isView: 'DELETE'});
  }

  DeleteResult (status){
    if (status === 'YES') {
      let data = {id: this.state.data.id} ;
      this.deleteData(data);
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleLocationChange(cn){   
    this.setState({ cn: cn },()=>{  this.getEmpLocation(cn); })
  }

  handleAddLocation(data){
    this.addLocation(data);
  }

  handleDelLocation(data){
    this.deleteLocation(data);
  }

  render() {  
    const item = this.state;
    return (
      <div>
        <ContentHeader title="ตั้งค่าระบบ" small="ข้อมูลแพทย์ / พนักงาน" />

        {
          this.state.isView === 'LOAD' ?
          'LOADING.....' : null
        }

        {
          this.state.isView === 'LIST' ?
            <EmployeeList
              typ={item.typ}
              data={item.employees}
              empList={item.empList}
              empLT={item.empLT}
              cn={item.cn}
              loactionList={item.loactionList}
              onLocation={this.handleLocationChange.bind(this)}
              onAddItem={this.handleAddLocation.bind(this)}
              onDelItem={this.handleDelLocation.bind(this)}
              onGetData={this.handleShowdata.bind(this)}
              onClick={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
            /> :
          null
        }


        {
          this.state.isView === 'FORM' ?
            <EmployeeForm
              typ={item.typ}
              onReset={this.reset.bind(this)}
              onSave={this.handleSaveData.bind(this)}
              onDelete={this.handleDelete.bind(this)}
              isEdit={item.isEdit}
              data={item.data}
              autonumber={item.autonumber}
            />          :
          null
        }

        {
          this.state.isView === 'DELETE' ?
            <ConfirmBox
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }

      </div>
    );
  }
    //

  getDatas () {
    let _this = this;
    getEmployees(this.state.typ,'ALL')
    .then(function(results) {
      if (results.data.status === '200') {        
        _this.setState({employees: results.data.data, isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({employees:[],  isView: 'LIST'});
      }
    });
  }

  getAllData(){
     let _this = this;
    getEmployees('ALL','Y')
    .then(function(results) {
      if (results.data.status === '200') {        
        _this.setState({empList: results.data.data, isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({empList:[],  isView: 'LIST'});
      }
    });   
  }

  getEmpLocation (cn) {
    let _this = this;
    getEmployeeLocation(cn)
    .then(function(results) {
      console.log(results);
      if (results.data.status === '200') {        
        _this.setState({empLT: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({empLT:[]});
      }
    });
  }

  saveData (data) {
    let _this = this;
    let con = 'Y'; let msg = '';
    if (data.id !== '') {
      if (data.name !== '') {
        con = 'Y';
      } else {
        con = 'N'; msg = 'ไม่ได้กรอกชื่อ';
      }
    } else {
      con = 'N'; msg = 'ไม่ได้กรอกรหัส';
    }
    if (con === 'Y') {
      createEmployee(data)
      .then(function(results) {
        if (results.data.status === '201') {
          show_err('success','บันทึกข้อมูลเรียบร้อย') 
          _this.getDatas();
        } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ') 
        }
      });
    } else {
      show_err('warning',msg)   
    }
  }

  updateData (data) {
    let _this = this;
    updateEmployee(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas();
      }
    });
  }

  deleteData (data) {
    let _this = this;
    deleteEmployee(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(); 
      }
    });
  }



  addLocation (data) {
    let _this = this;
    createEmployeeLocation(data)
    .then(function(results) {
      
      if (results.data.status === '201') {
        show_err('success','เพิ่มพนักงานประจำสาขาเรียบร้อยแล้ว...') 
        _this.getEmpLocation(data.cn);
      }
    });  
  }

  deleteLocation (data) {
    let _this = this;
    deleteEmployeeLocation(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบพนักงานออกจากสาขาเรียบร้อยแล้ว') 
        _this.getEmpLocation(data.cn); 
      }
    });
  }

  
}
