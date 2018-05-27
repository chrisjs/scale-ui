import React from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas
} from 'react-vis';

class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let scale_settings = this.props.scale_settings;
        if (scale_settings.length < 1) {
            scale_settings = [100, 100, 100, 100, 100];
        }
        console.log("SCALE: " + JSON.stringify(scale_settings));
        const BarSeries = VerticalBarSeriesCanvas; // : VerticalBarSeries;
        const graphData = [
            { x: 2, y: scale_settings[1] / 100 },
            { x: 4, y: scale_settings[2] / 100 },
            { x: 6, y: scale_settings[3] / 100 },
            { x: 8, y: scale_settings[4] / 100 }
        ];
        return (
            <div>
                <XYPlot
                    width={500}
                    height={400}
                    stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <BarSeries
                        data={graphData} />
                </XYPlot>
            </div>
        );
    }
}


export default Graph;