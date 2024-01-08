import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import TreatmentBox from './TreatmentBox' 
import TreatmentDetail from './TreatmentDetail' 
import ShopList from '../cart/ShopList'  
import { getPgroups, getProducts,getProduct, getProductWebs } from '../../utils/ProductAPI'
export default class Treatment extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef()
    this.state = {
      data: [], loading: false, lData: [],
      mode: '1', typ:'T', product:{img:'no',product_name:'oooo'}, vgroup : false,  timers: '',
      menuT:[ 
        {mode: '1', gname: 'รักษาสิว'}, 
        {mode: '2', gname: 'ผิวกระจ่างใส'},
        {mode: '3', gname: 'รักษาฝ้า'}, 
        {mode: '4', gname: 'ทำความสะอาดผิว'},
        {mode: '5', gname: 'ยกกระชับ'},
        {mode: '6', gname: 'คุณแม่หลังคลอด'},
      ],
      menuL:[
        {mode: '1', gname: 'เลเซอร์'}, 
        {mode: '2', gname: 'ฉีดผิว'},
      ],

    }  

    this.handleMenuSelect = this.handleMenuSelect.bind(this)
   
  }

  shouldComponentUpdate(_nextProps, nextState) {    
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
    this.setState({ mode: nextProps.cat_id , typ: nextProps.type,},()=>{
      if(nextProps.isView){
        this.getDetail(nextProps.code)
      }  
    })  
  }

  componentDidMount () {  


    let _this = this; 

    console.log('asdasd',this.props)

    getPgroups('T')
    .then(function(results) {  
      let list = []
      if (results.data.status === '200') {
        list = results.data.data
      }       
      _this.setState({ loading: true, mode: _this.props.cat_id, typ: _this.props.type, menuT: list },()=>{
        _this.getDatas();  
       // _this.getDetail(_this.props.code)       
      })   

    });

    getPgroups('L')
    .then(function(results) {  
      let list = []
      if (results.data.status === '200') {
        list = results.data.data
      } 
      _this.setState({  menuL: list })   

    });

    
    
    /*
    this.setState({ loading: true, mode: this.props.cat_id, typ: this.props.type  },()=>{
      this.getDatas();  
      this.getDetail(this.props.code)       
    }) 
    */     
    
  }

  handleMenuSelect(i,typ,e){
    e.preventDefault()
    let mode = ''
      if(typ==='T'){
        mode = this.state.menuT[i].gid 
      } else {
        mode = this.state.menuL[i].gid 
      }

    this.setState({ mode: mode, typ: typ, vgroup: false},()=>{
    	let gname = ''
    	if(typ==='T'){
    		gname = this.state.menuT[i].gname 
    	} else {
    		gname = this.state.menuL[i].gname 
    	}


      	Router.push({
          pathname: '/cosmetics',
          query: { cat_id: mode, type: typ, category: gname}
      	})      
    })

  }

  handleViewGroup(){
    let view = !this.state.vgroup;
    this.setState({ vgroup: view })
  }

  onUpdate(){
    this.setState({timers: moment().format('YYYYMMDDHHmmss') })
  }

  render () {
      const item = this.state  
      const { isView, code  } = this.props

      let mList = item.data
      if(item.typ === 'L'){
      	mList = item.lData
      }

      console.log('mode',item.mode)
      const rows = mList.map((row, i) => {
        
        if(row.mode === item.mode){
          console.log(row.mode,item.mode)
          return (  
            <TreatmentBox data={row} key={i} mode="W"  type={item.typ} />
          )      
        }
      })
     
      const mrows = item.menuT.map((row, i) => {
        let cls = ''
        let active = ''
        if(row.gid === item.mode && item.typ==='T'){ 
          cls = 'txt-green' 
          active = 'active'
        }
        return (  
          <li key={i} className={cls} onClick={this.handleMenuSelect.bind(this,i,'T')}>
            <a href="#" ><span className={cls}>{row.gname}</span></a>
          </li>
        )
      })   

      const lrows = item.menuL.map((row, i) => {
        let cls = ''
        let active = ''
        if(row === item.mode && item.typ==='L'){ 
          cls = 'txt-green' 
          active = 'active'
        }
        return (  
          <li key={i} className={cls} onClick={this.handleMenuSelect.bind(this,i,'L')}>
            <a href="#" ><span className={cls}>{row.gname}</span></a>
          </li>
        )
      })   


      let vcls = 'col-12 list-enable'
      if(item.vgroup === true){ vcls = 'col-12 list-visible';   }

      let ccls = 'col-sm-9'
      if(isView){
        ccls = 'col-sm-8'
      }
      let idx = 0
      if(item.typ === 'T'){
        idx = item.menuT.findIndex(x => x.gid === item.mode);
      } else {
        idx = item.menuL.findIndex(x => x.gid === item.mode);
      }
      

    	return(
    	<section  className="bg-White sectionTop"   >
    	  	<div className="container">    	
            <div className="row"> 

              <div className="col-12  xs-visible">
                <button type="button" className="mobile-group-btn pull-right" onClick={this.handleViewGroup.bind(this)}>
                  <i className="fa fa-list"></i> <span className="font-13">หมวดหมู่</span>
                </button>
                <br/>
              </div>
              {
                !isView?
                <div className={vcls}>
                  <h4>Treatment</h4>
                  <ul id="MenuF">
                      {mrows}             
                  </ul>
                  <h4>Laser</h4>
                  <ul id="MenuF">
                      {lrows}             
                  </ul>
                </div> 
                : null
              }
              {
                !isView?
                <div className="col-sm-3 xs-hideen">
                  <h4>Treatment</h4>
                  <ul id="MenuF">
                      {mrows}             
                  </ul>
                  <h4>Laser</h4>
                  <ul id="MenuF">
                      {lrows}             
                  </ul>
                </div>
                : null
              }



                <div  className={ccls}>  
                  <div className="row">
                  {
                  	item.typ === 'T' && idx !== -1?
					         <div className="col-sm-12"><h3 className="font-01">{item.menuT[idx].gname}</h3></div>
					         : null
                  }
                  {
                    item.typ === 'L' && idx !== -1?
                   <div className="col-sm-12"><h3 className="font-01">{item.menuL[idx].gname}</h3></div>
                   : null          
                  }
                    
                  </div>
                  {
                    item.loading ?
                    <div className="row">            
                      <div className="col-sm-12 text-center mgt-100">  
                        <h1>LOAD DATA...</h1>
                      </div>
                    </div>                    
                    : null
                  }

                  {
                    isView ?
                    <TreatmentDetail data={item.product} type={item.typ}  onUpdate={this.onUpdate.bind(this)} />
                    :                    
                    <div className="row">            
                     {rows}    
                    </div>                        
                  }
				<br/><br/>
                </div>
                              
                 {
                isView?
                <div className="col-4 col-sm-4 xs-hidden">
                  <ShopList timers={item.timers} />

                </div> 
                : null
                }


            </div>


    	  	</div>
    	</section>
    	)   
  }

  getDatas(){
    const _this = this
    getProductWebs('treatment','WEB')
    .then(function(response) {         
        let List = []       
        if(response.data.status === '200'){   
          List = response.data.data
        }  
        _this.setState({ data: List, loading: false }) 
    })

    getProductWebs('laser','WEB')
    .then(function(response) {         
        let List = []       
        if(response.data.status === '200'){   
          List = response.data.data
        }  
        _this.setState({ lData: List }) 
    })


  }

  getDetail(code){
    console.log('xx',code)
    const _this = this
    let typ = 'treatment'
    if(this.state.typ === 'L'){ typ='laser' }
    getProduct(typ,code)
    .then(function(response) {   
      if(response.data.status ==='200'){
        _this.setState({  product: response.data.data },()=>{
          window.scrollTo(0,0)
          
        })
      }
    })
  }



}