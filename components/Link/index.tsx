import React from 'react'
import { Typography } from '@components/Typography'
import { LinkProps } from 'antd/es/typography/Link'

const Link = (props: LinkProps & React.RefAttributes<HTMLElement>) => {
  const { children, ...rest } = props

  return <Typography.Link {...rest}>{children}</Typography.Link>
}

export default Link
