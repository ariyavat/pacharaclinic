import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import * as config from '../../config';

const   dayTh =["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์"];
const   dayEn =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthTH = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
const monthEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const initialState = { 
  data: [], yList: [], appList: [],  cn: '1',
  lang: 'en', months: monthTH , days: dayTh, firstDay: 0, currentMonth:moment().month(), currentYear: moment().year(),
};

const start = moment().year() - 2
const end = moment().year() + 5



export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState   
  }
  shouldComponentUpdate(_nextProps, nextState) {
      return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentWillReceiveProps(nextProps){
    this.setState({ data : nextProps.datas, cn: nextProps.cn },()=>{
      this.setDatas()
    })
  }
  componentDidMount () {
    let list = this.state.yList
      for (let year = start; year <= end; year++) {
        list.push(year)      
      }

      this.setState({ yList: list, data : this.props.datas, cn: this.props.cn },()=>{
        this.setDatas()
        this.showCalendar(moment().month(), moment().year() )
        
      })
  }

  setDatas(){
    let cn = this.state.cn
    let list = []; //this.state.eList  
    this.state.data.forEach(function(item){         
      if(item.cn === cn){
        let txt = item.day.split("-"); 
        let day = parseFloat(txt[2]);

        let temp = {
            day: day,
            dat: item.day,
            dname1: item.dname1,
            dname2: item.dname2,
            dname3: item.dname3,
        }
        list.push(temp)
      }
    }) 
    this.setState({ appList: list })

  }


  handleNext() {
    let { currentYear, currentMonth  } = this.state
      currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      this.showCalendar(currentMonth, currentYear);

  }
  handlePrevious(){
    let { currentYear, currentMonth  } = this.state
      currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
      currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
      this.showCalendar(currentMonth, currentYear);   
  }

  handleJump(mode,e) {
    e.preventDefault()
      let { currentYear, currentMonth  } = this.state
      if(mode==='M'){
        currentMonth = parseInt(e.target.value)
      } else {
        currentYear = parseInt(e.target.value)
      }
      this.showCalendar(currentMonth, currentYear);
  }

  showCalendar(month,year){
    let mn = parseFloat(month) + 1
    if(mn.toString().length === 1){
      mn = '0'+mn
    }
    let dat = year+'-'+mn;
    let day = year+'-'+mn+'-'+'01';
    let st =moment(day).startOf('month').format("DD/MM/YYYY");
    let et = moment(day).endOf("month").format("DD/MM/YYYY");
    //console.log('log',month,year)
    this.setState({  currentMonth: month, currentYear: year},()=>{
      this.props.onGetData(dat)
    })
  }

  hadleSelect(date){
    const { currentMonth, currentYear } = this.state
    let mn = parseFloat(currentMonth) + 1
    if(mn.toString().length === 1){
      mn = '0'+mn
    }
    let dat = date
    if(date.toString().length === 1){
      dat = '0'+date
    }   

    let day = dat+'/'+mn+'/'+currentYear;
    let tdat = currentYear+'-'+mn+'-'+dat;
    this.props.onSelect(tdat);
  }
  


  render () {
  	const item = this.state
    const appList = this.state.appList
    
    const tyear = parseFloat(item.currentYear) + 543
    const tmonth = item.months[item.currentMonth]
    const year = item.currentYear
    const month = item.currentMonth
    let firstDay = (new Date(item.currentYear,item.currentMonth)).getDay();
    let x = 32 - new Date(item.currentYear, item.currentMonth, 32).getDate()
    const array = [1,2,3,4,5,6,7]
    const today = new Date();
    let date = 0;
    let i = 0;

   
      const row1 = array.map((item,j)=>{
        if(i === 0 && j < firstDay ){         
        return (<td key={item+j} height="80"></td>)         
        } else if (date > x ) {
              return null
            } else {                
              let cls = "date-picker alink min-50"
              date++;
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cls = "date-picker selected alink";
                } 
               let dname = '', dname1 = '';
                let idx = appList.findIndex(x => x.day === date);               
                if(idx !== -1){
                  dname = appList[idx].dname1
                  dname1 = appList[idx].dname2
                }
          return( 
          <td key={item+j} className={cls} onClick={this.hadleSelect.bind(this,date)}> 
            {date}
            <div>{dname !== '' ? <small className="pull-right badge bg-aqua">{dname} </small>  : null}</div>

          
          </td>)
          
        }
      }) 
      i++;
      const row2 = array.map((item,j)=>{
        if(i === 0 && j < firstDay ){         
        return (<td key={item+j} height="80"></td>)         
        } else if (date > x ) {
              return null
            } else {                
              let cls = "date-picker alink"
              date++;
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cls = "date-picker selected alink";
                }
               let dname = '', dname1 = '';
                let idx = appList.findIndex(x => x.day === date);               
                if(idx !== -1){
                  dname = appList[idx].dname1
                  dname1 = appList[idx].dname2
                }

                
          return( 
          <td height="80" key={item+j} className={cls} onClick={this.hadleSelect.bind(this,date)}>
            {date}
            <div>
            {dname !== '' ? <small className="pull-right badge bg-aqua">{dname} </small>  : null}
            </div>
          </td>
          )
        
        }
      }) 

      i++;
      const row3 = array.map((item,j)=>{
        if(i === 0 && j < firstDay ){         
        return (<td key={item+j}></td>)         
        } else if (date > x ) {
              return null
            } else {                
              let cls = "date-picker alink"
              date++;
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {                
                    cls = "date-picker selected alink";
                } 
               let dname = '', dname1 = '';
                let idx = appList.findIndex(x => x.day === date);               
                if(idx !== -1){
                  dname = appList[idx].dname1
                  dname1 = appList[idx].dname2
                }              
                
          return( <td height="80" key={item+j} className={cls} onClick={this.hadleSelect.bind(this,date)}>
          {date}
         <div>{dname !== '' ? <small className="pull-right badge bg-aqua">{dname} </small>  : null}</div>
          </td>)
          
        }
      }) 
      i++;
      const row4 = array.map((item,j)=>{
        if(i === 0 && j < firstDay ){         
        return (<td key={item+j}></td>)         
        } else if (date > x ) {
              return null
            } else {                
              let cls = "date-picker alink"
              date++;
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cls = "date-picker selected alink";
                }
                let dname = ''
                let idx = appList.findIndex(x => x.day === date);               
                if(idx !== -1){
                  dname = appList[idx].dname1
                }               
          return( <td height="80" key={item+j} className={cls} onClick={this.hadleSelect.bind(this,date)}>
          {date}
          <div>{dname !== '' ? <small className="pull-right badge bg-aqua">{dname} </small>  : null}</div>
          </td>)
          
        }
      }) 
      i++;
      const row5 = array.map((item,j)=>{
        if(i === 0 && j < firstDay ){         
        return (<td key={item+j}></td>)         
        } else if (date > x -1  ) {
              return null
            } else {                
              date++;
              let cls = "date-picker alink"
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cls = "date-picker selected alink";
                }
               let dname = '', dname1 = '';
                let idx = appList.findIndex(x => x.day === date);               
                if(idx !== -1){
                  dname = appList[idx].dname1
                  dname1 = appList[idx].dname2
                }              
                
          return( 
          <td height="80" key={item+j} className={cls} onClick={this.hadleSelect.bind(this,date)}>
          {date}
          <div>{dname !== '' ? <small className="pull-right badge bg-aqua">{dname} </small>  : null}</div>
          </td>
          )
          
        }
      }) 
      i++;
      const row6 = array.map((item,j)=>{
        if(i === 0 && j < firstDay ){         
        return (<td key={item+j}></td>)         
        } else if (date > x -1 ) {
              return null
            } else {                
              date++;
              let cls = "date-picker alink"
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cls = "date-picker selected alink";
                }
               let dname = '', dname1 = '';
                let idx = appList.findIndex(x => x.day === date);               
                if(idx !== -1){
                  dname = appList[idx].dname1
                  dname1 = appList[idx].dname2
                }              
                
          return( 
          <td height="80" key={item+j} className={cls} onClick={this.hadleSelect.bind(this,date)}>
          {date}
          <div>{dname !== '' ? <small className="pull-right badge bg-aqua">{dname} </small>  : null}</div>
          </td>
          )
          
        }
      }) 

  
	return(
	

	    <div className="row">
	        <div className="col-md-12" >
		

	              <div className="container-calendar">
	                    
	                    
	                    <div className="button-container-calendar">       
	                      <div className="row"> 
	                        <div className="col-sm-3"> <button id="previous" onClick={this.handlePrevious.bind(this)}>&#8249;</button> </div>  
	                        <div className="col-sm-6"> <h3 id="monthAndYear">{tmonth + " " +  tyear}</h3> </div>  
	                        <div className="col-sm-3"> <button id="next" onClick={this.handleNext.bind(this)}>&#8250;</button> </div>  
	                      </div>                        
	                    </div>
	                    
	                    <table className="table-calendar" id="calendar" >
	                        <thead id="thead-month">
	                        <tr>
	                          {
	                            item.days.map((item,i)=>(<th key={i} width="150">{item}</th>))
	                          }
	                        </tr>
	                        </thead>
	                        <tbody id="calendar-body">  

	                          <tr>{row1}</tr>
	                          <tr>{row2}</tr>
	                          <tr>{row3}</tr>
	                          <tr>{row4}</tr>
	                          <tr>{row5}</tr>                
	                          <tr>{row6}</tr> 

	                        </tbody>
	                    </table>
	                    
	                    <div className="footer-container-calendar">
	                         <label >Jump To: </label>
	                         <select id="month" ref="month" className="mgl-10"  value={item.currentMonth}  onChange={this.handleJump.bind(this,'M')}>
	                          {
	                            item.months.map((item,i)=>(<option key={i} value={i}>{item}</option>))  
	                          }                 
	                         </select>
	                         <select id="year" ref="year" className="mgl-10" value={item.currentYear} onChange={this.handleJump.bind(this,'Y')}>
	                         {
	                          item.yList.map((item,i) => (<option key={i} value={item}>{parseFloat(item) + 543}</option>)  )
	                         }
	                         </select>       
	                    </div>

	                </div>  




	        </div>
	    </div>



	)   
  }

 //
  getDatas(){
  	/*
    const _this = this
    getPromotions('WEB','-','-')
    .then(function(response) {         
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
    */
  }



}