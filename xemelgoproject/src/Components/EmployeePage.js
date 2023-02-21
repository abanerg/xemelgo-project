import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const dayjs = require('dayjs')

class EmployeePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.employee_id,
            name: null,
            lastname: null,
            clockedin: false,
            currentJobNumber: null,
            currentJobStartTime: null,
            currentJobEndTime: null,
            statusMessage: null
        }
    }

    async componentDidMount() {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const response = await axios.put(this.props.server + "/employee", { employee_id: this.state.id, employee_date: currentDate });
        console.log("response");
        this.setState({
            name: response.data[0].employee_name,
            lastname: response.data[0].employee_surname,
        });
    }

    clockIn = async () => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const currentTime = dayjs().format('YYYY-MM-DD hh:mm:ss');
        const response = await axios.put(this.props.server + "/employee/clock-in", {
            employee_id: this.state.id,
            employee_date: currentDate, employee_clock_in: currentTime
        });
        console.log(response.data.message);
        this.setState({
            clockedin: true
        });
    }

    clockOut = async () => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const currentTime = dayjs().format('YYYY-MM-DD hh:mm:ss');
        const response = await axios.put(this.props.server + "/employee/clock-out", {
            employee_id: this.state.id,
            employee_date: currentDate, employee_clock_out: currentTime
        });
        console.log(response.data.message);
        this.setState({
            clockedin: false
        });
        this.props.logOutFunc();
    }

    submitJob = async () => {
        try {
            const date = this.state.currentJobStartTime.substring(0, 10);
            const response = await axios.post(this.props.server + "/employee", {
                employee_id: this.state.id,
                job_date: date, job_number: this.state.currentJobNumber, job_start: this.state.currentJobStartTime,
                job_end: this.state.currentJobEndTime
            });
            this.setState({
                statusMessage: response.data.message
            })
        }
        catch (e) {
            console.log("Invalid job input");
            this.setState({
                statusMessage: "Invalid job input."
            })
        }
    }

    validateJobState = () => {
        let value = this.state.currentJobNumber;
        const numberCheck = !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
        let startCheck = dayjs(this.state.currentJobStartTime, 'YYYY-MM-DD hh:mm:ss', true).isValid();
        let endCheck = dayjs(this.state.currentJobStartTime, 'YYYY-MM-DD hh:mm:ss', true).isValid();
        return numberCheck && startCheck && endCheck;
    }

    renderStatus() {
        const ret = [];
        if (this.state.statusMessage) {
            ret.push(<div style={{marginTop:"10px"}}>{this.state.statusMessage}</div>)
            return ret; 
        }
        else {
            return ret; 
        }
    }

    render() {
        if (!this.state.clockedin) {
            return (
                <>
                    <div>
                        <h3 style={{ textAlign: "center", margin: "20px" }}>Hello, {this.state.name} {this.state.lastname}</h3>
                        <div><Button style={{ float: "right", marginRight: "60px" }} onClick={this.props.logOutFunc}><h4>Log out</h4></Button>
                        <div style={{marginLeft:"150px",}}><Button onClick={this.clockIn} variant="primary"><h4>Clock-in</h4></Button></div>
                        </div>
                       
                    </div>
                </>
            );
        }
        else {
            return (
                <>
                    <h3 style={{ textAlign: "center", margin: "20px" }}>Hello, {this.state.name} {this.state.lastname}</h3>
                    <><Button style={{ float: "right", marginRight: "60px" }} onClick={this.clockOut} variant="primary"><h4>Clock-out and Log-out</h4></Button></>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", marginLeft: "280px" }}>
                    <Form style={{ width: '300px'}}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Job Number</Form.Label>
                            <Form.Control onChange={(e) => this.setState({ currentJobNumber: e.target.value })} type="email" placeholder="#" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Job Start Time</Form.Label>
                            <Form.Control onChange={(e) => this.setState({ currentJobStartTime: e.target.value })} type="email" placeholder="YYYY-MM-DD hh:mm:ss" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Job End Time</Form.Label>
                            <Form.Control onChange={(e) => this.setState({ currentJobEndTime: e.target.value })} type="email" placeholder="YYYY-MM-DD hh:mm:ss" />
                        </Form.Group>
                        <Button style={{ textAlign: "center"}} onClick={this.submitJob} variant="primary">Submit Job</Button>
                        {this.renderStatus()}
                    </Form>
                    </div>
                </>
            );
        }
    }
}

export default EmployeePage; 