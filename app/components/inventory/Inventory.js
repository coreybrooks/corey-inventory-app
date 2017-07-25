import React, {Component} from "react";
import axios from "axios";
import InventoryForm from "./InventoryForm";
import AreaLegend from "./AreaLegend";
import HeaderCreate from "./HeaderCreate";

export default class Inventory extends Component {
   constructor() {
       super();

       this.state = {
           items: [],
           areas: [],
           companyName: ""           
       };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeRecord = this.removeRecord.bind(this);
   }
  handleChange(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  handleSubmit(event) {
    console.log(`handleSubmit is working`);
    event.preventDefault();
    var temp = $("#date").val();
    console.log();
    if ($("#date").val() === "") {
      alert ("please enter the date")
      return
    }
    if ($("#days").val() === "") {
      alert ("please enter the number of days the inventory should cover");
      return
    }
    for (var i=0;i<this.state.items.length;i++) {
       var item = this.state.items[i];
       var count1 = parseFloat($("#area1Item"+item.id).val());
       var decimal=  /^[-+]?[0-9]+\.[0-9]+$/;  
       count1 ? count1=count1 : count1="";
       console.log(`count1: ${count1}`);
         if (count1.match(decimal) || count1 === "") {
           console.log(`count1 is valid`);
         }
         else {
           alert('Please enter an integer or a decimal value for the Daily Need.\n\nFor example:\nFor one half of a 20lb Box enter: 0.5 or .5\nFor one whole 20lb Box enter: 1 or 1.0');  
           return
         }
       var count2 = parseFloat($(`#area2Item${item.id}`).val());
       var days = parseInt($("#days").val());
       var date = $("#date").val();
       var dailyNeed = parseFloat(item.dailyNeed);
       var countTotal = ""; 
       if (count2) {    
         countTotal = count1 + count2;
      }
      else {
        countTotal = count1;
      }
       var order = Math.ceil(dailyNeed*days - countTotal);
       if (order < 0) {
         order = 0;
       }   
       
       console.log(`order: ${order}`);
       console.log(`item ${item.id}, count1: ${count1}, total: ${countTotal}`);
       console.log(`area1: ${item.area1}`);
       var record = {
         companyName: this.state.companyName,
         date: date,
         itemNumber: item.id,
         item: item.item,
         unitSize: item.unitSize,
         area1: count1,
         area2: count2,
         total: countTotal,
         dailyNeed: item.dailyNeed,
         numberOfDays: days,
         order: order
       };
       console.log(`record: ${JSON.stringify(record)}`);

        axios.post("/api/inventory", record).then( response => {
          console.log(`inventory response date: ${JSON.stringify(response.data.date)}`);
          window.location.replace(`/#/table/${response.data.companyName}/${response.data.date}`);
          }).catch(function(err) {
          console.log(err);
        });
    }    
  }
  componentDidMount() {
      console.log(`Inventory component mounted`);
      console.log("inventory" + this.props.params.companyName);
      this.setState({companyName: this.props.params.companyName});
      //axios request to get items
      axios.get(`/api/items/${this.props.params.companyName}`).then( results => {
        console.log(`axios get api/items working in componentDidMount Inventory, data: ${JSON.stringify(results.data)}`);
        this.setState({items: results.data});
      });
  }
  removeRecord(event) {
    event.preventDefault();
    console.log("delete button clicked");
    console.log(`event.target.id: ${JSON.stringify(event.target.id)}`);
    var confirmDelete = confirm("Are you sure you want to delete this item?");
    
    if (confirmDelete) {
    axios.delete(`/api/items/${this.props.params.companyName}/${event.target.id}`).then( results => {
      console.log(`record deleted`);
    });

    axios.get(`/api/items/${this.props.params.companyName}`).then( results => {
      console.log(`axios get api/items working in componentDidMount Inventory, data: ${JSON.stringify(results.data)}`);
      this.setState({items: results.data});
    });

  } 
   
}
handleChange(event) {
  console.log(`handleChange event.target.id: ${event.target.id}`);
  var targetId = `${event.target.id.substring(0,5)}${event.target.id.substring(9)}`;
  console.log(targetId);
  $(`#${targetId}`).attr("style", "color:gray");

}
  render() {
      return (
        <div>
          <HeaderCreate companyName={this.props.params.companyName}/>
            <div className="inventoryContainer">
              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      <h4 className="modal-title title2">Instructions</h4>
                    </div>
                    <div className="modal-body">
                      <p>
                        1) Go to an inventory area and begin completing the form.  Scan for the color on the form associated with the inventory area, and begin entering item totals<br/><br/>
                        2) Enter the totals for items using unit decimals, for example: <br/>For one half of a 20lb Box enter:    0.5 or .5<br/><br/>
                        3) Then scan for the next form position with the same area color and enter the total for the item.  Once a total is entered, the area color for that form position changes to gray<br/><br/>
                        4) Enter the totals for every item with the same area color before moving to the next inventory area<br/><br/>
                        5) Once all form positions are filled (no more colors are present) submit the form to calculate the order and display the results table
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            <AreaLegend companyName={this.props.params.companyName} />
            <button type="button" className="btn-default instructionsButton">Inventory Instructions</button>
            <form className="tableForm" onSubmit={this.handleSubmit}>
              <h2 className="text-center">{this.props.params.companyName} Inventory</h2><br/><br/>
                  <div className="form-group col-sm-2 dateDiv">
                    <label htmlFor="date">Date</label>
                    <input 
                      type="text" 
                      className="form-control date" 
                      id="date" 
                      placeholder=""
                      />
                  </ div>           
                  <div className="form-group col-sm-1 dayDiv">
                    <label htmlFor="days"># of days</label>
                    <input 
                      type="text" 
                      className="form-control days" 
                      id="days" 
                      placeholder=""
                      />
                  </ div>  
              <table className="table table-striped table-bordered table-responsive table-compact">
                <thead>
                  <tr>
                    <th>Item ID#</th>
                    <th>Item</th>
                    <th>Area 1</th>
                    <th>Count 1</th>
                    <th>Area 2</th>
                    <th>Count 2</th>
                    <th>Unit Size</th>
                    <th>Delete Item</th>
                  </tr>
                </thead>
                <tbody className="inventoryTable">
                    {this.state.items.map(item => { 
                      console.log(`item map #: ${item.id}`);
                      var item1 = `item${item.id}Count1`;
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.item}</td>
                            <td id={`area1${item.id}`} style={{color: item.color1}}><strong>{item.area1}</strong></td>
                            <td>
                              <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                id={`area1Item${item.id}`} 
                                placeholder=""
                                onChange={this.handleChange}
                                />
                              </div>
                            </td>
                            <td id={`area2${item.id}`} style={{color: item.color2}}><strong>{item.area2}</strong></td>
                            <td>
                              {/*display form input area only if area2 exists */}
                              { item.area2 ?
                              <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                id={`area2Item${item.id}`} 
                                placeholder=""
                                onChange={this.handleChange}
                                />
                              </div> : ""
                              }
                            </td>
                            <td>{item.unitSize}</td>
                            <td>
                              <div>
                                <button
                                    className="deleteButton btn-default"
                                    id={item.id}
                                    onClick={this.removeRecord}>x
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>  
			        </table>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>  
      );
    }
}
