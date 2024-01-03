import React, { PropTypes } from 'react'

function VivitStatus (props) {
	switch(props.status){
	  	case 'WAIT':  
			return(
				<span className="text-orange">รอชำระ</span>
			)
		break
	  	case 'COMPLETE':  
		    return(
		      <span className="text-green">เสร็จสิ้น</span>
		    )
	  	case 'CANCEL':  
		    return(
		      <span className="text-red">ยกเลิก</span>
		    )
	    break	  
	}
}
export default VivitStatus