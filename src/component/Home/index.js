import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/index'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="fluid-container">
          <div className="homeInnerCard">
            <h1 className="homeHead">Find The Job That Fits Your Life</h1>
            <p className="homePara">
              Millions of people are searching for jobs,salary information
              ,company reviews.Find the job that fits your abilities and
              potential
            </p>
            <Link className="FondJobLink" to="/jobs">
              <button type="button" className="FindJobsButton">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
