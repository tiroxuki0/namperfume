import { Dropdown as AntDropdown } from 'antd'
import { DropdownButtonProps } from 'antd/es/dropdown'

const Dropdown = (props: DropdownButtonProps) => {
  const { children, ...rest } = props

  return <AntDropdown {...rest}>{children}</AntDropdown>
}

export default Dropdown
