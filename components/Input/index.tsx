import { Input as AntdInput, InputProps, InputRef } from "antd"
import { PasswordProps } from "antd/es/input"

const Input = (props: InputProps & React.RefAttributes<InputRef>) => {
  return <AntdInput placeholder="Enter" {...props} />
}

export const InputPassword = (props: PasswordProps & React.RefAttributes<InputRef>) => {
  return <AntdInput.Password placeholder="Enter" {...props} />
}

export default Input
