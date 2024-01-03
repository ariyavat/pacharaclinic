import React, { PropTypes } from 'react'

function QueueState (props) {
	switch(props.state){
	  	case 'W':  
		return(
			<span className="label label-warning">ห้องยา / การเงิน</span>
		)
		break
	  	case 'T':  
	    return(
	    	<span className="label label-info">ทรีทเมนท์</span>
	    )
	    break
	  	case 'D':  
	    return(
	    	<span className="label label-success">รอพบแพทย์</span>
	    )
	    break
	}
}
export default QueueState