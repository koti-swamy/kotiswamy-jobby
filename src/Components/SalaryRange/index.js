const SalaryRange = props => {
  const {eachItem, onRadioBtn} = props
  const {salaryRangeId, label} = eachItem
  return (
    <li className="employment-type-item">
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        name="salaryRange"
        className="employment-type-input"
        onChange={onRadioBtn}
      />
      <label htmlFor={salaryRangeId} className="employment-type-id">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
