# Corey's React | Reddit Project

## Overview
This is a Reddit style application that allows users to make posts about topics of their choosing.  They can also create new categories and leave comments about existing posts.   This is a full MERN Stack application. 

### Routing

#### Express Routes
The following requests are routed with Express and Node.js:  
* ”/by-subreddit/:subreddit” GET route retrieves the saved documents from the posts collection in MongoDB using Mongoose.  The saved documents are returned to the Main component where they are dynamically rendered into the Listing component.
* ”/by-subreddit/:subreddit” POST route saves the new post into MongoDB.
* ”/categories” GET route returns only unique post titles to be rendered in the categories section on the Main component.
* ”comments/:subreddit/:title” GET route is called when the Comments component is mounted in order to retrieve and render the existing comments for each post.

#### React Routes
The following paths are routed using the React router methodology:
* “/add” renders the CategoryForm component as a child of the Main component to add new categories when the "Add New Category" link is selected.
* ”/listing/:subredditId” renders the Listing component as a child of the Main component when a category is selected.  The Listing component displays the current posts for the given category, and renders the Form component to add new posts to the category.


### Components 
* Main Component:  The Main component is the React parent component, it renders the CategoryForm, Listing, ListItems, and Form components as children.
* Listing Component: The Listing component renders the ListItems and Form components as children.  The Listing component uses the ListItems component to dynamically render the unique post titles from MongoDB within a given category.   The post titles can be selected to render the Comment components.
* Comment Component:  The Comment component renders the CommentItem and CommentForm components.  The Comment component uses the CommentItems component to dynamically render the comments for each post.  Users can leave new comments using the CommentForm component.
* Header and Footer components are rendered on each page.

This application is deployed on Heroku and can be viewed here: [coreys-reddit-react-project](https://coreys-reddit-react-project.herokuapp.com/)
