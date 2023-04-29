import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import EmploymentType from '../EmploymentType/index'
import SalaryRange from '../SalaryRange/index'
import JobsPostsList from '../JobsPostsList/index'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstantsForProfile = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiStatusConstantsForJobs = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
}

class FindJobs extends Component {
  state = {
    profileDetails: [],
    statusProfileData: apiStatusConstantsForProfile.loading,
    statusJobPortal: apiStatusConstantsForJobs.loading,
    employmentType: [],
    searchIconInput: '',
    minimumPackage: '',
    searchInput: '',
    jobsList: [],
    employmentValue: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobPostsList()
  }

  onRadioBtn = event => {
    this.setState({minimumPackage: event.target.value}, this.getJobPostsList)
  }

  onCheckBox = event => {
    if (event.target.checked) {
      return this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getEmploymentValue,
      )
    }
    return this.setState(
      prevState => ({
        employmentType: prevState.employmentType.filter(
          salary => event.target.value !== salary && salary,
        ),
      }),
      this.getEmploymentValue,
    )
  }

  getEmploymentValue = () => {
    const {employmentType} = this.state
    this.setState(
      {employmentValue: employmentType.join(',')},
      this.getJobPostsList,
    )
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchIconInput: searchInput}, this.getJobPostsList)
  }

  getProfileDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedProfileData = data.profile_details
      const updatedProfileDetails = {
        name: fetchedProfileData.name,
        profileImageUrl: fetchedProfileData.profile_image_url,
        shortBio: fetchedProfileData.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        statusProfileData: apiStatusConstantsForProfile.success,
      })
    } else {
      this.setState({
        statusProfileData: apiStatusConstantsForProfile.failure,
      })
    }
  }

  getJobPostsList = async () => {
    const {searchIconInput, employmentValue, minimumPackage} = this.state
    console.log(searchIconInput, minimumPackage)
    const jwtToken = Cookies.get('jwt_token')

    console.log(employmentValue)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentValue}&minimum_package=${minimumPackage}&search=${searchIconInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(eachItem =>
        this.convertSnakeToPascal(eachItem),
      )
      console.log(fetchedData)
      if (fetchedData.jobs.length >= 1) {
        this.setState({
          jobsList: updatedData,
          statusJobPortal: apiStatusConstantsForJobs.success,
        })
      } else {
        this.setState({statusJobPortal: apiStatusConstantsForJobs.noJobs})
      }
    } else {
      this.setState({statusJobPortal: apiStatusConstantsForJobs.failure})
    }
  }

  convertSnakeToPascal = jobs => ({
    companyLogoUrl: jobs.company_logo_url,
    employmentType: jobs.employment_type,
    id: jobs.id,
    jobsDescription: jobs.job_description,
    location: jobs.location,
    packagePerAnnum: jobs.package_per_annum,
    rating: jobs.rating,
    title: jobs.title,
  })

  getProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails
    return (
      <div className="profile-detail-card">
        <img
          src={profileImageUrl}
          alt="profile"
          className="profile-pic-style"
        />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  getProfileFailureView = () => (
    <div className="profile-failure-card">
      <button
        type="button"
        className="retry-btn-style"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  getProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {
      statusProfileData,
      jobsList,
      statusJobPortal,
      searchInput,
    } = this.state

    let profileDetailView
    switch (statusProfileData) {
      case 'SUCCESS':
        profileDetailView = this.getProfileSuccessView()
        break
      case 'FAILURE':
        profileDetailView = this.getProfileFailureView()
        break
      case 'LOADING':
        profileDetailView = this.getProfileLoadingView()
        break
      default:
        break
    }

    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="filter-container">
            {profileDetailView}
            <hr />
            <h1 className="employment-type-head">Type of Employment</h1>
            <ul type="none" className="employment-filter-card">
              {employmentTypesList.map(eachItem => (
                <EmploymentType
                  eachItem={eachItem}
                  onCheckBox={this.onCheckBox}
                  key={eachItem.employmentTypeId}
                />
              ))}
            </ul>
            <hr />
            <h1 className="employment-type-head">Salary Range</h1>
            <ul type="none" className="employment-filter-card">
              {salaryRangesList.map(eachItem => (
                <SalaryRange
                  eachItem={eachItem}
                  onRadioBtn={this.onRadioBtn}
                  key={eachItem.salaryRangeId}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-container">
            <div className="search-card">
              <input
                id="search"
                type="search"
                className="search-input-style"
                placeholder="Search"
                onChange={this.onSearchInput}
                value={searchInput}
              />
              <label htmlFor="search" className="label-search-style">
                <button
                  type="button"
                  className="search-btn-style"
                  data-testid="searchButton"
                  onClick={this.onSearchIcon}
                >
                  <BiSearch />
                </button>
              </label>
            </div>
            <JobsPostsList
              jobsList={jobsList}
              statusJobPortal={statusJobPortal}
              getJobPostsList={this.getJobPostsList}
            />
          </div>
        </div>
      </>
    )
  }
}

export default FindJobs
