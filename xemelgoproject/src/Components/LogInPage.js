import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangeEvent from 'react';

const bcrypt = require('../bcrypt');

class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      statusMessage: null,
    }
  }

  
  onLogIn = async () => {
    try {
      if (this.state.username && this.state.password) {
        const response = await axios.put(this.props.server + "/log-in", { employee_username: this.state.username });
        if (response.data.length > 0) {
          const val = bcrypt.hashPassword(this.state.password);
          console.log(val);
          const comparison = await bcrypt.comparePasswords(this.state.password, response.data[0].employee_password);
          if (comparison) {
            this.props.logIn(response.data[0].employee_id, response.data[0].employee_manstatus)
          }
          else {
            this.setState({
              statusMessage: "Incorrect password"
            })
          }
        }
        else {
          this.setState({
            statusMessage: "No such username"
          })
          
        }
      }
    }
    catch (e) {
      alert("Server error.");
    }
  }

  renderStatus() {
    const ret = [];
    if (this.state.statusMessage) {
      ret.push(<div style={{ display: "flex", justifyContent: "center"}}>{this.state.statusMessage}</div>)
      return ret; 
    }
    return ret; 
  }

  render() {
    return (
      <div style={{ textAlign: "center" , marginTop:"20px"}}>
        <h2>Log-in To Work Time Logging</h2>
        <div>
          <Form>
            <div style={{ display: "flex", justifyContent: "center"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(e) => this.setState({ username: e.target.value })} type="email" placeholder="Enter username" />
            </Form.Group>
            </div>
            <div style={{ display: "flex", justifyContent: "center"}}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Enter password" />
            </Form.Group>
            </div>
          </Form>
          <Button onClick={this.onLogIn} variant="primary">Log-in</Button>
        </div>
        {this.renderStatus()}
      </div>
    );

  }
}

export default LogInPage;
