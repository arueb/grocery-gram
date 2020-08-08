import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  render() {
    const { catPercents } = this.props;

    const options = {
      animationEnabled: true,
      data: [
        {
          type: "doughnut",
          yValueFormatString: "#,###'%'",
          dataPoints: catPercents,
        },
      ],
    };
    return (
      <div className="pie-chart-container">
        <CanvasJSChart
          options={options}
          // onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default PieChart;
