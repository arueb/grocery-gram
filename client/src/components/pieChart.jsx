import React, { Component } from 'react';
import CanvasJSReact from "../canvasjs.react";
import { getColor } from "../services/itemService";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  render() {
    const { catPercents, totalNumItems, totalPriceItems,
      colorSetArray } = this.props;
    // const priceFormatted = totalPriceItems.toFixed(2);
   
    CanvasJS.addColorSet("grocerygram", colorSetArray);
    const options = {
      animationEnabled: true,
      title: {
        text: "Totals",
      },
      subtitles: [
        {
          text: `${totalNumItems} items: $${totalPriceItems}`,
          verticalAlign: "center",
          fontSize: 24,
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
