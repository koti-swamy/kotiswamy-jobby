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
      <ul>
        <li>
          <Link to="/" className="header-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </li>
        <div className="nav-head-card">
          <li className="nav-head">
            <Link to="/"> Home </Link>
          </li>
          <li className="nav-head">
            <Link to="/jobs">Jobs</Link>
          </li>
        </div>
      </ul>
      <button type="button" onClick={onLogoutBtn} className="logout-btn-style">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
