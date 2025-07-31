import { colorFillBorder } from '@root/design-tokens'
import { Tooltip, Typography } from 'antd'
import { TooltipPropsWithOverlay } from 'antd/lib/tooltip'
import { ReactElement } from 'react'

export interface PopoverProps extends TooltipPropsWithOverlay {
  header?: string | ReactElement
  content?: string | ReactElement
  children?: ReactElement
  minWidth?: number
}
const Popover = (props: PopoverProps) => {
  const { header, content, children, minWidth = 236, ...rest } = props

  const customColors = '#fff'

  return (
    <Tooltip
      placement="top"
      color={customColors}
      overlayInnerStyle={{
        borderRadius: 8,
        padding: 0,
        textAlign: 'left',
        minWidth: minWidth,
        boxShadow: '0px 0px 8px rgba(0,0,0,0.1)',
      }}
      title={
        <>
          <div style={{ padding: '5px 15px', borderBottom: `1px solid ${colorFillBorder}` }}>
            <Typography.Text strong style={{ fontSize: '16px' }}>
              {header || 'Title'}
            </Typography.Text>
          </div>
          <div style={{ padding: '5px 15px' }}>
            <Typography.Text style={{ fontSize: '16px' }}>{content || 'Content'}</Typography.Text>v
          </div>
        </>
      }
      {...rest}
    >
      {children}
    </Tooltip>
  )
}

export default Popover
