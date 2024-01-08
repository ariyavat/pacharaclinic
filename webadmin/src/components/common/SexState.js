import React, { PropTypes } from 'react'

function SexState (props) {	

	switch(props.sex){
	  	case 'none':  
			return(
				<span>ไม่ระบุ</span>
			)
		break
	  	case 'male':  
		    return(
		      <span className="text-blue">ชาย</span>
		    )
	    break
	  	case 'female':  
		    return(
		      <span className="text-warning">หญิง</span>
		    )
	    break
	}
}
export default SexState