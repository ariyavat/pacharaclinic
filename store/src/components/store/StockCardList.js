import React, {Component} from 'react';
import moment from 'moment';
export default class StockCardList extends Component {
  constructor(props) {
    super(props);
 
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    //this.setState({data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    //this.setState({data: nextProps.data});
  }



  render() {
    const {List} = this.props;
    const rows = List.map((data, i) => {
		let iqty = '-';
		let pqty = '-';
		if(data.typ === 'I'){
			iqty = data.qty;
		} else {
			pqty = data.qty;
		}
      	return (
	        <tr key={i} >
	          <td>{i + 1}</td>
	          <td>{ moment(data.dat).format('DD/MM/YYYY') }</td>
	          <td>{data.ino}<br/><small>Lot no. {data.rno}</small></td>
	          <td>{iqty}</td>  
	          <td>{pqty}</td>
	          <td>{data.total}</td>  
	          <td>{data.note}</td>   
	        </tr>	
      	);
    });


    return (
      <table id="mytable" className="table table-bordered table-hover">
          <thead>
          <tr>
            <th width="50">#</th>
            <th>วันที่</th>
            <th>เลขที่</th> 
            <th>จำนวนรับ</th>                    
            <th>จำนวนจ่าย</th>
            <th>คงเหลือ</th> 
            <th width="200">หมายเหตุ</th>               
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
      </table>
    );
  }
}


