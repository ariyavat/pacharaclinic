import React, {Component} from 'react';

export default class ReciveList extends Component {
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

  handleEdit (data, e) {
    this.props.onEdit(data);
  }

  handleDelete (data, e) {
    this.props.onDelete(data);
  }

  render() {
    const _this = this;
    const {data, mode} = this.props;
    const rows = data.map((row, i) => {
      return (
        <tr key={i} className="alink" >
          <td onClick={this.handleEdit.bind(_this, row)} >{i + 1}</td>
          <td onClick={this.handleEdit.bind(_this, row)} >{row.product_id}</td>
          <td onClick={this.handleEdit.bind(_this, row)} >{row.product_name}</td>
          <td onClick={this.handleEdit.bind(_this, row)} >{row.qty}</td>    
          { mode === 'IN' ? <td onClick={this.handleEdit.bind(_this, row)} >{row.price}</td> : null }
          <td onClick={this.handleEdit.bind(_this, row)} >{row.unit}</td>  
          <td className="text-center">
            <a className="text-info dblock alink" onClick={this.handleDelete.bind(_this,row)} >
              <i className="fa fa-remove text-danger"></i>
            </a>
          </td>
        </tr>
      );
    });


    return (
      <table id="mytable" className="table table-bordered table-hover">
          <thead>
          <tr>
            <th width="50">#</th>
            <th width="150">รหัส</th>
            <th>รายการ</th>        
            <th>จำนวน</th>
            { mode === 'IN' ?  <th>ราคารวม</th> : null }  
            <th>หน่วย</th>                    
            <th width="80"></th>                 
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
      </table>
    );
  }
}


