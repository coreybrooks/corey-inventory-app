import React, {Component} from 'react';
import axios from "axios";
import NewAreaForm from "./NewAreaForm";
import ItemForm from "./ItemForm";
import AreaLegend from "./AreaLegend";

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
            <div className="col-md-12">
              <h2 className="text-center">Welcome <span>{this.state.memberName}</span></h2>
              <hr/>
              <div className="col-sm-6">
                <NewAreaForm companyName={this.props.params.companyName} />
                <hr />
                <AreaLegend companyName={this.props.params.companyName} />
              </div>
              <div className="col-sm-6">
                <ItemForm companyName={this.props.params.companyName} />
              </div>
            </div>
          </div>
            <button className="btn inventoryButton">
              <a href={`/#/inventory/${this.state.memberName}`}>Begin inventory</a>
            </button>
        </div>
    );
 }
}