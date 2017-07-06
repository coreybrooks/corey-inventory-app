import React, {Component} from "react";
import axios from "axios";

export default class ItemForm extends Component {
    constructor() {
        super();

        this.state = {
            companyName: "",
            item: "",
            unitSize: "",
            area1: "",
            area2: "",
            dailyNeed: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
componentDidMount() {
    console.log(`this.props.companyName for NewAreaForm: ${JSON.stringify(this.props.companyName)}`);
    this.setState({companyName: this.props.companyName});
    {/*axios.get(`/api/user-data`).then( data => {
        this.setState({memberName: data.email});
    })*/}
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
  axios.post("/api/item", data).then( response => {
    console.log(`area response: ${JSON.stringify(response.data)}`);
  }).catch(function(err) {
    console.log(err);
  });
  {/*window.location.replace(`/#/listing/${this.state.subredditId}`);
  this.setState({emailInput: "", passwordInput: ""}); not sure if I need this yet */}
  this.setState({item: "", unitSize: "", area1: "", area2: "", dailyNeed:""});
}
render() {
    return (
      
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h2>Make New Item</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="item">Name of Item</label>
                  <input 
                  type="text" 
                  value={this.state.item}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="item" 
                  placeholder="enter item"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="unitSize">Unit Size</label>
                  <input 
                  type="text" 
                  value={this.state.unitSize}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="unitSize" 
                  placeholder="enter unit size in decimals"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="area1">Area 1</label>
                  <select
                  value={this.state.area1}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="area1" 
                  >
                    <option>blue</option>
                    <option>red</option>
                    <option>yellow</option>
                    <option>green</option>
                    <option>purple</option>
                 </select>
                </div>
                <div className="form-group">
                  <label htmlFor="area2">Area 2</label>
                  <select
                  value={this.state.area2}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="area2" 
                  >
                    <option>blue</option>
                    <option>red</option>
                    <option>yellow</option>
                    <option>green</option>
                    <option>purple</option>
                 </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dailyNeed">Daily Need</label>
                  <input 
                  type="text" 
                  value={this.state.dailyNeed}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="dailyNeed" 
                  placeholder="Enter units used on a daily basis as decimal"
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