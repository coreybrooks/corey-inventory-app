import React, {Component} from 'react';

export default class Footer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
        <div className="footer navbar navbar-default">
            <div className="container-fluid">
                <p className="text-center"> Copyright © 2017 Corey Brooks</p>
                <ul className="nav navbar-nav navbar-right">
                    <ul className="social">
                        <li><a href="https://github.com/coreybrooks"><i className=" fa fa-github"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/corey-brooks"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                </ul>
            </div>
        </div>
        );
    }
}