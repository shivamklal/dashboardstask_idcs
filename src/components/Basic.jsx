import React, { Component } from "react";
import {Pie} from 'react-chartjs-2';

class Basic extends Component{

    constructor(props) {
        super(props);
        this.readData();
        this.state = {
            labels: ['Group A', 'Group B', 'Group C'],
            datasets: [{
                data: [23, 36, 15],
                backgroundColor: ['red', 'blue', 'green']
            }]
        }
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

    readData() {
        console.log('reading data...')
        // found this on stackoverflow from someone else that was using react
        /*fetch('/testdata.txt')
            .then((r) => r.text())
            .then(text => {
                console.log(text);
            })*/

        // node has this fs library but it won't work??
        /*const fs = require('fs')
        fs.readFile('testdata.txt', (err, data) => {
            if (err) throw err;
            console.log(data.toString());
        })*/
    }
}

export default Basic;