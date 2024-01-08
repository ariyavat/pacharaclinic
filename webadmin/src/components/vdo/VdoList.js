import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import Pager from 'react-pager';
import { Player } from 'video-react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'



import * as config from '../../config';
const imgURL = `${config.init.url}images/vdo/`;

export default class VdoList extends Component {
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
    this.props.onDelete(data);
  }


  render() {
    const _this = this;

    const { auth,group_id } = this.state;
    const {data, onDelete} = this.props;

    
    const rows = data.map((row, i) => {
      let img = imgURL+row.name
      return (
        <div className="col-sm-3" key={i} > 
            <div className="row">
                <div className="col-sm-12 alink">
		            <a className="text-danger dblock pull-right alink" onClick={this.handleEdit.bind(_this,row)} >
		              <i className="fa fa-remove"></i> ลบ
		            </a>
                </div>
            </div>
          {
           row.typ === 'Y' ?
            <Player
              playsInline             
              src={img}
            />
           : 
            <img  className="img-responsive img-thumbnail" src={img} /> 
          }
            <div className="row">
                <div className="col-sm-12 mgt-10"><h4>{row.title}</h4></div>
            </div>
            <div className="row">
                <div className="col-sm-12 mgt-10">{row.detail}</div>
            </div>
         
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
                          <input type="text" 
                            className="form-control" autoComplete="off"
                            name="enter" 
                            value={this.state.searchTerm}                           
                            onChange={(e) => this.setState({searchTerm: e.target.value})}                               
                            />
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


