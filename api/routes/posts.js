const express = require('express')
const router = express.Router();

const Post = require('../models/post');

router.get('/by-subreddit/:subreddit', (req, res) => {
	let subredditId = req.params.subreddit;
	{/* not sure if I need this yet:  subredditId = subredditId.replace(/ /g, '');*/}

	Post.find({
		subredditId: subredditId
	}).exec((err, results) => {
		if (err) {
			console.log(err);
		}
		else {
		res.json(results);
		}
	});
});

router.post('/by-subreddit/:subreddit', (req, res) => {
	console.log("post route is working, req.body: " + JSON.stringify(req.body));
	let subredditId = req.params.subreddit.toLowerCase();
	subredditId = subredditId.replace(/ /g, '');
	console.log(`subredditID: ${subredditId}`);

	var newPost = new Post(req.body);

	newPost.save(function(error, doc) {
		if (error) {
			res.send(error);
		}
		else {
			console.log(doc);			
		}
	});
});


router.get('/categories', (req, res) => {
	{/*return only the unique subredditId's*/}
	Post.find({}).distinct("subredditId").exec( (error, doc) => {
		if (error) {
			console.log(error);
		}
		else {
		console.log(`doc: ${doc}`);
		res.json(doc);
		}
	});
});

router.get('/comments/:subreddit/:title', (req, res) => {
	console.log("posts/comments/:subreddit/:title get route is working");
	let subredditId = req.params.subreddit.toLowerCase();
	subredditId = subredditId.replace(/ /g, '');
	let title = req.params.title;

	Post.find({
		title: title
	}, (err, results) => {
		res.json(results);
	});
});


module.exports = router;
