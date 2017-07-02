import React, { Component} from 'react';

export default class Header extends Component {
    constructor() {
        super();
    }


render() {
    return (
        <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <a className="navbar-brand" href="#">Corey's Reddit Page</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/"><i className="fa fa-home" aria-hidden="true"></i> Home</a></li>
                    <li><a href="/#/add"><i className="fa fa-plus" aria-hidden="true"></i> Add New Category</a></li>
                </ul>
                </div>
            </div>
        </div>
    );
}
}