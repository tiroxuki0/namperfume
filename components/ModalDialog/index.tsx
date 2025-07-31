import { Modal, ModalProps, Typography } from 'antd'
import { theme } from 'antd'
import { isValidElement, useMemo } from 'react'

const ModalDialog = (props: ModalProps) => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken()

  const { title, ...rest } = props

  const promptTitle = useMemo(() => {
    if (isValidElement(title)) return title
    return (
      <Typography.Text
        style={{
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        {title}
      </Typography.Text>
    )
  }, [title])

  //--------------------------------------------------------------------------> Render

  return (
    <Modal
      {...rest}
      title={promptTitle}
      styles={{
        header: {
          padding: '16px 24px 16px 24px',
          borderBottom: `2px solid ${colorBorderSecondary}`,
          ...props?.styles?.header,
        },
        footer: {
          padding: '8px 24px 8px',
          borderTop: `2px solid ${colorBorderSecondary}`,
          ...props?.styles?.footer,
        },
        body: {
          padding: '12px 24px 0px',
          ...props?.styles?.body,
        },
        content: {
          padding: 0,
          ...props?.styles?.content,
        },
      }}
    />
  )
}

export default ModalDialog
