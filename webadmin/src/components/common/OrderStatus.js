import React, { PropTypes } from 'react'

function OrderStatus (props) {	

	switch(props.status){
	  	case 'N':  
		return(
			<span className="text-black">รอยืนยันการขาย</span>
		)
		break
	  	case 'P':  
	    return(
	      <span className="text-blue">รอจัดส่ง</span>
	    )
	    break
	  	case 'S':  
	    return(
	      <span className="text-warning">ส่งสินค้า</span>
	    )
	    break
		case 'Y':  
			return(
				<span className="text-green">เสร็จสิ้น</span>
			)
			break
		case 'X':  
			return(
				<span className="text-red">ยกเลิก</span>
			)
			break
	}


}
export default OrderStatus