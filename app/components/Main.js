import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/inventory/Header';
import Footer from '../components/inventory/Footer';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			categories: []
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.renderResults = this.renderResults.bind(this);
	}
	componentDidMount() {
		console.log(`main component mounted`);
			{/*axios.get('/posts/categories').then( results => {
			this.setState({categories: results.data}); 
	  }); stuff from reddit */}
	}
	renderResults() {
		{/*if (this.state.categories === []) {
			return
		}
		else {
			return this.state.categories.map( 
					(category) => (						
					<div key={category}>	
            <a href={`/#/listing/${category}`}>{category}</a>
					</div>
			));
		} stuff from reddit*/}
	}
	render() {
		return (
		<div>
		   <div className="mainContainer">
		     <Header />

			 {this.props.children}

    	     <Footer />
		   </div>
		</div>
		);
	}
}
