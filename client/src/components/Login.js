import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    error: ''
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      },
      error: ''
    });
  };

  login = e => {
    e.preventDefault();
    // axios call to login
    // we will get a token back
    // store the token in localStorage
    axios.post('http://localhost:5000/api/login', this.state.credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', JSON.stringify(res.data.payload))
      this.props.history.push('/protected')
    })
    .catch(err => {
      this.setState(({error: err.response.data.error}))
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <p style={{color: 'red', fontSize: '12px'}}>{this.state.error}</p>
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;