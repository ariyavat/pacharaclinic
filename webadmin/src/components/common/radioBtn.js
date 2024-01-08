import React, { Component } from 'react'

class rdoButton extends Component {
	constructor (props) {
		super(props);	

	}

	componentDidMount(){
		console.log(this.props.mode,this.props.name)
		//setBtnStatus(this.props.mode,this.props.name)
	}
	handleBtnClick(e){
		//const title = e.target.title
		//const name = e.target.name
		//setBtnStatus(title,this.props.name)
		//this.props.onSubmit(title)
	}
	render() {
		console.log('sdf')
		return (
		<div>
			dfsdfsdf

		</div>
		)
	}
}
export default rdoButton