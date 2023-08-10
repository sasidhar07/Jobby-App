import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBagFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {eachItem} = props
  return (
    <Link className="jobItemLink" to={`/jobs/${eachItem.id}`}>
      <li className="eachJobItem">
        <div className="companyLogoCard">
          <img
            src={eachItem.company_logo_url}
            className="companyLogo"
            alt="JobS"
          />
          <div className="titleAndRatingCard">
            <h1 className="jobItemTitle">{eachItem.title}</h1>
            <div className="ratingCard">
              <AiFillStar className="ratingStarImg" />
              <h3 className="ratingHead">{eachItem.rating}</h3>
            </div>
          </div>
        </div>
        <div className="jobDetailsCard">
          <div className="jobLocationAndTypeCard">
            <FaMapMarkerAlt className="jobLoctaionIcon" />
            <p>{eachItem.location}</p>
            <BsFillBagFill className="jobTypeIcon" />
            <p>{eachItem.employment_type}</p>
          </div>
          <p className="jobPackagePara">{eachItem.package_per_annum}</p>
        </div>
        <hr />
        <div>
          <h1 className="jobDiscriptionPara">Description</h1>
          <p>{eachItem.job_description}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
