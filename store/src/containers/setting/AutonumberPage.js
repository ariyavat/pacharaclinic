import React from 'react';
import ContentHeader from '../../components/common/ContentHeader';
import AutonumberForm from '../../components/setting/AutonumberForm';
import {getAutonumber, createAutonumber, updateAutonumber, getAutonumberID, setAutonumber} from '../../utils/AutonumberAPI';
import {getLocations} from '../../utils/CompanyAPI';



const initialState = {
  ftitle: 'รหัสลูกค้า', isEdit: false, id: '', data: [], lastID: '', mode: 'S', loactionList: [], cn: 'ST',
};


export default class AutonumberPage extends React.Component {
  constructor(props) {
    super(props);

    this.menu = [   
      //{id: 'PT', name: 'รหัสลูกค้า'},
      //{id: 'PD', name: 'รหัสยาและเวชภัณฑ์'},
      {id: 'SP', name: 'รหัสผู้ขาย / เจ้าหนี้'},
      //{id: 'DT', name: 'รหัสแพทย์'},
      //{id: 'EP', name: 'รหัสพนักงาน'},   
      {id: 'PO', name: 'ใบสั่งซื้อสินค้า'},
      //{id: 'OR', name: 'รายการขายสินค้า'},
      //{id: 'INV', name: 'ใบเสร็จรับเงิน/ใบกำกับภาษี'},
      {id: 'IN', name: 'รับวัตถุดิบเข้าคลัง'},
      {id: 'OUT', name: 'จ่ายวัตถุดิบออกจากคลัง'},
      {id: 'ADJ', name: 'ปรับสต๊อควัตถุดิบ'},
      {id: 'TN', name: 'โอนสินค้า'},

      //{id: 'PIN', name: 'รับสินค้าเข้าคลัง'},
      //{id: 'POUT', name: 'จ่ายสินค้าออกจากคลัง'},
      //{id: 'PADJ', name: 'ปรับสต๊อคสินค้า'},

    ];




    this.state = initialState;
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  reset (e) {
    e.preventDefault();
    this.setState(initialState);
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.state !== nextState);
  }
  componentDidMount() {

      this.setState({ id: this.menu[0].id, cn:'ST', ftitle: this.menu[0].name},()=>{
        this.getDatas(this.menu[0].id, 'ST'); 
      });
  }

  handleGetData(cn){
    this.setState({ cn: 'ST' },()=>{
      this.getDatas(this.state.id,'ST'); 
    })
    
  }

  handleGetLastID () {
    let data = getAutonumberID(this.state.data);
    this.setState({lastID: data.lastID}, () => {
      
      setAutonumber(data.id, data.maxID)
      .then(function(results) {
        console.log(results);
      });
      
    });
  }

  handleMenuClick (data, e) {
    this.setState({id: data.id, cn: 'ST', ftitle: data.name, open: false, lastID: ''}, () => {
      this.getDatas(data.id,'ST');
    });
  }

  handleSaveData (data) {
    if (this.state.isEdit === true) {
      const temp = {
        aformat: data.aformat, lnum: data.lnum, typ: data.typ, mode: data.mode, lastM: data.lastM
      };
      const newData = {data: temp, id: data.id, cn: data.cn};
      this.updateData(newData);
    } else {
      this.saveData(data);
    }

  }


  render() {   
    const item = this.state;
    return (
      <div>
        <ContentHeader title="ตั้งค่าระบบ" small="เลขเอกสารอัตโนมัติ" />
        <section className="content"> 
          <div className="row">
            <div className="col-sm-3">
              <AutonumberTyp aType={this.menu}  onShowForm={this.handleMenuClick.bind(this)}   />

            </div>
            <div className="col-sm-9">

              <div className="box box-info" >  
                <div className="box-header with-border" >               
                  <h3 className="box-title">{this.state.ftitle}</h3>                           
                </div>
                <div className="box-body min-350"> 
                  
                  <div className="row">
                    <div className="col-sm-12">
                      <AutonumberForm
                        id={this.state.id}
                        title={this.state.ftitle}
                        lastID={this.state.lastID}
                        loactionList={this.state.loactionList}
                        data={this.state.data}
                        isEdit={this.state.isEdit}
                        onSave={this.handleSaveData.bind(this)}
                        onShow={this.handleGetData.bind(this)}
                        onGetID={this.handleGetLastID.bind(this)}
                        data={this.state.data}/>


                
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12"> 
                      <h4>คำแนะนำ</h4>
                      <blockquote>
                      <p>เลขเอกสารอัตโนมัติ คือการที่ให้ระบบสร้างรหัสให้อัตโนมัติ </p><br />
                      <small><b className="text-info">อักษรนำ คือ</b> การกำหนดตัวอักษรนำหน้าตัวเลข</small><br />
                      <small><cite title="Source Title">*B : </cite> แสดงชื่อย่อของสาขา</small><br />
                      <small><cite title="Source Title">*Y : </cite> แสดงปี ค.ศ. เช่น ปี 2017 ระบบแสดง 17</small><br />
                      <small><cite title="Source Title">*E : </cite>  แสดงปี พ.ศ. เช่น ปี 2560 ระบบแสดง 60 </small><br />
                      <small><cite title="Source Title">*M : </cite> แสดงเดือน เช่น มกราคม ระบบแสดง 01</small><br />
                      <small><cite title="Source Title">*D : </cite> แสดงวันที่ เช่น วันที่ 30 ระบบแสดง 30</small><br />
                      <small><cite title="Source Title">ตัวอักษรอื่นหรือตัวเลข : </cite> แสดงตัวอักษรนั้น</small><br />
                      <small><cite title="Source Title">ตัวอย่าง </cite> BILL-*Y*M-  ระบบแสดง <span className="text-danger">BILL-1701-</span></small><br />
                      <small><b className="text-info">จำนวนหลัก คือ</b> จำนวนตัวเลขที่แสดง เช่น กำหนด 6 ระบบจะแสดง <span className="text-danger">000001</span></small><br />
                      <small><b className="text-info">เลขที่ล่าสุด คือ</b> ตัวเลขล่าสุดที่ระบบคำนวณได้</small><br /> 
                      </blockquote>
                    </div>  
                  </div>
                
                </div>  
              </div>  

            </div>
          </div>
        </section>

      </div>
    );
  }
  //
  getDatas (id,cn) {
    let _this = this;
    getAutonumber(id,cn)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({data: results.data.data, isEdit: true});
      } else {
        const idx = _this.menu.findIndex((x) => x.id === id);
        const data = {
          id: id, cn: cn, name: _this.menu[idx].name, aformat: '',  lnum: '', lastID: 0, typ: 'Y', lastM: '', mode:'A'          
        }
        _this.setState({data: data, isEdit: false});
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
      createAutonumber(data)
      .then(function(results) {
        if (results.data.status === '201') {
          show_err('success','บันทึกข้อมูลเรียบร้อย') 
          _this.getDatas(data.id,data.cn);
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
    updateAutonumber(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
        _this.getDatas(data.id,data.cn);       
      }
    });
  }


}


function AutonumberTyp (props) {

  const list =  props.aType.map((data,i) =>
        <li key={i} onClick={props.onShowForm.bind(this,data)}><a href="javascript: ;" ><i className="fa fa-circle-o text-light-blue"></i> {data.name}</a></li>
  ) 

  return(
    <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">ประเภท</h3>

          <div className="box-tools">
            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="box-body no-padding min-350">
          <ul className="nav nav-pills nav-stacked">
            {list}
          </ul>
        </div>
        
    </div>
  )
}