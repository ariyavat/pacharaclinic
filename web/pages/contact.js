import React from 'react'
import Layout from '../components/Layout'
import ContactBox from '../components/contact/ContactBox'   

import { getContacts } from '../utils/ContactAPI'  
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], isLoad: false,
    }  
   
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
      return (  
        <ContactBox data={row} key={i} />
      )
    })

    return(
    <Layout page="contact">   
        <div className="container-fluid">         
        	<section className="sectionTop review" >	
		        <div className="container">		   
		            {rows}
		        </div>
				    <br/><br/><br/><br/>
        	</section>
        </div>
    </Layout>
    )
  }





}