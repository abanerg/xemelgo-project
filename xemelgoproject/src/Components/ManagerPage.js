import React, { Component } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import managerHelper from './managerHelper'


const dayjs = require('dayjs')

class ManagerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.employee_id,
            employees: [],
            name: null,
            lastname: null,
            currentEmployeeId: null,
            currentDate: null,
            currentWorkLog: null
        }
    }

    async componentDidMount() {
        const firstResponse = await axios.put(this.props.server + "/manager", { employee_id: this.state.id });
        const response = await axios.put(this.props.server + "/manager/employee-list");
        console.log(response.data)
        this.setState({
            name: firstResponse.data[0].employee_name,
            lastname: firstResponse.data[0].employee_surname,
            employees: response.data
        });
    }

    getWorkLog = async () => {
        try {
            const response = await axios.put(this.props.server + "/manager/worklog", {
                employee_id: this.state.currentEmployeeId,
                employee_date: this.state.currentDate
            });
            this.setState({
                currentWorkLog: response.data
            });
        }
        catch (e) {
            console.log("Invalid worklog input")
        }
    }

    worklogGenerator() {
        const ret = [];
        console.log(this.state.currentWorkLog);
        if (this.state.currentWorkLog) {
            if (this.state.currentWorkLog[0].length > 0) {
                console.log("here:")
                console.log(this.state.currentWorkLog);
                const timesheet = this.state.currentWorkLog[0][0];
                const jobs = this.state.currentWorkLog[1];
                const totalWorkTime = managerHelper.timeWorked(timesheet.employee_clock_in, timesheet.employee_clock_out); //minutes
                var totalJobTime = 0;
                for (var i = 0; i < jobs.length; i++) {
                    totalJobTime += managerHelper.timeWorked(jobs[i].job_start, jobs[i].job_end);
                }
                ret.push(<div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>Total Work Time: {totalWorkTime.toFixed(2)} hours.</div>);
                ret.push(<div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>Total Job Time: {totalJobTime.toFixed(2)} hours.</div>);
                ret.push(<div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>Total Effiency: {((totalJobTime / totalWorkTime) * 100).toFixed(2)}%</div>);
                return ret;
            }
        }
        ret.push(<div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>No valid worklog loaded.</div>)
        return ret;
    }

    tableGenerator() {
        const ret = [];
        for (var i = 0; i < this.state.employees.length; i++) {
            ret.push(<tr>
                <td>{this.state.employees[i][0].employee_id}</td>
                <td>{this.state.employees[i][0].employee_name}</td>
                <td>{this.state.employees[i][0].employee_surname}</td>
            </tr>);
        }
        return ret;
    }
    render() {
        return (
            <>
                <div style={{ textAlign: "center", margin: "20px" }}>
                    <h3>Hello, {this.state.name} {this.state.lastname}</h3>
                </div>
                <div><Button style={{ float: "right", marginRight: "60px" }} onClick={this.props.logOutFunc}><h4>Log out</h4></Button></div>
                <div style={{display: "flex", justifyContent: "center", width: '300px', marginTop: "20px", marginLeft: "40px" }}><Table bordered hover size="sm" striped="columns" >
                    <thead>
                        <tr>
                            <th>Employee #</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    {this.tableGenerator()}
                </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                    <h4>Employee Worklog</h4>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                    <Form style={{ width: '300px' }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Employee Number</Form.Label>
                            <Form.Control onChange={(e) => this.setState({ currentEmployeeId: e.target.value })} type="email" placeholder="#" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange={(e) => this.setState({ currentDate: e.target.value })} type="email" placeholder="YYYY-MM-DD" />
                        </Form.Group>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={this.getWorkLog} variant='primary'>Get worklog</Button> </div>
                    </Form>

                </div>
                    {this.worklogGenerator()}
            </>
        );
    }
}

export default ManagerPage; 