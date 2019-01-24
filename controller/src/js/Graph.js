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
        const xaxis = ['', 'Front Left', '', 'Front Right', '', 'Back Left', '', 'Back Right', ''];
        let scale_settings = this.props.scale_settings;
        if (scale_settings.length < 1) {
            scale_settings = [1, 1, 1, 1, 1];
        }

        const BarSeries = VerticalBarSeriesCanvas; // : VerticalBarSeries;
        const graphData = [
            { x: 2, y: scale_settings[1] },
            { x: 4, y: scale_settings[2] },
            { x: 6, y: scale_settings[3] },
            { x: 8, y: scale_settings[4] }
        ];
        const totalWeight = scale_settings[1] + scale_settings[2] + scale_settings[3] + scale_settings[4];
        return (
            <div>
                <XYPlot
                    yDomain={[0, 660]}
                    width={500}
                    height={400}
                    stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickFormat={(v, i) => v % 2 == 0 ? xaxis[i] : ``} tickLabelAngle={0} />
                    <YAxis />
                    <BarSeries
                        data={graphData} />
                </XYPlot>
                <div style={{ textAlign: 'center' }}>
                    Total: {totalWeight}
                </div>
            </div>
        );
    }
}


export default Graph;