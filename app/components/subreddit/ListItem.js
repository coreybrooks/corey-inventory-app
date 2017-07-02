import React, { Component } from 'react';

export default class ListItem extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
			reference: ""
		};
	}
	componentDidMount() {
		var temp = `/#/comments/${this.props.post.subredditId}/${this.props.post.title}`;
     	this.setState({reference: temp});
		this.setState({title: this.props.post.title});
	}

	render() {
		if (this.props.post.content) {
			return (
				<div>
					<h4><a href={this.state.reference}>{this.props.post.title}</a></h4>
					<p>{this.props.post.content}</p>
				</div>
			);
	    }
		else {
			return <div></div>
		}
	}
}
