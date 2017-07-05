import React, {Component} from 'react';
import axios from "axios";

export default class Member extends Component {
    constructor() {
        super();

        this.state= {
            memberName: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
componentDidMount() {
    console.log(`this.params: ${JSON.stringify(this.props.params)}`);
    this.setState({memberName: this.props.params.companyName});
    {/*axios.get(`/api/user-data`).then( data => {
        this.setState({memberName: data.email});
    })*/}
}
render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
            <h2>Welcome <span>{this.state.memberName}</span></h2>
            </div>
          </div>
        </div>
    );
 }
}