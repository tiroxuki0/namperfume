import React from 'react'
import { CardProps, Card } from 'antd'
import { borderRadius } from '@root/design-tokens'

const CardRadius = (props: CardProps) => {
  const { children, style, ...rest } = props

  return (
    <Card
      {...rest}
      style={{
        borderRadius: borderRadius,
        background: style?.backgroundColor,
        ...style,
      }}
      styles={{
        body: {
          ...rest.styles?.body,
        },
        ...rest.styles,
      }}
    >
      {children}
    </Card>
  )
}

export default CardRadius
