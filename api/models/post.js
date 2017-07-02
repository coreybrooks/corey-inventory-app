const mongoose = require('mongoose');

const Post = new mongoose.Schema({
	subredditId: {
    	type: String,
		trim: true
	},
	title: {
        type: String
	},
	comments: {
		type: String
	},
	content: {
		type: String
	},
	name: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}

});

module.exports = mongoose.model('post', Post);
