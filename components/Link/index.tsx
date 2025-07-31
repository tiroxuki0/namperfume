import React from "react"

import { LinkProps } from "antd/es/typography/Link"

import { Typography } from "@components/Typography"

const Link = (props: LinkProps & React.RefAttributes<HTMLElement>) => {
  const { children, ...rest } = props

  return <Typography.Link {...rest}>{children}</Typography.Link>
}

export default Link
