import React, {Component} from 'react';

import Pager from 'react-pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import * as config from '../../config';
const imgURL = `${config.init.web_url}images/reviews/`;

export default class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', auth: [], group_id: 'ALL'

    };
  }
  componentWillMount(){
    //const auth = JSON.parse(localStorage.getItem('msClinic')).auth; 
    //this.setState({auth: auth});
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

  handleDGchange (e) {
    e.preventDefault()
    let idx = this.props.gList.findIndex((x) => x.id === this.refs.dg.value);
    this.setState({group_id: this.refs.dg.value},()=>{
      this.props.onSearch(this.refs.dg.value,'');
    });
  }

  handleNew () {
  	this.props.onNew();
  }

  handleEdit (data, e) {
    this.props.onEdit(data);
  }


  render() {
    const _this = this;

    const { auth,group_id } = this.state;
    const {data} = this.props;

    
    const rows = data.map((row, i) => {
      let img = imgURL+row.img
      return (
        <div className="col-sm-3 alink " key={i} onClick={this.handleEdit.bind(_this,row)} > 
          <strong>{row.title}</strong><br/>
          <img  className="img-responsive img-thumbnail" src={img} /> <br/>
          <small className="pull-right">{row.dat}</small><br/>
        </div> 
      );
    });


    return (

      <section className="content">
        <div className="box box-info min-550" >  
          <div className="box-header with-border" >
            <div className="col-sm-9">
              <form role="form">  
                <div className="row">
             
                  <div className="col-sm-5">
                      <div className="form-group">                         
                
                      </div>
                  </div>  
             
                </div>
              </form>
            </div>
            <div className="col-sm-3 ">
       
              <button className="btn btn-flat btn-default pull-right" onClick={this.handleNew.bind(this)} >
                <i className="fa fa-plus"></i> เพิ่มรายการใหม่
              </button>
      

            </div>          
          </div>
          <div className="box-body">    
            <div className="row">
              {rows}

            </div>
          </div>  


        </div>
      </section>
    );
  }
}


