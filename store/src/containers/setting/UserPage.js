import React from 'react';
import axios from 'axios';
import UserList from '../../components/setting/UserList';
import UserForm from '../../components/setting/UserForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getEmployees} from '../../utils/EmployeeAPI';
import {getUserName, getUser, getUsers, serchUsers, createUser, updateUser, deleteUser} from '../../utils/UserAPI';

const initialState = {
  isView: 'LOAD', isEdit: false, data: [], users: [], searchText: '', empList: [],
  rowsPerPage: [20, 30, 50, 100], numberOfRows: 20, page: 0, total: null,
};


export default class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.autonumber_data = null;
    this.state = initialState;
  }
  reset (e) {
    e.preventDefault();
    this.setState({isView: 'LIST', isEdit: false, data: [], open: false});
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {
    this.getDatas(0, 20);
    this.getEmployee();
  }

  handleNewForm (e) {
    let _this = this;
    _this.setState({isView: 'FORM', isEdit: false, data: []});
  }

  handleEdit (data) {
    console.log(data)
    this.setState({isView: 'FORM', isEdit: true, data: data});
  }

  handleSaveData (data) {
    const _this = this;
    if (this.state.isEdit === true) {
       this.updateData(data);
    } else {    
       this.saveData(data);
    }
  }

  handleDelete () {
    this.setState({isView: 'DELETE'});
  }

  DeleteResult (status) {
    if (status === 'YES') {
      let data = {uid: this.state.data.uid} ;
      this.deleteData(data);
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  onSearch (data) {
    this.setState({searchText: data}, () => {
      this.getDatas(0, this.state.numberOfRows);
    });
  }

  onChangePage (pageOfItems) {
    this.setState({numberOfRows: pageOfItems.numberOfRows, page: pageOfItems.page}, () => {
      this.getDatas(pageOfItems.page, pageOfItems.numberOfRows);
    });
  }


  updateRows (newPage) {  
    this.setState({numberOfRows: this.state.numberOfRows, page: newPage}, () => {
      this.getDatas(newPage, this.state.numberOfRows);
    });    
  }

  updatePerPages (num) {     
    this.setState({numberOfRows: num, page: 0}, () => {
      this.getDatas(0, this.state.numberOfRows);
    });
    
  }

  render() {
   
    const item = this.state;


    return (
      <div>
        <ContentHeader title="ตั้งค่าระบบ" small="ข้อมูลผู้ใช้งาน" />

        {
          this.state.isView === 'LOAD' ?
          'LOADING.....' : null
        }

        {
          this.state.isView === 'LIST' ?
            <UserList
              data={item.users}
              serchText={item.serchText}
              onSearch={this.onSearch.bind(this)}
              onClick={this.handleEdit.bind(this)}
              onNew={this.handleNewForm.bind(this)}
              total={item.total}
              rowsPerPage={item.rowsPerPage}
              page={item.page}
              numberOfRows={item.numberOfRows}
              updatePerPages={this.updatePerPages.bind(this)}
              updateRows={this.updateRows.bind(this)}
            /> :
          null
        }


        {
          this.state.isView === 'FORM' ?
            <UserForm
              empList={item.empList}
              onReset={this.reset.bind(this)}
              onSave={this.handleSaveData.bind(this)}
              onDelete={this.handleDelete.bind(this)}
              isEdit={this.state.isEdit}
              data={this.state.data} />          
            : null
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

  getEmployee(){
  	const _this = this;
    getEmployees('ALL','Y')
    .then(function(results) {
      console.log('EMP',results)
      if (results.data.status === '200') {
        _this.setState({empList: results.data.data});
      } else {
        _this.setState({empList: []});
      }
    });    	
  }

  getDatas (page, perpage) {
    let _this = this;
    page = page + 1;
    serchUsers(page, perpage, this.state.searchText)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({users: results.data.data, total: results.data.total, isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({users: [], total: 0, isView: 'LIST'});
      }
    });
  }

  saveData (data) {
    let _this = this;
    let con = 'Y'; let msg = '';
    if (data.emp_id !== '') {
    	if (data.username !== '') {
    	if (data.password !== '') {
       		con = 'Y';
      	} else { con = 'N'; msg = 'ไม่ได้กรอก Password'; }
      } else { con = 'N'; msg = 'ไม่ได้กรอก Username'; }
    } else { con = 'N'; msg = 'ไม่ได้เลือกแพทย์ / พนักงาน';  }
    if (con === 'Y') {

        createUser(data)
        .then(function(results) {
          if (results.data.status === '201') {
            show_err('success','บันทึกข้อมูลเรียบร้อย') 
            _this.getDatas(_this.state.page, _this.state.numberOfRows);
          } else if (results.data.status === '203') {
            show_err('warning',results.data.message) 
          }
        });

    } else {
      show_err('warning',msg)   
    }
  }

  updateData (data) {
    let _this = this;
    const delData = { uid: data.uid }
    deleteUser(delData)
    .then(function(results) {
      if (results.data.status === '201') {
	      createUser(data)
	      .then(function(results) {
	        if (results.data.status === '201') {
	          show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว') 
	          _this.getDatas(_this.state.page, _this.state.numberOfRows);
	        } else if (results.data.status === '203') {
	          show_err('warning',results.data.message) 
	        }
	      });       
      }
    });





  }

  deleteData (data) {
    let _this = this;
    deleteUser(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(_this.state.page, _this.state.numberOfRows);   
      }
    });
  }


}
