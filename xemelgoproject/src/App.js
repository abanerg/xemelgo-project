
import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import EmployeePage from './Components/EmployeePage';
import ManagerPage from './Components/ManagerPage';
import LogInPage from './Components/LogInPage';
import "./App.css"
import Button from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from '@mui/material';

const serverRoot = "http://localhost:3300";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUserId: null,
      managerStatus: null
    }
  }

  logIn = (userId, manstatus) => {
    this.setState({
      loggedIn: true,
      currentUserId: userId,
      managerStatus: manstatus
    })
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      currentUserId: null,
      managerStatus: null
    })
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <>
          <LogInPage server={serverRoot} logIn={this.logIn} />
        </>
      )
    }
    else {
      if (this.state.managerStatus == 0) {
        return (
          <>
            <EmployeePage server={serverRoot} employee_id={this.state.currentUserId} logOutFunc={this.logOut} />
          </>
        );
      }
      else {
        return (
          <>
            <ManagerPage server={serverRoot} employee_id={this.state.currentUserId} logOutFunc={this.logOut} />
          </>
        );
      }
    }
  }
}

export default App;
