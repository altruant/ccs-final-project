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
      <div className="container">
        <form onSubmit={(e) => this.props.handleRegister(e, this.state)}>
          <h2>Register</h2>
          <label htmlFor="username">Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleInput} placeholder="Username"/>
          <label htmlFor="email">Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Email"/>
          <label htmlFor="password1">Password</label>
            <input type="password" name="password1" value={this.state.password1} onChange={this.handleInput} placeholder="Password"/>
          <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" value={this.state.password2} onChange={this.handleInput} placeholder=""/>
          <button type='submit'>Register</button>
        </form>
      </div>

    )
  }
}

export default withRouter(RegisterForm)
