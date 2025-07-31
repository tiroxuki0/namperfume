import { Flex as AntdFlex, FlexProps } from 'antd'

const Flex = (props: FlexProps) => {
  const { children, ...rest } = props
  return <AntdFlex {...rest}>{children}</AntdFlex>
}

export default Flex
