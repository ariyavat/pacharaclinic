import React, { PropTypes } from 'react'

function AppointmentStatus (props) {
	switch(props.status){
	  	case 'CANCEL':  
		return(
			<span className="label label-warning">ยกเลิก</span>
		)
		break
	  	case 'NONE':  
	    return(
	    	<span>-</span>
	    )
	    break
	  	case 'COMPLETE':  
	    return(
	    	<span className="label label-success">เข้ารับบริการ</span>
	    )
	    break
	}
}
export default AppointmentStatus