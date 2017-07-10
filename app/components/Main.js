import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../components/inventory/Footer';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			categories: []
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount() {
		console.log(`main component mounted`);
	}
	render() {
		return (
		<div>
		   <div className="mainContainer">

			 {this.props.children}

    	     <Footer />
		   </div>
		</div>
		);
	}
}
