import { SegmentedProps, Segmented as AntdSegmented } from 'antd'

const Segmented = (props: SegmentedProps) => {
  const { children, ...rest } = props

  return (
    <AntdSegmented {...rest} size="middle">
      {children}
    </AntdSegmented>
  )
}

export default Segmented
