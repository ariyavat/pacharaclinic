import React, { PropTypes } from 'react'

function CustomerLevel (props) {
	switch(props.level){
	  	case 'W':  
		return(
			<h3>WALK IN</h3>
		)
		break
	  	case 'S':  
	    return(
	    	<h3><span className="label bg-gray">SILVER MEMBER</span></h3>
	    )
	    break
	  	case 'G':  
	    return(
	    	<h3><span className="label label-warning">GOLD MEMBER</span></h3>
	    )
	  	case 'P':  
	    return(
	    	<h3><span className="label label-success">PLATINUM MEMBER</span></h3>
	    )

	    break
	}
}
export default CustomerLevel