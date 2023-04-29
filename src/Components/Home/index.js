import {Link} from 'react-router-dom'
import Header from '../Header/index'

import './index.css'

const Home = props => {
  const {history} = props
  const onFindJobs = () => {
    history.replace('/jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />

      <div className="home-card">
        <h1 className="home-head">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of People are searching for jobs, salary information, company
          reviews. ind the job that fits your abilities and potential.
        </p>
        <div>
          <button
            type="button"
            onClick={onFindJobs}
            className="find-jobs-btn-style"
          >
            <Link to="/jobs">Find Jobs</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
