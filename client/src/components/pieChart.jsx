import React, { Component } from 'react';
import CanvasJSReact from "../canvasjs.react";
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  render() {
    const { catPercents, totalNumItems, totalPriceItems } = this.props;
    const itemFormat = (totalNumItems === 1) ? "item" : "items";
   
    const options = {
      animationEnabled: true,
      title: {
        text: "Totals",
        fontFamily: "Roboto, sans-serif",
        fontSize: "20",
        fontWeight: 500,
        lineHeight: 1.2,
      },
      subtitles: [
        {
          text: `${totalNumItems} ${itemFormat}: $${totalPriceItems}`,
          verticalAlign: "center",
          fontSize: 24,
          // fontFamily: "Roboto, sans-serif",
          fontWeight: "bold",
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          // indexLabel: "{name}: {y}",
          indexLabel: "",
          yValueFormatString: "#,###'%'",
          // yValueFormatString: "#,###",
          dataPoints: catPercents,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart
          options={options}
          onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default PieChart;
