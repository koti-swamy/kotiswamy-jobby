import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {isError: false, errorMsg: '', username: '', password: ''}

  onUserInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  getSuccessView = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  getFailureView = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onLoginButton = async event => {
    const {username, password} = this.state
    event.preventDefault()

    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccessView(data.jwt_token)
    } else {
      this.getFailureView(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-bg-container">
        <div className="login-card-item">
          <div className="website-logo-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <form className="form-card" onSubmit={this.onLoginButton}>
            <div className="input-card">
              <label htmlFor="username" className="label-style">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.onUserInput}
                className="input-style"
                placeholder="Username"
              />
            </div>
            <div className="input-card">
              <label htmlFor="password" className="label-style">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.onPasswordInput}
                className="input-style"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="login-btn-style">
              Login
            </button>
            {isError && <p className="error-msg">* {errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
