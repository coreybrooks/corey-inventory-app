import React, {Component} from "react";
import axios from "axios";

export default class AreaLegend extends Component {
    constructor() {
        super();

        this.state = {
            companyName: "",
            area: "",
            color: ""
        };
    }
componentDidMount() {
    console.log(`this.props.companyName for AreaLegend: ${this.props.companyName}`);
    this.setState({companyName: this.props.companyName});
    //axios request to get the existing areas and colors for this company
    axios.get(`/api/area/${this.props.companyName}`).then( results => {
       console.log(`axios get api/area working in componentDidMount AreaLegend, data: ${JSON.stringify(results.data)}`);
       var data = results.data;
       //dynamically create the form options based on the existing areas

       for(var i=0;i<data.length;i++) {
         var area = $("<div>");
         area.text(data[i].area);
         var color = $("<div>");
         area.attr("style", `color:${data[i].color}`);
         $(".areaName").append(area);
       }
    });
 }
 render() {
     return (
         <div className="colorLegend">
             <h5 className="text-center legendTitle"> Color Legend </h5>
             <div className="areaName"></div>
         </div>

     );
 }
}