import React, { Component } from "react";
import {Pie} from 'react-chartjs-2';
import testdata from './testdata.txt';

class Basic extends Component{

    constructor(props) {
        super(props);
        this.state = {
            labels: ["", "", ""],
            datasets: [{
                data: [23, 36, 15],
                backgroundColor: ['red', 'blue', 'green']
            }]
        }
    }

    componentDidMount() {
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
                    let allText = rawFile.responseText;
                    this.setState({
                        sampleData: allText
                    }, function () {
                        this.setState({
                            allDataArray: this.state.sampleData.split("\n")
                        }, function () {
                            console.log(this.state.allDataArray);
                            // get unique group names
                            let labelIndex = 0 // manages index of array of unique group names, incremented only when a new name is found
                            let uniqueGroup = ""
                            let currentGroup = ""
                            for(let i = 0; i < this.state.allDataArray.length; i++){
                                // find the first group name
                                let endInd = this.state.allDataArray[i].indexOf(",") // position of comma to get position of end of group name
                                currentGroup = this.state.allDataArray[i].slice(0,endInd)

                                if(i === 0){ // stores the first group name
                                    uniqueGroup = currentGroup
                                    this.state.labels[labelIndex] = uniqueGroup
                                }

                                if(currentGroup !== uniqueGroup){
                                    labelIndex = labelIndex + 1
                                    uniqueGroup = currentGroup
                                    this.state.labels[labelIndex] = uniqueGroup
                                }

                            }

                            console.log(this.state.labels)
                        });
                    });
                }
            }
        };
        rawFile.send(null);
    }

    // how to pass parameters from one function to another in reactJS

}

export default Basic;