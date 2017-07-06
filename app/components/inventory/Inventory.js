import React, {Component} from "react";
import axios from "axios";
import InventoryForm from "./InventoryForm";
import AreaLegend from "./AreaLegend";

export default class Inventory extends Component {
   constructor() {
       super();

       this.state = {
           items: [],
           companyName: ""
           
       };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.getData = this.getData.bind(this);
   }

  componentDidMount() {
      console.log(`Inventory component mounted`);
      this.setState({companyName: this.props.params.companyName});
      this.getData();
  }
  getData() {
      axios.get(`/api/items/${this.state.companyName}`).then( results => {
        console.log(`axios get api/items working in componentDidMount Inventory, data: ${JSON.stringify(results.data)}`);
        this.setState({items: results.data});
      });
  }
  componentWillReceiveProps(nextProps) {
		if (this.props.params.item !== nextProps.params.item) {
			axios.get(`/api/items/${this.props.params.companyName}`).then(results => {
				this.setState({ items: results.data });
			});
		}
  }
  setTerms(data) {

  }
  render() {
      return (
          <div className="inventoryContainer">
            <AreaLegend companyName={this.props.params.companyName} />
            <h3>{this.props.params.companyName} Inventory</h3>            
    		<table className="table table-striped table-bordered table-responsive">
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
              <tbody>
			    {this.state.items.map(item => <InventoryForm key={item.id} item={item} />)}
              </tbody>  
			</table>
          </div>
      );
  }
}
