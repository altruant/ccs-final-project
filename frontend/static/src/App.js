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
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';
import Cookies from 'js-cookie';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    }

    this.logIn=this.logIn.bind(this)
    this.logOut=this.logOut.bind(this)
    this.handleRegister=this.handleRegister.bind(this)
  }

  async logOut() {
    const response = await fetch('/accounts/rest-auth/logout/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Cookies.get('Authorization'))
    });

    const data = await response.json();
    Cookies.remove('Authorization')
    this.setState({isLoggedIn: false})
  }

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
    this.setState({isLoggedIn: true})
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
    this.setState({isLoggedIn: true})

  }

  render() {
    let logConditional
    if(this.state.isLoggedIn===true){
      logConditional = <Link onClick={this.logOut} to='/'>Logout</Link>
    } else {
      logConditional = <Link to='/login'>Login</Link>
    }
    return(
      <Router>
        <Navbar>
          <Link to='/register'>
            Register
          </Link>
          {logConditional}

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
