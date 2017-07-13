import React, {Component} from "react";
import axios from "axios";

export default class AreaLegend extends Component {
    constructor() {
        super();

        this.state = {
            companyName: "",
            area: "",
            color: "",
            areaColors: []
        };
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
 componentWillReceiveProps() {
    this.props.companyName ?
    axios.get(`/api/area/${this.props.companyName}`).then( results => {
       console.log(`axios get api/area/:companyName working in componentWillReceiveProps AreaLegendEdit, data: ${JSON.stringify(results.data)}`);
           //dynamically create the form options based on the existing areas
            var data = results.data;
            this.setState({areaColors: data});
            
    }) : console.log("this.props.company name not present yet");
 }
 handleClick(event) {
    event.preventDefault();
    console.log(`handleClick has been triggered`);
    console.log(`event.target.id: ${JSON.stringify(event.target.id)}`);
    console.log(`handleClick companyName: ${this.props.companyName}`);

    var confirmDelete = confirm("Are you sure you want to delete this area?\n  You will likely need to also delete any items associated with this area");
    
    if (confirmDelete) {
    axios.delete(`/api/deleteArea/${this.props.companyName}/${event.target.id}`).then( results => {
      console.log(`area deleted`);

      axios.get(`/api/area/${this.props.companyName}`).then( results => {
      this.setState({areaColors: results.data});
      });

    });
   }
 }
render() {
     return (
         <div className="colorLegend2">
           <h5 className="text-center legendTitle"> Color Legend </h5>
            {this.state.areaColors.map( area => {
                return (
                  <div key={area.id}>
                    <div className="row">
                      <div className="col-sm-8" style={{color: area.color}}>{area.area}
                      </div>
                      <div className="col-sm-1">        
                        <button
                          className="btn-default deleteArea text-center"
                          onClick={this.handleClick}
                          id={area.id}
                        >x</button>
                      </div>    
                    </div>  
                  </div>
                );
            })}        
         </div>
     );
  }
}