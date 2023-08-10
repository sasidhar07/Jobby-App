import './index.css'

const JobSalaryFilter = props => {
  const {eachSalary, filterSalary} = props

  const changeSalary = () => {
    filterSalary(eachSalary.salaryRangeId)
  }

  return (
    <li className="salaryFilterItem">
      <input
        onChange={changeSalary}
        className="salaryInput"
        name="salary"
        type="radio"
      />
      <p className="salaryFilterPara">{eachSalary.label}</p>
    </li>
  )
}

export default JobSalaryFilter
