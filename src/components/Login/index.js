import {useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory, Redirect} from 'react-router-dom'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  // Add authentication check at the start
  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  const onHandleUserName = event => {
    setUsername(event.target.value)
  }

  const onHandlePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onSubmitFailure = message => {
    setErrorMsg(message)
  }

  const onSubmitLoginCredentials = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok && data.jwt_token) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="main-container">
      <div className="from-and-login-image-container">
        <img
          className="login-image"
          src="https://th.bing.com/th/id/OIP.9nl2eFOD4SKNC_FIn0bSqQHaFj?w=3200&h=2400&rs=1&pid=ImgDetMain"
          alt=""
        />
        <form onSubmit={onSubmitLoginCredentials} className="form">
          <h1 className="heading">Restaurant App</h1>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={onHandleUserName}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={onHandlePassword}
            />
          </div>
          <button type="submit">Login</button>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
