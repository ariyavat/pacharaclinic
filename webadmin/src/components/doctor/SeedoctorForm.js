import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { stateToHTML } from "draft-js-export-html"
import {Editor, EditorState} from 'draft-js';
import OrderStatus from '../common/OrderStatus';
export default class SeedoctorForm extends Component {

  constructor(props) {
    super(props);
    this.state = {  data : null, list: [], editorState: EditorState.createEmpty() }
    this.onChange = editorState => this.setState({editorState})
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {

   this.setState({data: this.props.data, list: this.props.list});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data, list: nextProps.list});
  }

  handleSaveData(){
    const item = this.state
    let mem = stateToHTML(this.state.editorState.getCurrentContent());
    let aid = Math.random().toString(36).substring(7)+moment().format('DDMMYYYYHmmss')
    if(mem !== ''){
      let temp = {
        id: item.data.id,
        uid: item.data.uid,
        aid: aid,
        mem: mem,
        ename: '',
        dat: moment().format('YYYY-MM-DD H:m:ss'),
      }
      this.props.onSave(temp)

    } 
  }

  render() {
    const { contentState } = this.state;
    const item = this.state
    
    const rows = item.list.map((row, i) => {
      return (
        <div key={i}>
          <div className="row">
            <div className="col-sm-12">            
            <small className="pull-right">{moment(row.dat).format('DD/MM/YYYY HH:mm')}</small>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
            <p>
            {renderHTML(row.mem)}
            </p>
            </div>
          </div>
          <hr/>
        </div>
      );
    });


  	return (
    <section className="content">
      <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="box box-info min-650" >  
              <div className="box-header with-border cbg-gray" >
                <h3>{ item.data !== null ? item.data.title : null }</h3>
                <small className="pull-left">{ item.data !== null ? item.data.cname : null}</small>   
                <small className="pull-right">{ item.data !== null ? moment(item.data.dat).format('DD/MM/YYYY HH:mm') : null }</small>        
              </div>
              <div className="box-body min-400"> 
                <div className="row">
                    <div className="col-sm-12">
                      { item.data !== null ?  renderHTML(item.data.mem) : null}   
                      <hr/>                 
                    </div>
                </div>
                {
                  item.list.length === 0 ?
                  <div className="row">
                      <div className="col-sm-12 mgt-20 text-center">
                        <h2 className="text-red">ยังไม่มีคำตอบ</h2>                
                      </div>
                  </div>    
                  : 
                  <div className="row">
                      <div className="col-sm-12">
                       <p>
                       {rows} 
                       </p>              
                      </div>
                  </div>                   
                }



              </div>
            </div>           
   
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="box box-info min-650" >
              <div className="box-header with-border cbg-gray" >
                <h3>ตอบคำถาม</h3>
                <small>.</small>
              </div>
              <div className="box-body min-400">
              <form role="form">  
                <div className="row">
                  <div className="col-sm-12">
                    <Editor ref="anser" editorState={this.state.editorState} onChange={this.onChange} />
                    <hr/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                      <button type="button" className="btn btn-lg btn-block btn-success " onClick={this.handleSaveData.bind(this)} >
                        <i className="fa fa-save"></i> บันทึกคำตอบ
                      </button>                  
                  </div>
                </div>



              </form>
              </div>
            </div>
          </div>  
      </div>
    </section>   
  	);
  }

}

