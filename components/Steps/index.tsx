import { Steps as AntdSteps, StepsProps } from 'antd'
import { colorBorder, colorFillBackground } from '@root/design-tokens'

const Steps = (props: StepsProps) => {
  const { children, ...rest } = props

  return (
    <AntdSteps
      {...rest}
      style={{
        borderBottom: `1px solid ${colorBorder}`,
        background: colorFillBackground,
      }}
    >
      {children}
    </AntdSteps>
  )
}

export default Steps
