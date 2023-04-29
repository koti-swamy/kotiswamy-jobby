import './index.css'
import {AiFillStar} from 'react-icons/ai'

const SimilarJobItem = props => {
  const {similarJobItem} = props
  const {
    companyLogoUrl,
    location,
    jobDescription,
    rating,
    title,
    employmentType,
  } = similarJobItem

  return (
    <li className="sj-list-style">
      <div className="sj-company-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="sj-company-logo-job-description"
        />
        <div className="sj-rating-role-card">
          <h1 className="sj-job-role">{title}</h1>
          <div className="sj-rating-card">
            <AiFillStar className="sj-rating-icon-style" />
            <p className="sj-rating-style">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="sj-desc-head-style">Description</h1>
      <p className="sj-description">{jobDescription}</p>
      <p>{location}</p>
      <p>{employmentType}</p>
    </li>
  )
}

export default SimilarJobItem
