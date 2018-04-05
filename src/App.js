import React, { Component } from 'react';
import logo from './logo.jpg';
import gitlogo from './github-logo.png';
import './App.css';
import 'react-taco-table/dist/react-taco-table.css';
import { TacoTable, DataType, Formatters } from 'react-taco-table';
import Request from 'react-http-request';

import ReactTable from "react-table";
import "react-table/react-table.css";


class App extends Component {
    getParam(){
        const query = new URLSearchParams(window.location.search);
        const value = query.get('project');
        return value;
    }
    render() {
        const appStyle = {
            maxWidth : "100%",
            overflow : "hidden"
        }
        return (
            <div style={appStyle}>
                <header className="App-header" >
                    <img src={logo} align="left" className="App-logo" alt="logo" />
                    <h1 className="App-title" >GitHub Project Card Tracker</h1>
                </header>
                {/*<Request url={"http://10.100.1.11:9094/githubProjectCardTracker/dashboard/?project="+this.getParam()} method='get' accept='json'>*/}
                <Request url={"https://identity-gateway.cloud.wso2.com/t/wso2internalstg/gitprojcardtracker/getcards?project="+this.getParam()} method='get' accept='json'>
                    {
                        ({error, result, loading}) => {
                            if (loading) {
                                return <div align="center"><p align="center">loading...</p></div>;
                            } else {
                                return <div align="left">
                                    <header className={"App-header1"} >
                                        <div align="center">
                                            <table>
                                                <tr>
                                                    <td width="33%">
                                                        <table>
                                                            <td align="center">
                                                                <tr>
                                                                    <div align="center" className="cardheader1">
                                                                        Number of non moving cards
                                                                    </div>
                                                                </tr>
                                                                <tr>
                                                                    <div align="center" className="card">
                                                                        {result.body.count}

                                                                    </div>
                                                                </tr>
                                                            </td>
                                                        </table>

                                                    </td>
                                                    <td width="33%">
                                                        <div className="image">
                                                            <img src={gitlogo} height="170pt"/>
                                                        </div>
                                                    </td>
                                                    <td width="33%">
                                                        <table>
                                                            <td align="center">
                                                                <tr>
                                                                    <div className="cardheader2">
                                                                        Last update threshold (Days)
                                                                    </div>
                                                                </tr>
                                                                <tr>
                                                                    <div align="center" className="card">
                                                                        {result.body.threshold}
                                                                    </div>
                                                                </tr>
                                                            </td>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </header>
                                    <div >{ this.getParam()===null ||
                                    <table className={"tableClass"}>
                                        <tr>
                                            <td width="20%">
                                                <h3 className="intro"> Filtered by Project : </h3>
                                            </td>
                                            <td width="70%" align="left">
                                                <h3 align="left" color={"#000000"}> {this.getParam().replace("%20"," ")} </h3>
                                            </td>
                                            <td align="right" width="50%">
                                                <a href="https://identity-gateway.cloud.wso2.com/t/wso2internalstg/gitprojcardtracker/" align="left">
                                                    <button type="button" color={"#ffffff"}>See all</button>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>}
                                    </div>
                                    <div className={"tableClass"}>{ this.getParam()===null &&
                                    <h2 className="intro"> Following project cards have not been updated recently,</h2>}
                                    </div>
                                    <ReactTable className={"tableClass"}
                                                filterable
                                                columns={[
                                                    {
                                                        id: 'PROJECT',
                                                        type: DataType.String,
                                                        Header: 'Project',
                                                        width:200,
                                                        accessor:d => (
                                                            <a>
                                                                {d.PROJECT}
                                                            </a>
                                                        ),
                                                        filterMethod: (filter,row) => {
                                                            var a = row[filter.id].props.children.toLowerCase();
                                                            return a.includes(filter.value.toLowerCase());
                                                        }

                                                    },
                                                    {
                                                        id: 'STATE',
                                                        type: DataType.String,
                                                        Header: 'State',
                                                        width:150,
                                                        accessor:d => (
                                                            <a>
                                                                {d.STATE}
                                                            </a>
                                                        ),
                                                        filterMethod : (filter,row) => {
                                                            var a = row[filter.id].props.children.toLowerCase();
                                                            return a.includes(filter.value.toLowerCase());
                                                        }
                                                    },
                                                    {
                                                        id: 'TASK',
                                                        type: DataType.String,
                                                        Header: 'Task',
                                                        width:650,
                                                        accessor:d => (
                                                            <a href={d.URL} target="_blank">
                                                                {d.TASK}
                                                            </a>
                                                        ),
                                                        filterable : false,
                                                    },
                                                    {
                                                        id: 'USER',
                                                        type: DataType.String,
                                                        Header: 'User',
                                                        accessor:d => (
                                                            <a>
                                                                {d.USER}
                                                            </a>
                                                        ),
                                                        filterMethod : (filter,row) => {
                                                            var a = row[filter.id].props.children.toLowerCase();
                                                            return a.includes(filter.value.toLowerCase());
                                                        }
                                                    },
                                                    {
                                                        id: 'CREATED',
                                                        type: DataType.String,
                                                        Header: 'Created',
                                                        width:200,
                                                        accessor:d => (
                                                            <a>
                                                                {d.CREATED}
                                                            </a>
                                                        ),
                                                        filterable : false,
                                                    },
                                                    {
                                                        id: 'UPDATED',
                                                        type: DataType.String,
                                                        Header: 'Last Update',
                                                        width:200,
                                                        accessor:d => (
                                                            <a>
                                                                {d.UPDATED}
                                                            </a>
                                                        ),
                                                        filterable : false,
                                                    },
                                                    {
                                                        id: 'DELAY',
                                                        type: DataType.SVGAnimatedInteger,
                                                        Header: 'Delay (Days)',
                                                        width:150,
                                                        accessor:d => (
                                                            <a>
                                                                {d.DELAY}
                                                            </a>
                                                        ),
                                                        filterable : false,
                                                    },

                                                ]} data={result.body.table} />
                                </div>
                            }
                        }
                    }
                </Request>
            </div>

        );
    }
}


export default App;

