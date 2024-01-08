import React, { PropTypes } from 'react'

function VisitState (props) {
	switch(props.mode){
	  	case 'PAY':  
			return(
				<span className="text-blue">ซื้อสินค้าและบริการ</span>
			)
		break
	  	case 'PC':  
			return(
				<span className="text-blue">แบ่งชำระ</span>
			)
		break

	  	case 'PLANS':  
		    return(
		      <span className="text-orange">แบ่งชำระ</span>
		    )
	    break

	  	case 'TR':  
		    return(
		      <span className="text-info">ตัดใช้บริการ</span>
		    )
	    break
	}
}
export default VisitState