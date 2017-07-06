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
    this.setState({companyName: this.props.companyName});
    //axios request to get the existing areas for this company
    axios.get(`/api/area/${this.props.companyName}`).then( results => {
       console.log(`axios get api/area working in componentDidMount, data: ${JSON.stringify(results.data)}`);
       var data = results.data;
       //dynamically create the form options based on the existing areas
       var option = $("<option>");
       option.text("");
       $(".selection1").append(option);
       for(var i=0;i<data.length;i++) {
         option = $("<option>");
         option.text(data[i].area);
         $(".selection1").append(option);
       } 
      //do the same for section 2, it's the same information but problems with asychronous function
       var option2 = $("<option>");
       option2.text("");
       $(".selection2").append(option2);
       for(var i=0;i<data.length;i++) {
         option2 = $("<option>");
         option2.text(data[i].area);
         $(".selection2").append(option2);
       }  
    });
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
                  <label htmlFor="unitSize">Unit Size (e.g. 20lb box)</label>
                  <input 
                  type="text" 
                  value={this.state.unitSize}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="unitSize" 
                  placeholder="enter unit size"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="area1">Select Area 1</label>
                  <select
                  value={this.state.area1}
                  onChange={this.handleChange}
                  className="form-control selection1" 
                  id="area1" 
                  placeholder="select area 1"
                  >
                 </select>
                </div>
                <div className="form-group">
                  <label htmlFor="area2">Select Area 2</label>
                  <select
                  value={this.state.area2}
                  onChange={this.handleChange}
                  className="form-control selection2" 
                  id="area2" 
                  >
                 </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dailyNeed">Daily Need (decimals)</label>
                  <input 
                  type="text" 
                  value={this.state.dailyNeed}
                  onChange={this.handleChange}
                  className="form-control" 
                  id="dailyNeed" 
                  placeholder="units used per day"
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