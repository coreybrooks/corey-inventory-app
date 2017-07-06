import React, { Component } from 'react';

export default class ListItem extends Component {
	constructor() {
		super();

		this.state = {
			item: [],
		};
	}
	componentDidMount() {
     	this.setState({item: this.props.item});
         console.log(`InventoryForm mounted, item: ${this.state.item}`);
	}

	render() {
			return (
				<tr>
				 <td>{this.state.id}</td>
				 <td>{this.state.item}</td>
				 <td>{this.state.area1}</td>
				 <td id={`${this.state.id}-count1`}></td>
				 <td>{this.state.area2}</td>
				 <td id={`${this.state.id}-count2`}></td>
				 <td id={`${this.state.id}-total`}></td>
				 <td>{this.state.dailyNeeds}</td>
				 <td id={`${this.state.id}-order`}></td>
				 <td>{this.state.unitSize}</td>
				</tr>
			);
	}
}
