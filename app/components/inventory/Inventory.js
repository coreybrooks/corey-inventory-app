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
      axios.get(`/api/area/${this.props.companyName}`).then( results => {
       this.setState({areas: results.data});
       //dynamically create the form options based on the existing areas
    });
  }
  /*componentWillReceiveProps(nextProps) {
		if (this.props.params.item !== nextProps.params.item) {
			axios.get(`/api/items/${this.props.params.companyName}`).then(results => {
				this.setState({ items: results.data });
			});
		}
  }*/
  setTerms(data) {

  }
  render() {
      return (
          <div className="inventoryContainer">
            <AreaLegend companyName={this.props.params.companyName} />
            <form className="tableForm" onSubmit={this.handleSubmit}>
            <h3 className="text-center">{this.props.params.companyName} Inventory</h3>            
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
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.item}</td>
                            <td>{item.area1}</td>
                            <td>
                            <div className="form-group">
                                <input 
                                type="text" 
                                value={this.state.test}
                                onChange={this.handleChange}
                                className="form-control" 
                                id="test" 
                                placeholder=""
                                />
                            </div>
                            </td>
                            <td>{item.area2}</td>
                            <td>
                              <div className="form-group">
                                <input 
                                type="text" 
                                value={`${this.state}.item${item.id}Count2`}
                                onChange={this.handleChange}
                                className="form-control" 
                                id={`item${item.id}Count2`} 
                                placeholder=""
                                />
                              </div>
                            </td>
                            <td id={`${item.id}Total`}></td>
                            <td>{item.dailyNeeds}</td>
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
