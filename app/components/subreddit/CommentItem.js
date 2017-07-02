import React, { Component } from 'react';

export default class CommentItem extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
            comments: "",
			name: "",
			date: "",
			commentsDiv: ""
		};

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.makeCommentsDiv = this.makeCommentsDiv.bind(this);

	}
	makeCommentsDiv(data) {
		this.setState({commentsDiv: data});	
	}

	componentWillReceiveProps() {
		this.setState({title: this.props.post.title});
        this.setState({comments: this.props.post.comments});
		this.setState({name: this.props.post.name});
		this.setState({date: this.props.post.date});

		{/*below sets up makeCommentsDiv to return the collection only if it includes a comment*/}
		var commentDiv = <div>
			               <p>{this.state.comments}</p>
   				           <p> -- {this.state.name}: {this.state.date.substring(0,10)}</p>
						   <p>-=-=-=-=-=-=-=-=-=-=-=</p>
						</div>;

	 	{this.props.post.comments ? this.makeCommentsDiv(commentDiv) : {}};							

	}

	render() {
		return (
            <div>
					{this.state.commentsDiv}
            </div>
		);
	}
}
