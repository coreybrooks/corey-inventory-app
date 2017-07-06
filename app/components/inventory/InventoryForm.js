import React, { Component } from 'react';

export default class InventoryForm extends Component {
	constructor() {
		super();

		this.state = {
			item: [],
            areas: []
		};
	}
	componentDidMount() {
     	this.setState({item: this.props.item});
        this.setState({areas: this.props.areas});
         console.log(`InventoryForm mounted, item: ${JSON.stringify(this.props.item)}`);
         console.log(`InventoryForm, this.state.item: ${this.state.item}`);
	}

	render() {
			return (
				<tr>
				 <td>{this.state.item.id}</td>
				 <td>{this.state.item.item}</td>
				 <td>{this.state.item.area1}</td>
				 <td>
                  <div className="form-group">
                    <input 
                    type="text" 
                    value={`${this.state}.item${this.props.keyNumber}Count1`}
                    onChange={this.handleChange}
                    className="form-control" 
                    id={`item${this.props.keyNumber}Count1`} 
                    placeholder=""
                    />
                  </div>
                 </td>
				 <td>{this.state.item.area2}</td>
				 <td id={`${this.state.item.id}-count2`}></td>
				 <td id={`${this.state.item.id}-total`}></td>
				 <td>{this.state.item.dailyNeeds}</td>
				 <td id={`${this.state.item.id}-order`}></td>
				 <td>{this.state.item.unitSize}</td>
				</tr>
			);
	}
}
