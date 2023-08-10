import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBagFill} from 'react-icons/bs'
import Header from '../Header/index'
import './index.css'
import SimilarJob from '../similarJob'

class JobDetails extends Component {
  state = {
    jobItemDetails: '',
    ApiLoadingDetails: '',
    loading: true,
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({loading: true})
    const {match} = this.props
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs/${match.params.id}`
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({
      jobItemDetails: data.job_details,
      similarJobs: [...data.similar_jobs],
      loading: false,
      ApiLoadingDetails: response.ok,
    })
    console.log(data)
  }

  loadJobDetailsAgain = () => {
    this.getJobDetails()
  }

  render() {
    const {jobItemDetails, loading, similarJobs, ApiLoadingDetails} = this.state
    console.log(jobItemDetails)

    return (
      <>
        <Header />

        <div className="jobDetailsCont">
          {loading ? (
            <Loader
              type="ThreeDots"
              color="white"
              height="50"
              width="50"
              className="loader"
            />
          ) : (
            <>
              <div className="jobDetailsCard1">
                <div className="companyLogoCard">
                  <img
                    src={jobItemDetails.company_logo_url}
                    alt="job details company logo"
                    className="JobCompanyLogo"
                  />
                  <div className="titleAndRatingCardForJobDetails">
                    <h1 className="jobDetailsTitle">{jobItemDetails.title}</h1>
                    <div className="JobRatingCard">
                      <AiFillStar className="JobRatingStarImg" />
                      <h3 className="jobRatingHead">{jobItemDetails.rating}</h3>
                    </div>
                  </div>
                </div>
                <div className="jobDetailsCard">
                  <div className="jobDetailsLocationAndTypeCard">
                    <FaMapMarkerAlt className="jobDetailsLoctaionIcon" />
                    <p>{jobItemDetails.location}</p>
                    <BsFillBagFill className="jobDetailsTypeIcon" />
                    <p>{jobItemDetails.employment_type}</p>
                  </div>
                  <p className="jobDetailsPackagePara">
                    {jobItemDetails.package_per_annum}
                  </p>
                </div>
                <hr id="hr" />
                <div>
                  <h1>Description</h1>
                  <a href={jobItemDetails.company_website_url}>Visit</a>
                </div>

                <p>{jobItemDetails.job_description}</p>
                <h1>Skills</h1>
                <ul className="skillsCardUlist">
                  {jobItemDetails.skills.map(skills => (
                    <div className="skillsCard">
                      <img
                        src={skills.image_url}
                        className="skillImg"
                        alt="name"
                      />
                      <h1 className="skillHead">{skills.name}</h1>
                    </div>
                  ))}
                </ul>
                <h1>Life at Company</h1>

                <div className="lifeAtCompanyCard">
                  <div>
                    <p className="lifeAtCompanyPara">
                      {jobItemDetails.life_at_company.description}
                    </p>
                  </div>
                  <img
                    src={jobItemDetails.life_at_company.image_url}
                    alt="life at company"
                  />
                </div>
              </div>
              <h1 className="SimilarJobsHeading">Similar Jobs</h1>
              <ul className="SimilarProductsUl">
                {similarJobs.map(each => (
                  <SimilarJob SimilarJobItem={each} key={each.id} />
                ))}
              </ul>
            </>
          )}
          {!ApiLoadingDetails && !loading ? (
            <div className="failureJobCard">
              <img
                src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-failure-lg-o"
                alt="No jobs"
                className="failureJobImg"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find te page you are looking for.</p>
              <button
                onClick={this.loadJobDetailsAgain}
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
      </>
    )
  }
}

export default JobDetails
