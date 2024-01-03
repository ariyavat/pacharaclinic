import React, {Component} from 'react';

export default class PickupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], searchTerm: '',
    };
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

  handleEdit (data) {     
    if(data.status === 'N'){
      this.props.onEdit(data);
    }
   
  }

  handleDelete (data) {
    this.props.onDelete(data);
  }

  render() {
    const _this = this;
    const {data, mode} = this.props;
    const rows = data.map((row, i) => {
      return (
        <tr key={i} >
          <td >{i + 1}</td>          
          <td className="alink" onClick={this.handleEdit.bind(this, row)} >{row.product_id} bbb</td>
          <td className="alink" onClick={this.handleEdit.bind(this, row)} >{row.product_name}</td>
          <td className="alink" onClick={this.handleEdit.bind(this, row)} >{row.qty}</td>  
          <td className="alink" onClick={this.handleEdit.bind(this, row)} >{row.unit} </td>  
          <td >
          {row.status==='N'? <span className="text-info">รอโอน</span>  : null} 
          {row.status==='X'? <span className="text-red">ยกเลิกการโอน</span>  : null} 
          </td>  
          {
            mode === 'WAIT'?
            <td className="text-center ">
             <a className="alink text-danger" onClick={this.handleDelete.bind(this,row)} > ยกเลิก</a>
            </td> 
            : null
          }
        </tr>
      );
    });


    return (
      <table id="mytable" className="table table-bordered table-hover">
          <thead>
          <tr>
            <th width="50">#</th>    
            <th width="140">รหัส</th>
            <th>รายการ</th>        
            <th width="90">จำนวน</th>          
            <th width="100">หน่วย</th>   
            <th width="100">สถานะ</th>  
            {
              mode === 'WAIT' ?
              <th width="100"></th>  
              : null
            }                
                 
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
      </table>
    );
  }
}


