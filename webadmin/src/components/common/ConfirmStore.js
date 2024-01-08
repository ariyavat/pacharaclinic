import React, {Component} from 'react';

export default class ConfirmStore extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '', text: '' }
  }

  componentDidMount(){
    if(this.props.mode === 'IN'){
      this.setState({ title: 'ยืนยันการรับเข้าคลัง !', text: 'บันทึกการรับเข้าคลังเรียบร้อยแล้ว'  })
    }
    if(this.props.mode === 'OUT'){
      this.setState({ title: 'ยืนยันการจ่ายออกจากคลัง !', text: 'บันทึกการจ่ายออกจากคลังเรียบร้อย'  })
    }
    if(this.props.mode === 'ADJ'){
      this.setState({ title: 'ยืนยันการปรับสต็อค !', text: 'บันทึกการปรับสต็อคเรียบร้อย'  })
    }

  }

  handlePrint(e){
    e.preventDefault();
    this.props.onPrint();
  }

  render() {
  	const item = this.state;
  	const { onReset } = this.props;
    return (
      <section className="content non-printable">
        <div className="box box-warning" > 
          <div className="box-header with-border" >
       		<h3 className="modal-title text-blue"> {item.title} </h3>
         
          </div>   
          <div className="box-body min-100">
              <div className="row">
                <div className="col-sm-12 text-center">
                    <br/>
                    <h1 className="text-success">{this.state.text}</h1>
                    <br/>
                </div>
              </div>
              <hr/>            
              <div className="row">
                <div className="col-sm-12">
                    <button type="button" className="btn btn-primary pull-right" onClick={this.handlePrint.bind(this)}  >
                      <i className="fa fa-print"></i> พิมพ์เอกสาร
                    </button>    

                    <button type="button" className="btn btn-default mgr-10 pull-right" onClick={onReset} >
                      <i className="fa fa-remove"></i> ยกเลิก
                    </button>    
                </div>
              </div>
          </div>
        </div>
      </section>

    );
  }
}

