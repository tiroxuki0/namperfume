import { Tag as AntdTag, TagProps } from "antd"

const Tag = (props: TagProps) => {
  const { children, ...rest } = props

  return <AntdTag {...rest}>{children}</AntdTag>
}

export default Tag
