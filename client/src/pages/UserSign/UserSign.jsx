import SignUp from '../../components/sign-up/sign-up.component.jsx';
import SignIn from '../../components/sign-in/sign-in.component.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserSign.css';

class UserSign extends Component {
  render(){
    return (
    <div>
    <button><Link to="/">Return To Home Page</Link> </button>
    <Router>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
    </Router>
    </div>
    )
  }
};

export default UserSign;
