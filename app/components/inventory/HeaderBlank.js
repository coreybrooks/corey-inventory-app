import React, { Component} from 'react';

export default class HeaderBlank extends Component {
    constructor() {
        super();
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
      </div>
    </nav>
    );
  } 
}