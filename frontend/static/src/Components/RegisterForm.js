import React from 'react';
import { withRouter } from 'react-router-dom'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      username: '',
      email: '',
      password1: '',
      password2: '',
    }
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  render() {
    return (
      <div className="register container">
        <form onSubmit={(e) => this.props.handleRegister(e, this.state)}>
          <h2>Register</h2>
          <input className='username' type="text" name="username" value={this.state.username} onChange={this.handleInput} placeholder="Username"/>
          <input className='username' type="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Email"/>
          <input className='username' type="password" name="password1" value={this.state.password1} onChange={this.handleInput} placeholder="Password"/>
          <input className='username' type="password" name="password2" value={this.state.password2} onChange={this.handleInput} placeholder="Confirm Password"/>
          <button className='login-button button'type='submit'>Register</button>
        </form>
      </div>

    )
  }
}

export default withRouter(RegisterForm)
