import React, {Component} from 'react';

export default class ConfirmBox extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '', text: '' }
  }

  componentDidMount(){
    if(this.props.mode === 'DELETE'){
      this.setState({ title: 'ยืนยันการลบข้อมูล !', text: 'คุณต้องการที่จะลบรายการนี้'  })
    }
    if(this.props.mode === 'CANCEL'){
      this.setState({ title: 'ยืนยันการยกเลิกข้อมูล !', text: 'คุณต้องการที่จะยกเลิกรายการนี้'  })
    }
  }

  handleSaveData(status, e){
    e.preventDefault();
    this.props.onSave(status);
  }

  render() {
    return (
      <section className="content">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 mgt-100">
            <div className="box box-warning" >        
              <div className="box-body min-100">
                  <div className="row">
                    <div className="col-sm-12">
                        <br/>
                        <h2>{this.state.text}</h2>
                        <br/>
                    </div>
                  </div>
                  <hr/>            
                  <div className="row">
                    <div className="col-sm-12">
                        <button type="button" className="btn btn-primary pull-right" onClick={this.handleSaveData.bind(this, 'YES')} >
                          <i className="fa fa-check"></i> ตกลง
                        </button>    

                        <button type="button" className="btn btn-default mgr-10 pull-right" onClick={this.handleSaveData.bind(this, 'NO')} >
                          <i className="fa fa-remove"></i> ยกเลิก
                        </button>    
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>




      </section>

    );
  }
}

