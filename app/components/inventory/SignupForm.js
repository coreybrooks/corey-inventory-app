import React, {Component} from "react";
import axios from "axios";

export default class SignupForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            companyName: ""
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
  if (!this.state.email || !this.state.password || !this.state.companyName) {
    console.log("missing field");
    return;
  }
  axios.post('/api/signup', data).then( response => {
    console.log(`new member created successfully`);
    console.log(`posted, response: ${JSON.stringify(response.data.companyName)}`);
    window.location.replace(`/#/members/${response.data.companyName}`);
  }).catch(function(err) {
    console.log(err);
  });
  {/*window.location.replace(`/#/listing/${this.state.subredditId}`); from react hw
   window.location.replace(response); from passport example */}
  this.setState({email: "", password: "", companyName: ""});
}
render() {
    return (
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h2>Sign Up Form</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input 
                  type="email" 
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="email" 
                  placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input 
                  type="password" 
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="password" 
                  placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputCompany1">Company Name</label>
                  <input 
                  type="text" 
                  value={this.state.companyName}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="companyName" 
                  placeholder="Company Name"
                  />
                </div>
                <button type="submit" className="btn btn-default">Sign Up</button>
              </form>
              <br />
              <p>Or log in <a href="/#/login">here</a></p>
            </div>
          </div>
        </div>
      </div>
    );

  }
}