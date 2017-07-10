import React, { Component} from 'react';

export default class HeaderTable extends Component {
    constructor() {
        super();

        this.state = {
            companyName : ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

componentDidMount() {
  this.setState({companyName: this.props.companyName});

}

render() {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="#" className="noHover" style={{float: "left"}}><h4 className="title2">Kanban Inventory</h4></a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><a href={this.state ? `/#/members/${this.state.companyName}` : `/logout`}><i className="fa fa-plus-circle" aria-hidden="true"></i> Create New Items</a></li>
            <li><a href={this.state ? `/#/inventory/${this.state.companyName}` : `/logout`}><i className="fa fa-chevron-circle-right" aria-hidden="true"></i> Inventory</a></li>
            <li><a href="/logout"><i className="fa fa-chevron-circle-up" aria-hidden="true"></i> Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    );
  } 
}