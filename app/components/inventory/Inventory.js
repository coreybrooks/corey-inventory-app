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
           companyName: "",
           test: ""
           
       };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
       // this.getData = this.getData.bind(this);
   }
     renderTable() {

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
          console.log(`inventory response: ${JSON.stringify(response.data)}`);
          }).catch(function(err) {
          console.log(err);
        });
        //location.reload();       
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
      //axios request to get area colors
      axios.get(`/api/area/${this.props.params.companyName}`).then( results => {
        var colorArray = [];
        for (var i=0; i<results.data.length; i++) {
          var item = results.data[i];
          var color = item.color;
          var area = item.area;
          colorArray.push({area: color});
        }
        console.log(`colorArray: ${JSON.stringify(colorArray)}`);
       this.setState({areas: colorArray});
    });
  }
  render() {
      return (
          <div className="inventoryContainer">
            <AreaLegend companyName={this.props.params.companyName} />
            <form className="tableForm" onSubmit={this.handleSubmit}>
            <h3 className="text-center">{this.props.params.companyName} Inventory</h3> 
              <div className="form-group">
              <label htmlFor="days"># of days</label>
              <input 
                type="text" 
                className="form-control" 
                id="days" 
                placeholder=""
                />
              </ div>           
            <table className="table table-striped table-bordered table-responsive table-compact">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Area 1</th>
                  <th>Count 1</th>
                  <th>Area 2</th>
                  <th>Count 2</th>
                  <th>Total</th>
                  <th>Daily Need</th>
                  <th>Order</th>
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
                            <td style={{color: item.color1}}>{item.area1}</td>
                            <td>
                            <div className="form-group">
                                <input 
                                type="text" 
                                //value={this.state.test}
                                // onChange={this.handleChange}
                                className="form-control" 
                                id={`area1Item${item.id}`} 
                                placeholder=""
                                />
                            </div>
                            </td>
                            <td style={{color: item.color2}}>{item.area2}</td>
                            <td>
                            <div className="form-group">
                                <input 
                                type="text" 
                                //value={this.state.test}
                                // onChange={this.handleChange}
                                className="form-control" 
                                id={`area2Item${item.id}`} 
                                placeholder=""
                                />
                            </div>
                            </td>
                            <td id={`${item.id}Total`}></td>
                            <td>{item.dailyNeed}</td>
                            <td id={`${item.id}Order`}></td>
                            <td>{item.unitSize}</td>
                        </tr>
                            );
                      })}

			   {/* {this.state.items.map(item => <InventoryForm key={item.id} item={item} keyNumber={item.id} areas={this.state.areas} />)}*/}
              </tbody>  
			</table>
            <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
      );
  }
}
