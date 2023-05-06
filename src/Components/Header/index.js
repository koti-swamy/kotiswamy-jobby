import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onLogoutBtn = () => {
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div>
        <Link to="/" className="header-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </div>
      <ul type="none" className="nav-head-card">
        <li className="nav-head">
          <Link to="/" className="header-link">
            Home
          </Link>
        </li>
        <li className="nav-head">
          <Link to="/jobs" className="header-link">
            Jobs
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={onLogoutBtn}
            className="logout-btn-style"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
