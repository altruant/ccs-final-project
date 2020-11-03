import React from 'react';


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
        <form onSubmit={(e) => this.props.logIn(e, this.state)}>
          <h2>Login</h2>
          <label htmlFor="username">Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleInput} placeholder="Username"/>
          <label htmlFor="password">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password"/>
          <button type='submit'>Login</button>
        </form>
    )
  }
}

export default LoginForm
