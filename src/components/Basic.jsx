import React, { Component } from "react";
import {Bar, Pie} from 'react-chartjs-2';
import testdata from './testdata.txt';

class Basic extends Component{

    constructor(props) {
        super(props);
        this.state = {
            labels: ["", "", ""],
            piedatasets: [{
                data: [23, 36, 15],
                backgroundColor: ['red', 'blue', 'green']
            }],
            bardatasets: [{
                data: [23,36,15],
                backgroundColor: ['red', 'blue', 'green'],
                borderWidth: 1, borderColor: 'black', barThickness:150
            }],
            barlabels: ["CatA", "CatB", "CatC"]
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

                <p1>Pie Representation</p1>

                <Pie data={{
                    labels:this.state.labels,
                    datasets: this.state.piedatasets
                }} height={50}
                     onClick={() => this.pieClick({testdata})}
                />

                <br/>

                <p1>Bar Representation</p1>
                <Bar data={{
                    labels: this.state.barlabels,
                    datasets: this.state.bardatasets
                }}
                    height={75}
                />
                <br/>

            </div>
        );
    }

    pieClick = (dataArray) => {
        console.log(dataArray);
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
                            // get unique group names
                            let labelIndex = 0 // manages index of array of unique group names, incremented only when a new name is found
                            let uniqueGroup = ""
                            let currentGroup = ""
                            let allGroups = ["", "", ""]
                            let allUsers = [0, 0, 0]
                            let userCount = 0
                            let datasetupdate = [{
                                data: [23, 36, 15],
                                backgroundColor: ['red', 'blue', 'green', 'yellow']
                            }]
                            for(let i = 0; i < this.state.allDataArray.length; i++){
                                // find the first group name
                                let commInd = this.state.allDataArray[i].indexOf(",") // position of comma to get position of end of group name
                                currentGroup = this.state.allDataArray[i].slice(0,commInd)

                                if(i === 0){ // stores the first group name
                                    uniqueGroup = currentGroup
                                    allGroups[labelIndex] = uniqueGroup
                                }

                                if(currentGroup !== uniqueGroup){
                                    allUsers[labelIndex] = userCount
                                    labelIndex = labelIndex + 1
                                    userCount = 0
                                    uniqueGroup = currentGroup
                                    allGroups[labelIndex] = uniqueGroup
                                }

                                userCount = userCount + 1

                            }

                            allUsers[labelIndex] = userCount

                            this.setState({
                                labels: allGroups
                            });

                            datasetupdate[0].data = allUsers

                            this.setState({
                                piedatasets: datasetupdate
                            });

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