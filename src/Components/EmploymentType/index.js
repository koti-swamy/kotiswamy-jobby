const EmploymentType = props => {
  const {eachItem, onCheckBox} = props
  const {employmentTypeId, label} = eachItem
  return (
    <li className="employment-type-item">
      <input
        type="checkBox"
        id={employmentTypeId}
        value={employmentTypeId}
        name={employmentTypeId}
        className="employment-type-input"
        onChange={onCheckBox}
      />
      <label htmlFor={employmentTypeId} className="employment-type-id">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
