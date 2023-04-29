import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import JobDescriptionItem from '../JobDescriptionItem'
import './index.css'

const apiConstantsJobDescription = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobDescription extends Component {
  state = {
    similarJobList: [],
    skillsList: [],
    jobDetailsItem: {},
    statusJobDetail: apiConstantsJobDescription.loading,
  }

  componentDidMount() {
    this.getJobDetailData()
  }

  getJobDetailData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const fetchedJobDetails = fetchedData.job_details
      const updatedJobDetails = {
        companyLogoUrl: fetchedJobDetails.company_logo_url,
        companyWebsiteUrl: fetchedJobDetails.company_website_url,
        employmentType: fetchedJobDetails.employment_type,
        id: fetchedJobDetails.id,
        jobDescription: fetchedJobDetails.job_description,
        description: fetchedJobDetails.life_at_company.description,
        imageUrl: fetchedJobDetails.life_at_company.image_url,
        location: fetchedJobDetails.location,
        packagePerAnnum: fetchedJobDetails.package_per_annum,
        rating: fetchedJobDetails.rating,
        title: fetchedJobDetails.title,
      }
      const updatedSkills = fetchedJobDetails.skills.map(eachItem =>
        this.convertSkillsSnakeToPascal(eachItem),
      )
      const updatedSimilarJobs = fetchedData.similar_jobs.map(eachItem =>
        this.convertSimilarJobsSnakeToPascal(eachItem),
      )
      this.setState({
        similarJobList: updatedSimilarJobs,
        skillsList: updatedSkills,
        jobDetailsItem: updatedJobDetails,
        statusJobDetail: apiConstantsJobDescription.success,
      })
    } else {
      this.setState({statusJobDetail: apiConstantsJobDescription.failure})
    }
  }

  convertSkillsSnakeToPascal = skill => ({
    imageUrl: skill.image_url,
    name: skill.name,
  })

  convertSimilarJobsSnakeToPascal = jobs => ({
    companyLogoUrl: jobs.company_logo_url,
    employmentType: jobs.employment_type,
    id: jobs.id,
    jobDescription: jobs.job_description,
    location: jobs.location,
    packagePerAnnum: jobs.package_per_annum,
    rating: jobs.rating,
    title: jobs.title,
  })

  getJdSuccessView = () => {
    const {similarJobList, skillsList, jobDetailsItem} = this.state
    return (
      <JobDescriptionItem
        similarJobList={similarJobList}
        skillsList={skillsList}
        jobDetailsItem={jobDetailsItem}
      />
    )
  }

  getJdLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJdFailureView = () => (
    <div className="jd-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobDetailData}>
        Retry
      </button>
    </div>
  )

  render() {
    const {statusJobDetail} = this.state

    let jobDescriptionUi

    switch (statusJobDetail) {
      case 'SUCCESS':
        jobDescriptionUi = this.getJdSuccessView()
        break
      case 'LOADING':
        jobDescriptionUi = this.getJdLoadingView()
        break
      case 'FAILURE':
        jobDescriptionUi = this.getJdFailureView()
        break

      default:
        break
    }

    return (
      <>
        <Header />
        {jobDescriptionUi}
      </>
    )
  }
}

export default JobDescription
