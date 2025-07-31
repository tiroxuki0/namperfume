import { LoadingOutlined } from '@ant-design/icons'
import { AccessDeniedView } from '@components/AccessDeniedView'
import CardRadius from '@components/Card'
import Flex from '@components/Flex'
import { Typography } from '@components/Typography'
import { usePermissions } from '@root/hooks/usePermissions'
import { Col, Row, Space, Spin, theme } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'

const GeneralDetails = ({
  items,
  columns = 2,
  title = 'General information',
  loading,
  action = null,
  emptyView = null,
  showEmptyView = false,
  styles,
  titleInBoard = '',
  permission,
  style,
}: {
  items: { label: ReactNode; value: ReactNode; icon?: ReactNode; defaultLabel?: string }[]
  columns: number
  title?: string
  loading?: boolean
  action?: ReactNode
  emptyView?: ReactNode
  showEmptyView?: boolean
  titleInBoard?: string
  styles?: {
    header?: React.CSSProperties
    body?: React.CSSProperties
    extra?: React.CSSProperties
    title?: React.CSSProperties
    actions?: React.CSSProperties
    cover?: React.CSSProperties
  }
  permission?: string
  style?: React.CSSProperties
}) => {
  const [span, setSpan] = useState<number>(0)

  useEffect(() => {
    setSpan(24 / columns)
  }, [columns])

  const { checkPermission, isLoading: isPermissionLoading, status } = usePermissions('')

  const isAllowed = checkPermission(permission || '')

  //--------------------------------------------------------------------------> Render

  if (!isAllowed && status === 'success') {
    return <AccessDeniedView />
  }

  return (
    <Flex vertical gap={8}>
      {title && (
        <Flex justify="space-between" align="center">
          <Typography.Title level={5} style={{ margin: 0, fontWeight: 500 }}>
            {title}
          </Typography.Title>
          {action}
        </Flex>
      )}
      <CardRadius
        style={style}
        styles={{
          body: {
            padding: '16px 0',
            ...styles?.body,
          },
        }}
      >
        {titleInBoard && (
          <Typography.TextWeight500 style={{ marginLeft: 16 }}>
            {titleInBoard}
          </Typography.TextWeight500>
        )}

        {showEmptyView ? (
          emptyView
        ) : (
          <Row>
            {(items || []).map(
              (
                item: {
                  label: ReactNode
                  value: ReactNode
                  icon?: ReactNode
                  defaultLabel?: string
                },
                index: number
              ) => {
                const border = (index + 1) % columns !== 0
                return (
                  <Attribute
                    defaultLabel={item?.defaultLabel ?? ''}
                    label={item?.label}
                    key={index}
                    value={item?.value}
                    borderRight={border}
                    span={span}
                    icon={item?.icon}
                    loading={loading || isPermissionLoading}
                  />
                )
              }
            )}
          </Row>
        )}
      </CardRadius>
    </Flex>
  )
}

export const Attribute = ({
  label,
  value,
  borderRight = false,
  span,
  loading,
  styles = {},
  defaultLabel,
}: {
  label: ReactNode
  value: ReactNode
  borderRight?: boolean
  span?: number
  icon?: React.ReactNode
  loading?: boolean
  styles?: object
  defaultLabel?: string
}) => {
  const {
    token: { colorBorderSecondary, lineType },
  } = theme.useToken()

  //--------------------------------------------------------------------------> Render

  const renderLabel = label || defaultLabel

  return (
    <Col
      span={span}
      style={{
        ...(borderRight && {
          borderRight: `1px ${lineType} ${colorBorderSecondary}`,
        }),
        padding: 16,
        paddingTop: 0,
        ...styles,
      }}
    >
      <Row>
        <Col span={24}>
          <Space>
            <Typography.Text
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
              type="secondary"
            >
              {renderLabel}
            </Typography.Text>
          </Space>
        </Col>

        <Col span={24}>
          {loading ? (
            <Spin indicator={<LoadingOutlined spin />} size="small" />
          ) : (
            <Typography.Text>{value}</Typography.Text>
          )}
        </Col>
      </Row>
    </Col>
  )
}

export default GeneralDetails
