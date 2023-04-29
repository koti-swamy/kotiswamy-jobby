import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {CgWorkAlt} from 'react-icons/cg'
import {BiLinkExternal} from 'react-icons/bi'
import SkillItem from '../SkillItem/index'
import SimilarJobItem from '../SimilarJobItem/index'

const JobDescriptionItem = props => {
  const {similarJobList, skillsList, jobDetailsItem} = props

  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    description,
    imageUrl,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetailsItem

  return (
    <div className="job-description-bg-container">
      <div className="job-description-container">
        <div className="job-description-company-card">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo-job-description"
          />
          <div className="rating-role-card">
            <h1 className="jd-job-role">{title}</h1>
            <div className="job-description-rating-card">
              <AiFillStar className="job-description-rating-icon-style" />
              <p className="jd-rating-style">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-description-location-card">
          <div className="job-description-location-employment">
            <div className="jd-location-employment-card-style">
              <GoLocation className="jd-location-employment-icon-style" />
              <p className="jd-location-employment-title-style">{location}</p>
            </div>
            <div className="jd-location-employment-card-style">
              <CgWorkAlt className="jd-location-employment-icon-style" />
              <p className="jd-location-employment-title-style">
                {employmentType}
              </p>
            </div>
          </div>
          <p className="jd-package-style">{packagePerAnnum}</p>
        </div>
        <hr className="jd-horizontal-style" />
        <div className="jd-desc-visit-card">
          <h1 className="jd-desc-head-style">Description</h1>
          <a
            href={companyWebsiteUrl}
            rel="noreferrer"
            target="_blank"
            className="link-style-jd"
          >
            Visit <BiLinkExternal />
          </a>
        </div>
        <p className="jd-description">{jobDescription}</p>
        <h1 className="jd-desc-head-style">Skills</h1>
        <ul type="none" className="jd-unordered-list">
          {skillsList.map(eachItem => (
            <SkillItem skillObject={eachItem} key={eachItem.name} />
          ))}
        </ul>
        <h1 className="jd-desc-head-style">Life at Company</h1>
        <div className="jd-company-description-card">
          <p className="jd-description">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="jd-life-company-img"
          />
        </div>
      </div>
      <h1 className="jd-similar-job-head">Similar Jobs</h1>
      <ul type="none" className="sj-unordered-list">
        {similarJobList.map(eachItem => (
          <SimilarJobItem similarJobItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    </div>
  )
}

export default JobDescriptionItem
