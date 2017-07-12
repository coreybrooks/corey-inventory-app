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
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
 componentWillReceiveProps() {
    this.props.companyName ?
    axios.get(`/api/area/${this.props.companyName}`).then( results => {
       console.log(`axios get api/area/:companyName working in componentWillReceiveProps AreaLegend, data: ${JSON.stringify(results.data)}`);
           //dynamically create the form options based on the existing areas
            var data = results.data;
            $(".areaName").empty();

            for(var i=0;i<data.length;i++) {
                var area = $("<div>");
                area.text(data[i].area);
                var color = $("<div>");
                area.attr("style", `color:${data[i].color}`);
                $(".areaName").append(area);
            }
    }) : console.log("this.props.company name not present yet");
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