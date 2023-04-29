import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {CgWorkAlt} from 'react-icons/cg'
import './index.css'

const JobPostItem = props => {
  const {jobPostItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobsDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobPostItem

  return (
    <li className="job-post-card">
      <Link to={`/jobs/${id}`} className="job-post-link-style">
        <div className="top-card">
          <div className="company-info-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="company-name-card">
              <h1 className="job-title-head">{title}</h1>
              <div className="rating-card">
                <AiFillStar className="rating-icon-style" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="salary-employment-location-container">
            <div className="location-employment-card">
              <div className="location-employment-card-style">
                <GoLocation className="location-employment-icon-style" />
                <p className="location-employment-title-style">{location}</p>
              </div>
              <div className="location-employment-card-style">
                <CgWorkAlt className="location-employment-icon-style" />
                <p className="location-employment-title-style">
                  {employmentType}
                </p>
              </div>
            </div>
            <p className="job-package-style">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="job-horizontal-line-style" />
        <div className="bottom-card">
          <h1 className="job-description-head">Description</h1>
          <p className="job-description-style">{jobsDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobPostItem
