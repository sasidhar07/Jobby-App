import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBagFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {SimilarJobItem} = props
  return (
    <div className="similarJobCard">
      <div className="SimilarCompanyDetails">
        <img
          src={SimilarJobItem.company_logo_url}
          className="SimilarJobCompanyLogo"
          alt="similar job company logo"
        />
        <div className="SimilarTitleAndRatingCardForJobDetails">
          <h1 className="SimilarJobDetailsTitle">{SimilarJobItem.title}</h1>
          <div className="SimilarJobRatingCard">
            <AiFillStar className="SimilarJobRatingStarImg" />
            <p className="SimilarJobRatingHead">{SimilarJobItem.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="SimilarJobDetailsDescription">Description</h1>
      <p>{SimilarJobItem.job_description}</p>
      <div className="SimilarJobLocationAndTypeCard">
        <FaMapMarkerAlt className="SimilarJobLoctaionIcon" />
        <p>{SimilarJobItem.location}</p>
        <BsFillBagFill className="SimilarJobTypeIcon" />
        <p>{SimilarJobItem.employment_type}</p>
      </div>
    </div>
  )
}
export default SimilarJob
