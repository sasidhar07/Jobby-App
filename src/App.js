import {Switch, Route} from 'react-router-dom'
import NotFound from './component/NotFound'
import './App.css'
import Login from './component/Login'
import Home from './component/Home'
import ProtectedRoute from './component/protectedRoute'
import Jobs from './component/Jobs/index'
import JobDetails from './component/JobDetails'

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

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />

    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />

    <ProtectedRoute
      exact
      employmentTypesList={employmentTypesList}
      props={salaryRangesList}
      path="/jobs"
      render={props => (
        <Jobs
          {...props}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
        />
      )}
    />
    <Route component={NotFound} />
  </Switch>
)

export default App
