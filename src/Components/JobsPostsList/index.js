import Loader from 'react-loader-spinner'
import JobPostItem from '../JobPostItem/index'
import './index.css'

const JobsPostsList = props => {
  const {jobsList, statusJobPortal, getJobPostsList} = props

  const getLoadingView = () => (
    <div className="loader-container-1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const getSuccessView = () => (
    <ul type="none" className="job-post-container">
      {jobsList.map(eachItem => (
        <JobPostItem jobPostItem={eachItem} key={eachItem.id} />
      ))}
    </ul>
  )
  const getFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={getJobPostsList}>
        Retry
      </button>
    </div>
  )

  const getNoJobsView = () => (
    <div className="no-jobs-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-found-head">No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  let jobsPostsUi
  switch (statusJobPortal) {
    case 'SUCCESS':
      jobsPostsUi = getSuccessView()
      break
    case 'FAILURE':
      jobsPostsUi = getFailureView()
      break
    case 'LOADING':
      jobsPostsUi = getLoadingView()
      break
    case 'NOJOBS':
      jobsPostsUi = getNoJobsView()
      break
    default:
      break
  }

  return jobsPostsUi
}

export default JobsPostsList
