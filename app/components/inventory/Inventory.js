import React, {Component} from "react";
import axios from "axios";
import InventoryForm from "./InventoryForm";
import AreaLegend from "./AreaLegend";

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
   }
  handleChange(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  handleSubmit(event) {
    console.log(`handleSubmit is working`);
    event.preventDefault();
    for (var i=0;i<this.state.items.length;i++) {
       var item = this.state.items[i];
       var count1 = parseFloat($("#area1Item"+item.id).val());
       var count2 = parseFloat($(`#area2Item${item.id}`).val());
       var days = parseInt($("#days").val());
       var date = $("#date").val();
       var dailyNeed = parseFloat(item.dailyNeed);     
       var countTotal = count1 + count2;
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
  render() {
      return (
          <div className="inventoryContainer">
            <AreaLegend companyName={this.props.params.companyName} />
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
                    <th>Daily Need</th>
                    <th>Unit Size</th>
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
                            <td style={{color: item.color1}}><strong>{item.area1}</strong></td>
                            <td>
                              <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                id={`area1Item${item.id}`} 
                                placeholder=""
                                />
                              </div>
                            </td>
                            <td style={{color: item.color2}}><strong>{item.area2}</strong></td>
                            <td>
                              <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                id={`area2Item${item.id}`} 
                                placeholder=""
                                />
                              </div>
                            </td>
                            <td>{item.dailyNeed}</td>
                            <td>{item.unitSize}</td>
                          </tr>
                        );
                      })}
                </tbody>  
			        </table>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
      );
    }
}
