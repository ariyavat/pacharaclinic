import React from 'react';
import GerneralList from '../../components/setting/GerneralList';
import GerneralForm from '../../components/setting/GerneralForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getGeneral, getGenerals, createGeneral, updateGeneral, deleteGeneral} from '../../utils/GeneralAPI';

const initialState = {
  isView: 'LIST', isEdit: false, data: [], generals: [], typ: '', ftitle: '', mode: 'A',
};


export default class GerneralPage extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [
      {id: 'PT', name: 'ตำแหน่งงาน', mode: 'A'},
      {id: 'SLO', name: 'รายได้อื่นๆ', mode: 'A'},
      {id: 'ED', name: 'รายการหักเงิน', mode: 'A'},
    ];
    this.state = initialState;
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.state !== nextState);
  }

  componentDidMount() {
    this.setState({typ: this.menu[0].id, ftitle: this.menu[0].name}, () => {
      this.getDatas(this.menu[0].id);
    });
  }

  reset (e) {
    e.preventDefault();
    this.setState({isView: 'LIST', isEdit: false, data: [], open: false});
  }

  handleMenuClick (data, e) {
    this.setState({typ: data.id, ftitle: data.name,  mode: data.mode, open: false}, () => {
      this.getDatas(data.id);
    });
  }


  handleEdit (data) {
    this.setState({isView: 'FORM', isEdit: true, data: data, open: false});
  }

  handleSaveData (data) {
    if (this.state.isEdit === true) {
      const temp = {
        name: data.name, val1: data.val1, val2: data.val2, val3: data.val3, val4: data.val4, val5: data.val5,
      };
      const newData = {data: temp, con: {id: data.id, typ: data.typ}}  ;
      this.updateData(newData);
    } else {
      this.saveData(data);
    }
  }

  handleDelete () {
    this.setState({isView: 'DELETE'});
  }

  DeleteResult (status) {
    if (status === 'YES') {
      let data = {id: this.state.data.id, typ: this.state.data.typ} ;
      this.deleteData(data);
    } else {
      this.setState({isView: 'FORM'});
    }
  }


  render() {

    const item = this.state;

    return (
      <div>
        <ContentHeader title="ตั้งค่าระบบ" small="ข้อมูลเสริม" />
        <section className="content"> 

          <div className="row">
            <div className="col-sm-3">
              <GeneralTyp gType={this.menu} onShowForm={this.handleMenuClick.bind(this)}  />

            </div>
            <div className="col-sm-9">   
                {
                  this.state.isLoad ?
                  <h2>Loading...</h2>
                  :
                  <div className="row">
                    <div className="col-sm-12">

                    {
                      this.state.isView === 'LIST' ?
                        <GerneralList
                          title={this.state.ftitle}
                          data={this.state.generals}
                          mode={this.state.mode}
                          onClick={this.handleEdit.bind(this)}
                          onNew={(e) => this.setState({isView: 'FORM'})}
                        /> :
                      null
                    }

                    {
                      this.state.isView === 'FORM' ?
                        <GerneralForm
                          typ={this.state.typ}
                          mode={this.state.mode}
                          title={this.state.ftitle}
                          onReset={this.reset.bind(this)}
                          onSave={this.handleSaveData.bind(this)}
                          onDelete={this.handleDelete.bind(this)}
                          isEdit={this.state.isEdit}
                          data={this.state.data}
                        /> :
                      null
                    }

                    {
                      this.state.isView === 'DELETE' ?
                        <ConfirmBox
                          onSave={this.DeleteResult.bind(this)}
                        />          : null
                    }

                    </div>
                  </div>
                }               

            </div>
          </div>


        </section>


      </div>
    );
  }


  getDatas (typ) {
    let _this = this;
    getGenerals(typ)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({generals: results.data.data, isEdit: false, data: [], isView: 'LIST'});      
      } else if (results.data.status === '204') {
        _this.setState({isView: 'LIST', generals: [], isEdit: false, data: [],});
      }
    });
  }


  saveData (data) {
    let _this = this;
    let con = 'Y'; let msg = '';

    if (data.name !== '') {
      con = 'Y';
    } else {
      con = 'N'; msg = 'ไม่ได้กรอกชื่อ';
    }

    if (con === 'Y') {
      createGeneral(data)
      .then(function(results) {
        if (results.data.status === '201') {
          show_err('success','บันทึกข้อมูลเรียบร้อย') 
          _this.getDatas(_this.state.typ);
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
    updateGeneral(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas(_this.state.typ);
      }
    });
  }

  deleteData (data) {
    let _this = this;
    deleteGeneral(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(_this.state.typ); 
      }
    });
  }
}



function GeneralTyp (props) {
  const list =  props.gType.map((data,i) =>
        <li key={i} onClick={props.onShowForm.bind(this,data)}><a href="javascript: ;" ><i className="fa fa-circle-o text-light-blue"></i> {data.name}</a></li>
  ) 
  return(
    <div className="box box-solid min-600">
        <div className="box-header with-border">
          <h3 className="box-title">ประเภท</h3>

          <div className="box-tools">
            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="box-body no-padding ">
          <ul className="nav nav-pills nav-stacked">
            {list}
          </ul>
        </div>
        
    </div>
  )
}