import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ContentHeader from '../../components/common/ContentHeader';

import {getCustomerDOB} from '../../utils/CustomerAPI';
import * as config from '../../config';
const cmn = moment().format('M')

const initialState = {
  loading: false, isViews: false, tempList: [], mn: cmn
 
};


export default class DobPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    //
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() { 
    let mn = moment().format('M')    
    this.setState({ mn: mn, loading: true, },()=>{  this.getDatas(mn);  })  
  }

  handleEmpChange (e) {
    e.preventDefault();
    let mn = this.refs.mn.value   
    this.setState({mn: mn, loading: true,},()=>{
       this.getDatas(mn);
    })  
  }





  render() {
    const item = this.state;
  

    return (
      <div>
        <ContentHeader title="ประชาสัมพันธ์" small="รายชื่อลูกค้าตามเดือนเกิด" />
        <section className="content non-printable">
        <div className="box box-info min-600" >
          <div className="box-header with-border" >
            <div className="col-sm-8">
              <div className="row">
                  <div className="col-sm-4">
                        <select className="form-control" id="mn"  ref="mn" value={item.mn} onChange={this.handleEmpChange.bind(this)}> 
                            <option value="01">ม.ค.</option>                        
                            <option value="02">ก.พ.</option> 
                            <option value="03">มี.ค.</option> 
                            <option value="04">เม.ษ.</option> 
                            <option value="05">พ.ค.</option> 
                            <option value="06">มิ.ย.</option> 
                            <option value="07">ก.ค.</option> 
                            <option value="08">ส.ค.</option> 
                            <option value="09">ก.ย.</option> 
                            <option value="10">ต.ค.</option> 
                            <option value="11">พ.ย.</option> 
                            <option value="12">ธ.ค.</option> 
                        </select> 

                  </div>                   
      
                              
              </div>
            </div>
            {
              item.tempList.length > 0  ?
                    <div className="col-sm-4">
                            <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="btn btn-fault pull-right"
                      table="mytable"
                      filename="rep_payments"
                      sheet="tablexls"
                      buttonText="Download as XLS"
                    />            
              </div>
              : null
            }
          
          </div>
          <div id="rep" className="box-body">   
          
            <ReportList List={item.tempList}/>
                    
            
          </div>

          {
          this.state.loading ?
            <div className="overlay">
                      <i className="fa fa-refresh fa-spin"></i>
                  </div>
          : null
          }


            </div>
        </section> 
      </div>
    );
  }
  //

  getDatas (mn) { 
    let _this = this;
    getCustomerDOB(mn)
    .then(function(results) {      
      if (results.data.status === '200') {
        let data = results.data.data 
        _this.setState({ tempList: data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: [], loading: false });
      }
    });
  }

}



function ReportList (props) {
  const _this = this
  const { List } = props; 
  const list =  List.map((data,i) =>{    
    return(
        <tr key={i}  > 
          <td>{i+1}</td>
          <td>{data.id}</td>  
          <td>{data.fullname}</td>
          <td>{data.dob}</td> 
          <td>{data.tel}</td> 
          <td>{data.email}</td>   
        </tr>
    )
  });




  return(
  <div className="row">
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-12">
          <table id="mytable" className="table table-bordered table-hover">
              <thead>
              <tr>
                <th width="40">#</th> 
                <th width="100">HN</th>                
                <th>ชื่อ - สกุล</th>              
                <th width="150">วันเกิด</th>           
                <th >เบอร์โทร</th>   
                <th >Email</th> 
              </tr>
              </thead>
              <tbody>
              {list}      
              </tbody>

          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">


        </div>
      </div>
    </div>
  </div>

  )
}

