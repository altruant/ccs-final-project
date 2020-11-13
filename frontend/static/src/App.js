import React from "react";
import {
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import {
  Navbar,
} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LinkDetail from './components/LinkDetail.js'

import LinkList from './components/LinkList.js'
import LinkForm from './components/LinkForm.js'
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';
import Cookies from 'js-cookie';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      // activeLink: {}
    }

    this.logIn=this.logIn.bind(this)
    this.logOut=this.logOut.bind(this)
    this.handleRegister=this.handleRegister.bind(this)
    this.submitLink=this.submitLink.bind(this)
    // this.setActiveLink=this.setActiveLink.bind(this)
  }

  // setActiveLink(info) {
  //   this.setState({activeLink: info})
  // }

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
    console.log('Response', data)
    Cookies.remove('Authorization')
    localStorage.removeItem('login')
    localStorage.removeItem('username')
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
    console.log('Response', data)
    Cookies.set('Authorization', `Token ${data.key}`)
    localStorage.setItem('login', `${data.key}`)
    localStorage.setItem('username', `${data.user.username}`)
    this.props.history.push('/')
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
    console.log('Response', data)
    Cookies.set('Authorization', `Token ${data.key}`)
    localStorage.setItem('login', data.key)
    localStorage.setItem('username', `${data.user.username}`)
    this.props.history.push('/')
  }

  async submitLink(event, info) {
    event.preventDefault()
    const response = await fetch('/api/links/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    this.props.history.push(`/links/${localStorage.getItem('username')}/your-links/${data.id}`)
    console.log('Response', data)
  }
  render() {
    let logConditional
    let yourLinks
    if(localStorage.getItem('login')===null) {
      yourLinks = <></>
      logConditional =
      <>
        <Link to='/register-form'>
          Register
        </Link>
        <Link to='/login-form'>
          Login
        </Link>
      </>
    } else {
      yourLinks=<>
      <Link to={`/${localStorage.getItem('username')}/your-links`}>
        Your Links
      </Link>
      </>
      logConditional = <Link onClick={this.logOut} to='/'>Logout</Link>
    }
    return(
      <React.Fragment>
        <Navbar>
          <Link to='/'>
            Home
          </Link>
          <Link to='/create'>
            Create
          </Link>

          <div className="user">
            {yourLinks}
            {logConditional}
          </div>
        </Navbar>
        <Switch>
          <Route path='/register-form'>
            <RegisterForm handleRegister={this.handleRegister}/>
          </Route>
          <Route path='/login-form'>
            <LoginForm logIn={this.logIn}/>
          </Route>
          <Route path='/create'>
            <LinkForm submitLink={this.submitLink}/>
          </Route>

          <Route path={`/${localStorage.getItem('username')}/:id`} exact component={LinkDetail} />
          <Route path={`/${localStorage.getItem('username')}/your-links`} component={LinkList} />

        </Switch>
      </React.Fragment>

    )
  }
}


export default withRouter(App);
