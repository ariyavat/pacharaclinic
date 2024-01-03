import React, { PropTypes } from 'react'

function LeaveStatus (props) {	

	switch(props.status){
	  	case 'S':  
			return(
				<span>ลาป่วย</span>
			)
		break
	  	case 'E':  
		    return(
		      <span>ลากิจ</span>
		    )
	    break
	  	case 'H':  
		    return(
		      <span>ลาพักร้อน</span>
		    )
	    break
	}
}
export default LeaveStatus