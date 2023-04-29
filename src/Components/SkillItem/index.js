import './index.css'

const SkillItem = props => {
  const {skillObject} = props
  const {imageUrl, name} = skillObject
  return (
    <li className="jd-list-style">
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default SkillItem
