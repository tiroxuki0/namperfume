import { ExportOutlined } from '@ant-design/icons'
import Flex from '@components/Flex'
import { Typography as AntdTypography } from 'antd'
import { LinkProps } from 'antd/es/typography/Link'
import { ParagraphProps } from 'antd/es/typography/Paragraph'
import { TextProps } from 'antd/es/typography/Text'
import { TitleProps } from 'antd/es/typography/Title'
import { default as NextLink } from 'next/link'
import React from 'react'

const Text = (props: TextProps & React.RefAttributes<HTMLSpanElement>) => {
  const { children, ...rest } = props
  return <AntdTypography.Text {...rest}>{children}</AntdTypography.Text>
}

const Link = (
  props: LinkProps &
    React.RefAttributes<HTMLElement> & {
      showIcon?: boolean
      icon?: React.ReactNode
    }
) => {
  const { children, showIcon, icon, href, ...rest } = props
  return (
    <NextLink
      target={showIcon ? '_blank' : '_self'}
      prefetch={false}
      href={href || ''}
      passHref
      {...(rest.onClick && {
        onClick: (ev) => {
          ev.preventDefault()
        },
      })}
    >
      <AntdTypography.Link {...rest}>
        {showIcon ? (
          <Flex gap={6}>
            {children}
            {icon || <ExportOutlined style={{ fontSize: 12 }} />}
          </Flex>
        ) : (
          children
        )}
      </AntdTypography.Link>
    </NextLink>
  )
}
const LinkNewTab = (props: LinkProps & React.RefAttributes<HTMLElement>) => {
  const { children, href, ...rest } = props
  return (
    <NextLink prefetch={false} href={href || ''} target="_blank">
      <AntdTypography.Link {...rest}>
        {children}
        <ExportOutlined style={{ fontSize: 12, marginLeft: 6 }} />
      </AntdTypography.Link>
    </NextLink>
  )
}

const Title = (props: TitleProps & React.RefAttributes<HTMLElement>) => {
  const { children, ...rest } = props
  return <AntdTypography.Title {...rest}>{children}</AntdTypography.Title>
}

const TextWeight500 = (props: TextProps & React.RefAttributes<HTMLElement>) => {
  const { children, style, ...rest } = props
  return (
    <AntdTypography.Text {...rest} style={{ fontWeight: '500', ...style }}>
      {children}
    </AntdTypography.Text>
  )
}

const Paragraph = (props: ParagraphProps & React.RefAttributes<HTMLElement>) => {
  const { children, ...rest } = props
  return <AntdTypography.Paragraph {...rest}>{children}</AntdTypography.Paragraph>
}

export const Typography = {
  Text,
  Link,
  LinkNewTab,
  Title,
  Paragraph,
  TextWeight500,
}
