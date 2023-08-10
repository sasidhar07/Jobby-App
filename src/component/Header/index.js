import {Link, withRouter} from 'react-router-dom'
import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBagFill} from 'react-icons/bs'
import {MdExitToApp} from 'react-icons/md'
import Cookies from 'js-cookie'

const Header = props => {
  const logoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navBar">
      <div className="nav-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navWebsiteLogo"
        />
        <div className="navUlListCard">
          <ul className="navUlList">
            <Link className="LinkItem" to="/">
              <li>Home</li>
            </Link>
            <Link className="LinkItem" to="/jobs">
              <li>Jobs</li>
            </Link>
          </ul>

          <button type="button" onClick={logoutButton} className="logoutButton">
            Logout
          </button>
        </div>
      </div>
      <div className="nav-card-small">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navWebsiteLogo"
        />
        <div className="navUlListCard">
          <Link className="LinkItem" to="/">
            <AiFillHome className="homeIcon" />
          </Link>
          <Link className="LinkItem" to="/jobs">
            <BsFillBagFill className="homeIcon" />
          </Link>
          <button
            type="button"
            onClick={logoutButton}
            className="smallNavButton"
          >
            <MdExitToApp className="exitIcon" />
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
