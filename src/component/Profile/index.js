import './index.css'
import Loader from 'react-loader-spinner'

const Profile = props => {
  const {profileDetails, loadingProfile, loadProfileAgain} = props

  const changePro = () => {
    loadProfileAgain()
  }

  if (loadingProfile) {
    return (
      <div className="loaderCardForProfile">
        <Loader
          type="ThreeDots"
          color="white"
          height="50"
          width="50"
          className="loader"
        />
      </div>
    )
  }
  if (profileDetails === '') {
    return (
      <div className="loaderCardForProfile">
        <button onClick={changePro} className="failureJobButton" type="button">
          Retry
        </button>
      </div>
    )
  }
  return (
    <div className="profileCard">
      <img
        src={profileDetails.profile_image_url}
        className="profileImg"
        alt="profile"
      />
      <h1 className="profileHead">{profileDetails.name}</h1>
      <p className="profilePara">{profileDetails.short_bio}</p>
    </div>
  )
}

export default Profile
