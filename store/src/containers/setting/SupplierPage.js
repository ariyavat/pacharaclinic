import React from 'react';
import axios from 'axios';
import SupplierList from '../../components/setting/SupplierList';
import SupplierForm from '../../components/setting/SupplierForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getSuplier, getSupliers, serchSupliers, createSuplier, updateSuplier, deleteSuplier} from '../../utils/SupplierAPI';
import {getAutonumber, getAutonumberID, setAutonumber} from '../../utils/AutonumberAPI';



const initialState = {
  isView: 'LOAD', isEdit: false, data: [], suppliers: [], autonumber: 'N', adata: [], searchText: '',
  rowsPerPage: [20, 30, 50, 100], numberOfRows: 20, page: 0, total: null,
};


export default class SuplierPage extends React.Component {

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
  }

  handleNewForm (e) {
    let _this = this;
    const cn = 'ST'
    getAutonumber('SP',cn)
    .then(function(results) {
      if (results.data.status === '200') {
        let data = results.data.data;
        _this.setState({isView: 'FORM', isEdit: false, data: [], adata: data, autonumber: data.typ});
      } else {
        _this.setState({isView: 'FORM', isEdit: false,data: [], adata: [], autonumber: 'N'});
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
        name: data.name, taxno: data.taxno, address: data.address, tel: data.tel,
        fax: data.fax, status: data.status,
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

  DeleteResult (status) {
    if (status === 'YES') {
      let data = {id: this.state.data.id} ;
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
        <ContentHeader title="ตั้งค่าระบบ" small="ข้อมูลผู้ขาย / เจ้าหนี้" />

        {
          this.state.isView === 'LOAD' ?
          'LOADING.....' : null
        }

        {
          this.state.isView === 'LIST' ?
            <SupplierList
              data={item.suppliers}
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
            <SupplierForm
              onReset={this.reset.bind(this)}
              onSave={this.handleSaveData.bind(this)}
              onDelete={this.handleDelete.bind(this)}
              isEdit={this.state.isEdit}
              data={this.state.data}
              autonumber={this.state.autonumber}
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
  getDatas (page, perpage) {
    let _this = this;
    page = page + 1;
    serchSupliers('ALL', page, perpage, this.state.searchText)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({suppliers: results.data.data, total: results.data.total, isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({suppliers: [], total: 0, isView: 'LIST'});
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
      createSuplier(data)
      .then(function(results) {
        if (results.data.status === '201') {
          show_err('success','บันทึกข้อมูลเรียบร้อย') 
          _this.getDatas(_this.state.page, _this.state.numberOfRows);
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
    updateSuplier(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas(_this.state.page, _this.state.numberOfRows);
      }
    });
  }

  deleteData (data) {
    let _this = this;
    deleteSuplier(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(_this.state.page, _this.state.numberOfRows);   
      }
    });
  }


}
