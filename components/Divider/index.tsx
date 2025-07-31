import { Divider as AntdDivider, DividerProps } from "antd"

const Divider = (props: DividerProps) => {
  const { children, ...rest } = props

  return <AntdDivider {...rest}>{children}</AntdDivider>
}

export default Divider
