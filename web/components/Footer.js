import React from 'react' 
import { getContacts } from '../utils/ContactAPI'
export default class Footer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }  
   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentDidMount () {
    const _this = this
    getContacts()
    .then(function(response) {   
           
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
        } 

        _this.setState({ data: List }) 
    }) 
  }
  render () {
    const item = this.state
    const rows = item.data.map((row, i) => {
      let tel = row.tel.split(",");
      
      const tlist = tel.map((val, j) => {
        return(
        <span key={j} className="mgl-10 mgt-20">{val} <br/></span>
        )
      })

      return (  
      <div key={i} className="col-md-4 mgt-30 ft-20">
        <span >{row.name}</span>
        <div className="mgt-10">
        { tlist }
        </div>
      </div>
      )
    })



    return(
    <footer id="footer">
      <div className="footer-head">

          <div className="row">
            <div className="col-md-4 text-left"> 
              <div className="row">
                <div className="col-md-5">
                  <img className="img-responsive" src="../static/img/line01.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mgt-10">
                <h5 className="font-01">FOLLOW@PACHARACLINIC</h5>
                </div>
              </div>

               
              <div className="social-links mgt-10">
                <a href="#"  className="twitter"><i className="fa fa-twitter"></i></a>
                <a href="https://www.facebook.com/Pacharaclinic" target="_blank" className="facebook"><i className="fa fa-facebook"></i></a>
                <a href="https://www.instagram.com/Pacharaclinic/" target="_blank" className="instagram"><i className="fa fa-instagram"></i></a>
              </div>
            </div>
          
            <div className="col-md-8 text-left ft-20"> 

              <div className="row">
                <div className="col-md-12 ">
                  <h4 className="font-01">PACHARA CLINIC <br/></h4>
                  เปิดให้บริการตั้งทุกวันตั้งแต่เวลา 11.00 - 20.00
                </div>
              </div>
              <div className="row">
                {rows}
              </div>

              
            </div>
          </div>



      </div>
      <div className="footer-top xs-hideen">
            <div className="copyright">
              &copy; Pacharaclinic.com. All Rights Reserved
            </div> 
      </div>
    </footer>
    )
  }
}