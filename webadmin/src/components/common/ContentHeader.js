import React, { Component } from 'react'
export default class ContentHeader extends Component {

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
