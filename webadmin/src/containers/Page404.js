import React, { Component } from 'react'

export default class Page404 extends Component {

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

    
    <section className="content">      
      <div className="error-page">
        <h2 className="headline text-yellow"> 404</h2>

        <div className="error-content">
          <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>

          <p>
            We could not find the page you were looking for.
            Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
          </p>

          <form className="search-form">
            <div className="input-group">
              <input type="text" name="search" className="form-control" placeholder="Search">

              <div className="input-group-btn">
                <button type="submit" name="submit" className="btn btn-warning btn-flat"><i className="fa fa-search"></i>
                </button>
              </div>
            </div>
         
          </form>
        </div>
   
      </div>
 
    </section>


    )
  }
}


