import React, {Component} from "react";
import axios from "axios";

export default class NewAreaForm extends Component {
    constructor() {
        super();

        this.state = {
            companyName: "",
            area: "",
            color: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
handleChange(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
}
handleSubmit(event){
  console.log("handleSubmit is working");
  event.preventDefault();
  var data= this.state;
  axios.post("/api/area", data).then( response => {
    console.log(`area response: ${JSON.stringify(response.data)}`);
  }).catch(function(err) {
    console.log(err);
  });
  {/*window.location.replace(`/#/listing/${this.state.subredditId}`);
  this.setState({emailInput: "", passwordInput: ""}); not sure if I need this yet */}
  this.setState({area: "", color: ""});
}
render() {
    return (
      
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h2>Make New Area</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="newAreaName">Name of Area</label>
                  <input 
                  type="text" 
                  value={this.state.area}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="area" 
                  placeholder="for example: walk-in"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color for area legend</label>
                  <input 
                  type="text" 
                  value={this.state.color}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="color" 
                  placeholder="color"
                  />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>        
      </div>
    );

  }
}