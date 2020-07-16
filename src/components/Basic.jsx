import React, { Component } from "react";
import {Pie} from 'react-chartjs-2';
import testdata from './testdata.txt';

class Basic extends Component{

    constructor(props) {
        super(props);
        this.state = {
            labels: ['Group A', 'Group B', 'Group C'],
            datasets: [{
                data: [23, 36, 15],
                backgroundColor: ['red', 'blue', 'green']
            }]
        }
    }

    componentWillMount() {
        this.readData = this.readData.bind(this);
        this.readData(testdata);
    }

    render() {
        return(
            <div>
                <h1>Group Details Chart</h1>
                <Pie data={{
                    labels:this.state.labels,
                    datasets: this.state.datasets
                }}
                     height={50}
                />
                <br/>
            </div>
        );
    }

    readData = file => {
        console.log('reading data...')
        console.log(testdata) // only outputs file name

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0) {
                    var allText = rawFile.responseText;
                    console.log(allText);
                    this.setState({
                        sampleData: allText
                    });
                }
            }
        };
        rawFile.send(null);
    }
}

export default Basic;