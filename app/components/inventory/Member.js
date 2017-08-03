import React, {Component} from 'react';
import axios from "axios";
import NewAreaForm from "./NewAreaForm";
import ItemForm from "./ItemForm";
import AreaLegendEdit from "./AreaLegendEdit";
import Header from "./Header";

export default class Member extends Component {
    constructor() {
        super();

        this.state= {
            memberName: "",
            areaColors: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.inventoryRedirect = this.inventoryRedirect.bind(this);
        this.setTerms = this.setTerms.bind(this);
        this.render = this.render.bind(this);
    }
setTerms(data) {
  console.log(`setTerms data: ${JSON.stringify(data)}`);
  this.setState({areaColors: data});
}
componentDidMount() {
    this.setState({memberName: this.props.params.companyName});
    axios.get(`/api/area/${this.props.params.companyName}`).then( results => {
       console.log(`axios get api/area/:companyName working in componentDidMount Member, data: ${JSON.stringify(results.data)}`);
       this.setState({areaColors: results.data});
       console.log(`within componentDidMount this.state.areaColors: ${JSON.stringify(this.state.areaColors)}`);
    });
}
inventoryRedirect() {
    window.location.replace(`/#/inventory/${this.state.memberName}`);
}
render() {
    return (
      <div>
        <Header companyName={this.props.params.companyName}/>
        <div className="container">
          <div className="modal fade" id="myModal2" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 className="modal-title title2">Instructions</h4>
                </div>
                <div className="modal-body">
                  <p>
                      1) Create inventory areas in the Create New Area form<br/>
                      • assign one color per area<br/><br/>
                      2) Create inventory items in the Create New Item form<br/>
                      • designate the areas where the item is located<br/>
                      • Items that are in more than two areas can be listed multiple times<br/><br/>
                      3) Begin inventory<br/>
                      • Items can be deleted from the inventory form in the next section
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 memberContainer">
              <button type="button" className="btn-default instructionsButton2">Instructions</button>
              <h2 className="text-center">Welcome <span>{this.state.memberName}</span></h2>
              <hr className="headRow"/>
              <div className="col-sm-6">
                <div className="row">
                  <div className="">   
                    <AreaLegendEdit 
                    companyName={this.state.memberName}
                    areaColors={this.state.areaColors} 
                    />
                  </div> 
                </div>

                <div className="row">
                  <div className="newAreaFormDiv">    
                    <NewAreaForm 
                    companyName={this.props.params.companyName}
                    setTerms={this.setTerms} 
                    />
                  </div>  
                </div>
              </div>
              <div className="col-sm-6 newItemDiv">
                <ItemForm 
                companyName={this.props.params.companyName}
                areaColors={this.state.areaColors} 
                />
              </div>
            </div>
          </div>
            <button onClick={this.inventoryRedirect} className="btn inventoryButton">
              Begin inventory
            </button>
        </div>
      </div>  
    );
 }
}