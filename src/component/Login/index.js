import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMess: '',
  }

  authenticateLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props

      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
      })
      history.replace('/')
    } else {
      this.setState({errorMess: `* ${data.error_msg}`})
    }
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMess} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <form className="loginFrom" onSubmit={this.authenticateLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            onChange={this.usernameChange}
            id="username"
            placeholder="Username"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            onChange={this.passwordChange}
            type="password"
            id="password"
            placeholder="Password"
          />
          <button className="loginButton" type="submit">
            Login
          </button>
          <p className="loginEror">{errorMess}</p>
          <footer>
            <p className="pass">Username: rahul</p>
            <p className="pass">Password: rahul@2021</p>
          </footer>
        </form>
      </div>
    )
  }
}
