import React, {Component} from "react";
import axios from "axios";
import InventoryForm from "./InventoryForm";
import AreaLegend from "./AreaLegend";
import HeaderTable from "./HeaderTable";

export default class Inventory extends Component {
   constructor() {
       super();

       this.state = {
           items: [],
           companyName: "",
           
       };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
   }
  handleChange(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  handleSubmit(event) {
    event.preventDefault();
    window.print();
  }
  componentDidMount() {
      console.log(`ResultsTable component mounted`);
      console.log("inventory" + this.props.params.companyName);
      this.setState({companyName: this.props.params.companyName});
      //axios request to get items
      axios.get(`/api/table/${this.props.params.companyName}/${this.props.params.date}`).then( results => {
        console.log(`axios get api/table/:companyName/:date working in componentDidMount ResultsTable, data: ${JSON.stringify(results.data)}`);
        this.setState({items: results.data});
        $("#dateSpan").html(results.data[0].date);
    });
  }
  render() {
      return (
        <div>
          <HeaderTable companyName={this.props.params.companyName} />
          <div className="inventoryContainer">
            <form className="tableForm" onSubmit={this.handleSubmit}>
              <h2 className="text-center">{this.props.params.companyName} Inventory</h2> 
              <hr className="headRow"/>
              <div><h4>Date: <span id="dateSpan"></span></h4></div>
              <table className="table table-striped table-bordered table-responsive table-compact">
                <thead>
                  <tr>
                    <th>Item #</th>
                    <th>Item</th>
                    <th>Count 1</th>
                    <th>Count 2</th>
                    <th>Total</th>
                    <th>Daily Need</th>
                    <th>Total Days</th>
                    <th>Order</th>
                    <th>Unit Size</th>
                  </tr>
                </thead>
                <tbody className="inventoryTable">

                  {this.state.items.map(item => <InventoryForm key={item.id} item={item} />)}

                </tbody>  
    		  </table>
              <button type="submit" className="btn btn-primary">Make PDF</button>
            </form>
          </div>
        </div>  
      );
  }
}
