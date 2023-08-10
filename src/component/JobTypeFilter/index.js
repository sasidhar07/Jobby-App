import './index.css'

const JobTypeFilter = props => {
  const {eachType, filterType} = props

  const changeSalary = () => {
    filterType(eachType.employmentTypeId)
  }

  return (
    <li className="typeFilterItem">
      <input
        onChange={changeSalary}
        className="typeInput"
        name="salary"
        type="checkbox"
      />
      <p className="typeFilterPara">{eachType.label}</p>
    </li>
  )
}

export default JobTypeFilter
