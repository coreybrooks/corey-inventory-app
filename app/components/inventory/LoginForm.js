import React, {Component} from "react";
import axios from "axios";

export default class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
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
  if (!this.state.email || !this.state.password) {
    console.log("missing field");
    return;
  }
  axios.post("/api/login", data).then( response => {
    console.log(`login response: ${JSON.stringify(response.data)}`);
    if (response.data !== "noMatch") {
      console.log(`returned data is matched`);
      window.location.replace(`/#/members/${response.data.companyName}`);
    }
    else {
      alert("email or password is incorrect, try again! \nIf this is your first visit, please sign up first");
    }
  }).catch(function(err) {
    console.log(err);
  });
  {/*window.location.replace(`/#/listing/${this.state.subredditId}`);
  this.setState({emailInput: "", passwordInput: ""}); not sure if I need this yet */}
  this.setState({email: "", password: ""});
}
render() {
    return (
      
      <div className="">
        <div className="loginForm">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h2>Login Form</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input 
                  type="email" 
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="email" 
                  placeholder="enter email address"
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
                  placeholder="enter password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
              <br />
              <p>Or sign up <a href="/#/signup">here</a></p>
            </div>
          </div>
        </div>        
      </div>
    );

  }
}