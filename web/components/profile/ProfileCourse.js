import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import { getMsPctrecs } from '../../utils/CustomerAPI'


export default class ProfileCourse extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false,
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
       this.getData()      
  } 
  componentDidMount () {   
    this.getData() 
  }


  handleSubmit(e){
  	e.preventDefault()

  }


  render () {
    const item = this.state
    console.log(item.data)
    let n = 0; 
    const rows = item.data.map((row, i) => {
        let day_limit = '';
        let qty_limit = '';
        if(row.day_mode === 'Y'){  
          day_limit = parseFloat(row.day_limit) - parseFloat(row.exp_dat);
        }





        if((row.status === 'WAIT') && (parseFloat(row.total) > 0)){
        n = n + 1;
        let cls = "col-md-12 mgt-10  border-bottom "
        if(n === 1){ cls = cls + " border-top " }
        return (
        <div className="row" key={i} >   
          <div className={cls}>
            <div className="row">   
              <div className="col-12">
                <small> <i className="fa fa-calendar" /> { moment(row.dat).format('DD/MM/YYYY') } </small>
              </div> 
            </div>  
            <div className="row">   
              <div className="col-12">
              {row.name}     
              <small className="pull-right">
                {
                  row.day_mode === 'Y' ?
                     <span>อีก  {day_limit }  วันหมดอายุ</span>
                  : null
                }
              </small>         
              </div> 
            </div>  
            <div className="row">   
              <div className="col-6">
               จำนวน {row.qty} {row.unit}&nbsp;&nbsp;       
              </div> 
              <div className="col-6 text-right">
                { row.mode === 'T' ? <span className="pull-right">คงเหลือ   {row.total}  {row.unit}</span>  : null }
                { 
                  row.mode === 'P' || row.qty_mode === 'Y'  ? 
                  <span className="pull-right">คงเหลือ : {row.total} </span>  
                  : null               
                } 
                
              </div>
            </div>  


         
          </div> 
        </div>     
        )
      }
    });




  	return(
  	<div>
        <div className="row">   
          <div className="col-md-12">
            <h4 className="txt-gn">Course คงเหลือ</h4>
          </div> 
        </div>  

        {rows}    

  		<br/>
  	</div>
  	)   
  }
  //

  getData(){
    const _this = this
    let data = JSON.parse(localStorage.getItem('ms_profile'));  
    if(data !== null){     
      this.setState({ loading: true },()=>{
          getMsPctrecs(data.id,'ALL')
          .then(function(response) {          
              if(response.data.status === '200'){
                let  cdata =  response.data.data 
             
                _this.setState({ data: cdata, loading: false })         
              } 
          })  
      })  
    } else {
        Router.push({
            pathname: '/profile',
            query: { login: 'wahsffd' }
        })
    }  
  }








}