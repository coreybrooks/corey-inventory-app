import React, { Component } from 'react';

import axios from 'axios';
import CommentItem from './CommentItem';
import CommentForm from "./CommentForm";
import Header from "./Header";
import Footer from "./Footer";

export default class Comments extends Component {
	constructor() {
		super();

		this.state = {
			posts: [],
            subredditId: "",
            postTitle: "",
            postContent: "",
            comments: ""
		}
	}

	componentDidMount() {
		axios.get('/posts/comments/' + this.props.params.subredditId + "/" + this.props.params.title).then(posts => {

            this.setState({ posts: posts.data });
            this.setState({ postTitle: posts.data[0].title});
            this.setState({ postContent: posts.data[0].content});
		});
	}
	setTerms(data) {
		var subredditId = data.subredditId;
		var title = data.title;
		var content = data.content;
		var comments = data.comments;
		var name = data.name;
		console.log(`setTerms is working, data: ${subredditId}, ${title}, ${content}, ${comments}, ${name}`);
		axios.post('/posts/by-subreddit/' + data.subredditId, data);		
	}
	render() {
		return (
			<div>
			<Header />
			<div className="outerContainer">
			  <div className="middleContainer">
				<div className="container">	
					<CommentForm 
					setTerms={this.setTerms} 
					subredditId={this.props.params.subredditId}
					title={this.state.postTitle}
					content={this.state.postContent}
					/>
						<h5 className="	">Post content:</h5>
						<h6>{this.state.postContent}</h6>
                        <hr/>
						<h4>Comments:</h4>
					<ul>
						{this.state.posts.map(post => <CommentItem key={post._id} post={post} />)}
					</ul>
				</div>
			  </div>
			</div>
			<Footer />
			</div>
		);
	}
}
