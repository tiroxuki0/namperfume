import { GetProps } from 'antd'
import Icon from '@ant-design/icons'
import React from 'react'

const AccountIconOutlined = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 12.1475H14V14.1475H16V12.1475ZM16 8.14746H14V10.1475H16V8.14746ZM18 16.1475H10V14.1475H12V12.1475H10V10.1475H12V8.14746H10V6.14746H18V16.1475ZM8 4.14746H6V2.14746H8V4.14746ZM8 8.14746H6V6.14746H8V8.14746ZM8 12.1475H6V10.1475H8V12.1475ZM8 16.1475H6V14.1475H8V16.1475ZM4 4.14746H2V2.14746H4V4.14746ZM4 8.14746H2V6.14746H4V8.14746ZM4 12.1475H2V10.1475H4V12.1475ZM4 16.1475H2V14.1475H4V16.1475ZM10 4.14746V0.147461H0V18.1475H20V4.14746H10Z"
        fill="currentColor"
      />
    </svg>
  )
}

type CustomIconComponentProps = GetProps<typeof Icon>

export const AccountOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AccountIconOutlined} {...props} />
)
