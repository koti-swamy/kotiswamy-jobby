import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './Components/LoginForm/index'
import FindJobs from './Components/FindJobs/index'
import Home from './Components/Home/index'
import ProtectedRoute from './Components/ProtectedRoute'
import JobDescription from './Components/JobDescription/index'
import NotFound from './Components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/jobs" component={FindJobs} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDescription} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
