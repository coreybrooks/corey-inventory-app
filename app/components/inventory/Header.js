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
                <a className="navbar-brand" href="#">Corey's Inventory App</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/logout"><i className="fa fa-hand-spock-o" aria-hidden="true"></i> Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    );
}
}