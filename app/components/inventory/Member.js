import React, {Component} from 'react';
import axios from "axios";
import NewAreaForm from "./NewAreaForm";
import ItemForm from "./ItemForm";
import AreaLegend from "./AreaLegend";
import Header from "./Header";

export default class Member extends Component {
    constructor() {
        super();

        this.state= {
            memberName: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.inventoryRedirect = this.inventoryRedirect.bind(this);
    }
componentDidMount() {
    console.log(`this.params: ${JSON.stringify(this.props.params)}`);
    this.setState({memberName: this.props.params.companyName});
}
inventoryRedirect() {
    window.location.replace(`/#/inventory/${this.state.memberName}`);
}
render() {
    return (
      <div>
        <Header companyName={this.props.params.companyName}/>
        <div className="container">
          <div className="row">
            <div className="col-md-12 memberContainer">
              <h2 className="text-center">Welcome <span>{this.state.memberName}</span></h2>
              <hr/>
              <div className="col-sm-6">
                <div className="row">
                  <div className="instructionsDiv">
                    <p className="instructions col-sm-5 col-sm-offset-1">
                      <span className="instructionsHeader">  Instructions</span><br/>  
                      1) Create inventory areas and assign colors<br/>
                      2) Create items and designate areas<br/>
                      3) Items that are in more than two areas can be listed multiple times<br/>
                      4) Begin inventory
                    </p>
                  </div>
                  <div className="col-sm-3 col-sm-offset-2">   
                    <AreaLegend companyName={this.props.params.companyName} />
                  </div> 
                </div>

                <div className="row">
                  <div className="newAreaFormDiv">    
                    <NewAreaForm companyName={this.props.params.companyName} />
                  </div>  
                </div>
              </div>
              <div className="col-sm-6 newItemDiv">
                <ItemForm companyName={this.props.params.companyName} />
              </div>
            </div>
          </div>
            <button onClick={this.inventoryRedirect} className="btn inventoryButton">
              Begin inventory
            </button>
        </div>
      </div>  
    );
 }
}