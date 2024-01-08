import React, { Component } from 'react'

export default class PageTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [], 
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    this.setState({data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    //this.setState({data: nextProps.data});
  }


  render() {
    return (
        <section className="content-header non-printable">
          <div className="row">
            <div className="col-sm-8 col-xs-7">
              <h2>
                {this.props.title}
                <small className="mgl-10">{this.props.small}</small>
              </h2> 
            </div>
            <div className="col-sm-4 col-xs-5">
              {this.props.children}
            </div>
          </div>    
        </section>  
    )
  }
}

