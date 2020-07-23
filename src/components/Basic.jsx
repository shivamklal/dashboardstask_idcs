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
                            // get unique group names
                            let labelIndex = 0 // manages index of array of unique group names, incremented only when a new name is found
                            let uniqueGroup = ""
                            let currentGroup = ""
                            //let uniqueUser = ""
                            //let currentUser = ""
                            let allGroups = ["", "", ""]
                            let allUsers = [0, 0, 0]
                            let userCount = 0
                            let datasetupdate = [{
                                data: [23, 36, 15],
                                backgroundColor: ['red', 'blue', 'green']
                            }]
                            for(let i = 0; i < this.state.allDataArray.length; i++){
                                // find the first group name
                                let commInd = this.state.allDataArray[i].indexOf(",") // position of comma to get position of end of group name
                                //let retInd = this.state.allDataArray[i].indexOf("\n")
                                currentGroup = this.state.allDataArray[i].slice(0,commInd)
                                //currentUser = this.state.allDataArray[i].slice(commInd + 1, retInd)

                                if(i === 0){ // stores the first group name
                                    uniqueGroup = currentGroup
                                    allGroups[labelIndex] = uniqueGroup
                                    //uniqueUser = currentUser
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
                                datasets: datasetupdate
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