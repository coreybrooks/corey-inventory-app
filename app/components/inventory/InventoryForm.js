import React, { Component } from 'react';

export default class InventoryForm extends Component {
	constructor() {
		super();

		this.state = {
			item: [],
		};
	}
	componentDidMount() {
     	this.setState({item: this.props.item});
         console.log(`InventoryForm mounted, item: ${JSON.stringify(this.props.item)}`);
         console.log(`InventoryForm, this.state.item: ${this.state.item}`);
	}

	render() {
			return (
				<tr>
					<td>{this.state.item.itemNumber}</td>
					<td>{this.state.item.item}</td>
					<td>{this.state.item.area1}</td>
					<td>{this.state.item.area2}</td>
					<td>{this.state.item.total}</td>
					<td>{this.state.item.dailyNeed}</td>
					<td>{this.state.item.numberOfDays}</td>
					<td>{this.state.item.order}</td>
					<td>{this.state.item.unitSize}</td>
				</tr>
			);
	}
}
