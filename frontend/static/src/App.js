import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Navbar,
} from 'react-bootstrap';
import './App.css';
import LoginForm from './Components/LoginForm.js';
import RegisterForm from './Components/RegisterForm.js';
import Cookies from 'js-cookie';

class App extends React.Component {

  async logIn(event, info) {
    event.preventDefault();
    const response = await fetch('/accounts/rest-auth/login/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info)
    });

    const data = await response.json();
    Cookies.set('Authorization', `Token ${data.key}`)
  }

  async handleRegister(e, info) {
    e.preventDefault();
    const response = await fetch('/accounts/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info)
    });

    const data = await response.json();
    console.log(data)
    Cookies.set('Authorization', `Token ${data.key}`)

  }

  render() {
    return(
      <Router>
        <Navbar>
          <Link to='/register'>
            Register
          </Link>
          <Link to='/login'>
            Login
          </Link>

        </Navbar>
        <Switch>
          <Route path='/register'>
            <RegisterForm handleRegister={this.handleRegister}/>
          </Route>
          <Route path='/login'>
            <LoginForm logIn={this.logIn}/>
          </Route>
        </Switch>
      </Router>
    )
  }
}


export default App;
