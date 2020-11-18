// imports
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import Cookies from 'js-cookie';
//components
import Wordmark_Color from './assets/Wordmark-Color.png'
import Home from './components/Home.js'
import LinkDetail from './components/LinkDetail.js'
import LinkList from './components/LinkList.js'
import LinkForm from './components/LinkForm.js'
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }

    this.logIn=this.logIn.bind(this)
    this.logOut=this.logOut.bind(this)
    this.handleRegister=this.handleRegister.bind(this)
    this.submitLink=this.submitLink.bind(this)
  }

  componentDidMount() {
    this.setState({username: localStorage.getItem('username')})
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
    Cookies.set('Authorization', `${data.key}`)
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
    Cookies.set('Authorization', `${data.key}`)
    localStorage.setItem('login', data.key)
    localStorage.setItem('username', `${data.user.username}`)
    this.props.history.push('/')
    window.location.reload(true);
  }

  async submitLink(event, info) {
    event.preventDefault()
    let newState = {...info}
    delete newState.player
    const response = await fetch('/api/links/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newState)
    })
    const data = await response.json()
    this.props.history.push(`/${this.state.username}/your-notes`)
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
      <Link to={`/${localStorage.getItem('username')}/your-notes`}>
        Your Notes
      </Link>
      </>
      logConditional = <Link onClick={this.logOut} to='/'>Logout</Link>
    }
    return(
      <React.Fragment>
        <div className="container-fluid nav-container">
          <Navbar expand='md' className='top-nav'>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Link to='/'>
              <img src={Wordmark_Color} alt="#"/>
            </Link>
            <Navbar.Collapse className='collapse'>
              <div className="main">
                <Link to='/create'>
                  Create
                </Link>
                {yourLinks}
              </div>
              <div className="user">
                {logConditional}
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>

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
          <Route path={`/${this.state.username}/your-notes`}>
            <LinkList username={this.state.username} />
          </Route>
          <Route path={`/${this.state.username}/:id`} exact component={LinkDetail} />
          <Route path={`/notes/:id`} exact component={LinkDetail} />
          <Route path='/' component={Home} />
        </Switch>
      </React.Fragment>

    )
  }
}


export default withRouter(App);
