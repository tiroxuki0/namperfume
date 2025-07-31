import { theme, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { TooltipProps } from 'antd/es/tooltip'
import Flex from '@components/Flex'
type Props = TooltipProps & {
  children: React.ReactNode
  icon?: React.ReactNode
}
const TooltipLabel = ({ children, icon, ...rest }: Props) => {
  const { token } = theme.useToken()
  return (
    <Flex align="center" gap={4}>
      {children}
      <Tooltip {...rest}>
        {icon || <InfoCircleOutlined style={{ color: token.colorTextTertiary }} />}
      </Tooltip>
    </Flex>
  )
}

export default TooltipLabel
