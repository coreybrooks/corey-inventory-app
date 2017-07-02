import React, {Component} from "react"

export default class CommentForm extends Component {
    constructor() {
        super();

        this.state = {
            subredditId: "",
            title: "",
            content: "",
            comments: "",
            name: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
componentWillReceiveProps() {
  this.setState({subredditId: this.props.subredditId});
  this.setState({title: this.props.title});

}
handleChange(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
}
handleSubmit(event){
  console.log("handleSubmit is working");
  event.preventDefault();
  this.props.setTerms(this.state);
  this.setState({subredditId: "", title: "", content: "", comments: "", name: ""});
  location.reload();
}
render() {
    return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <h4 className="text-center">- Subreddit Category: {this.state.subredditId} -</h4>
              <h3>Post title: {this.props.title}</h3>    
              <div className="panel commentPanel">
                <div className="panel-heading">
                  <h3 className="text-center">Comment Section</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">                          
                        <h5>New Comments</h5>    
                        <input
                         type="string" 
                         value={this.state.comments}
                         className="form-control"
                         id="comments"
                         rows="3"
                         onChange={this.handleChange}
                         />
                        <h5>Name</h5>    
                        <input
                         type="string" 
                         value={this.state.name}
                         className="form-control"
                         id="name"
                         onChange={this.handleChange}
                         />

                        <button 
                        className="btn"
                        id="submitButton"
                        type="submit"
                        >SUBMIT</button>
                       </div>
                      </form>   
                 </div>
              </div>              
            </div>  
          </div>
        </div>

    );

  }
}