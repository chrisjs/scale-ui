import React from "react";
import {
    RadarChart,
    CircularGridLines
} from 'react-vis';

const DOMAIN = [
    { name: 'left_front', domain: [0, 400] },
    { name: 'left_rear', domain: [0, 400] },
    { name: 'right_rear', domain: [0, 400] },
    { name: 'right_front', domain: [0, 400] }
];

class Radar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let scale_settings = this.props.scale_settings;
        if (scale_settings.length < 1) {
            scale_settings = [100, 100, 100, 100, 100];
        }
        const data = [{
            left_front: scale_settings[1] / 100,
            left_rear: scale_settings[2] / 100,
            right_rear: scale_settings[3] / 100,
            right_front: scale_settings[4] / 100
        }];
        return (
            <div className="centered-and-flexed">
                <RadarChart
                    animation
                    data={data}
                    domains={DOMAIN}
                    style={{
                        polygons: {
                            fillOpacity: 0,
                            strokeWidth: 3
                        },
                        axes: {
                            text: {
                                opacity: 1
                            }
                        },
                        labels: {
                            textAnchor: 'middle'
                        }
                    }}
                    margin={{
                        left: 30,
                        top: 30,
                        bottom: 40,
                        right: 50
                    }}
                    tickFormat={t => ''}
                    width={500}
                    height={300} >
                    <CircularGridLines tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)} />
                </RadarChart>
            </div>
        );
    }
}


export default Radar;