import { string } from 'prop-types'
const Icon = (props) => (
  <i className={'fa '+props.cls}></i>
)
Icon.propTypes = {
  cls: string
}
export default Icon