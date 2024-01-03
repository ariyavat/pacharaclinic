import React, { PropTypes } from 'react'

function LevelStatus (props) {
	switch(props.level){
	  	case 'W':  
		return(
			<span className="">WALK IN</span>
		)
		break
	  	case 'S':  
	    return(
	    	<span className="label bg-gray">SILVER MEMBER</span>
	    )
	    break
	  	case 'G':  
	    return(
	    	<span className="label label-warning">GOLD MEMBER</span>
	    )
	  	case 'P':  
	    return(
	    	<span className="label label-success">PLATINUM MEMBER</span>
	    )

	    break
	}
}
export default LevelStatus