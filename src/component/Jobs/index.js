import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch, BsX} from 'react-icons/bs'

import './index.css'
import Header from '../Header/index'
import JobItem from '../JobItem/index'
import Profile from '../Profile'
import JobSalaryFilter from '../JobSalaryFilter'
import JobTypeFilter from '../JobTypeFilter'

class Jobs extends Component {
  state = {
    jobsList: [],
    Type: [],
    salary: 1000000,
    loading: true,
    loadingProfile: true,
    profileDetails: '',
    search: '',
    statusOffApi: true,
  }

  componentDidMount() {
    this.getProfile()

    this.getJobs()
  }

  getProfile = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    this.setState({loadingProfile: true})

    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const profileResponse = await fetch(profileUrl, options)
    const profileData = await profileResponse.json()
    this.setState({
      profileDetails: {...profileData.profile_details},
      loadingProfile: false,
    })
  }

  getJobs = async () => {
    const {salary, Type, search} = this.state

    this.setState({loading: true})
    const url = `https://apis.ccbp.in/jobs?employment_type=${[
      ...Type,
    ]}&minimum_package=${salary}&search=${search}`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    this.setState({
      jobsList: [...data.jobs],
      loading: false,
      statusOffApi: response.ok,
    })
  }

  filterSalary = sal => {
    this.setState({salary: sal}, () => {
      this.getJobs()
    })
    console.log(sal)
  }

  filterType = type => {
    const {Type} = this.state
    if (!Type.includes(type)) {
      this.setState({Type: [...Type, type]}, () => {
        this.getJobs()
      })
    } else {
      const newType = Type.filter(each => each !== type)

      this.setState({Type: [...newType]}, () => {
        this.getJobs()
      })
    }
  }

  inputChange = event => {
    this.setState({search: event.target.value})
  }

  ChangeSearch = () => {
    this.getJobs()
  }

  ClearSearch = () => {
    this.setState({search: ''})
  }

  loadJobAgain = () => {
    this.getJobs()
  }

  loadProfileAgain = () => {
    this.getProfile()
  }

  render() {
    const {
      jobsList,
      loading,
      profileDetails,
      search,
      statusOffApi,
      loadingProfile,
    } = this.state
    const {salaryRangesList, employmentTypesList} = this.props

    return (
      <>
        <Header />
        <div className="jobSContainer">
          <div className="FilterContainer">
            <Profile
              profileDetails={profileDetails}
              loadingProfile={loadingProfile}
              loadProfileAgain={this.loadProfileAgain}
            />
            <hr />
            <h1 className="FilterTypeHeading"> Type of Employee</h1>
            <ul>
              {employmentTypesList.map(each => (
                <JobTypeFilter
                  filterType={this.filterType}
                  eachType={each}
                  key={each.employmentTypeId}
                />
              ))}
            </ul>
            <hr />
            <h1 className="FilterTypeHeading">Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <JobSalaryFilter
                  filterSalary={this.filterSalary}
                  eachSalary={each}
                  key={each.salaryRangeId}
                />
              ))}
            </ul>
          </div>
          <div className="JobListCard">
            <div className="searchInputCard">
              <input
                onChange={this.inputChange}
                className="searchInput"
                placeholder="Search"
                value={search}
              />
              {search !== '' ? (
                <BsX className="crossIcon" onClick={this.ClearSearch} />
              ) : (
                ''
              )}
              <div className="searchIconCard">
                <BsSearch className="searchIcon" onClick={this.ChangeSearch} />
              </div>
            </div>
            <div className="eachJobItemCard">
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="white"
                  height="50"
                  width="50"
                  className="loader"
                />
              ) : (
                <ul>
                  {jobsList.map(each => (
                    <JobItem eachItem={each} key={each.id} />
                  ))}
                </ul>
              )}
              {jobsList.length === 0 && !loading ? (
                <div className="failureJobCard">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    alt="No jobs"
                    className="failureJobImg"
                  />
                  <h1>No Jobs Found</h1>
                  <p>We cannot find any jobs.Try other filters</p>
                  <button
                    onClick={this.loadJobAgain}
                    className="failureJobButton"
                    type="button"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                ''
              )}
              {!statusOffApi && !loading ? (
                <div className="failureJobCard">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                    alt="No jobs"
                    className="failureJobImg"
                  />
                  <h1>Oops! Something Went Wrong</h1>
                  <p>We cannot seem to find te page you are looking for.</p>
                  <button
                    onClick={this.loadJobAgain}
                    className="failureJobButton"
                    type="button"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
