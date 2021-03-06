import React from 'react';
import { withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      username: '',
      password: '',
    }
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="container login">
        <form onSubmit={(e) => this.props.logIn(e, this.state)}>
          <h2>Login</h2>
          <input className='username' type="text" name="username" value={this.state.username} onChange={this.handleInput} placeholder="Username"/>
          <input className='password' type="password" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password"/>
          <button className='button login-button col-12 col-md-2' type='submit'>Login</button>
        </form>
      </div>

    )
  }
}

export default withRouter(LoginForm)
