import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/subreddit/Header';
import Footer from '../components/subreddit/Footer';

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
			axios.get('/posts/categories').then( results => {
			this.setState({categories: results.data});
	  });
	}
	renderResults() {
		if (this.state.categories === []) {
			return
		}
		else {
			return this.state.categories.map( 
					(category) => (						
					<div key={category}>	
            <a href={`/#/listing/${category}`}>{category}</a>
					</div>
			));
		}
	}
	render() {
		return (
		<div>	
			<div className="mainContainer">
			  <Header />
			    <div className="outerContainer">
				  <div className="middleContainer">
				    <div className="container">
					  <div className="jumbotron">
					    <h2><strong>Reddit - React!</strong></h2>
					  </div>
					  <div className="row">
						{/* This code will dump the correct Child Component */}
						{this.props.children}
					  </div>
					  <h4>Categories</h4>
					  <div>
					    {this.renderResults()}
					  </div>
					</div>
				  </div>
				</div>
			</div>
    	    <Footer />
		</div>
		);
	}
}
