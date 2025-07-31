'use client'

import Button from '@components/Button'
import Divider from '@components/Divider'
import Flex from '@components/Flex'
import { Typography } from '@components/Typography'
import { Card, Space, theme } from 'antd'
import React, { ReactNode } from 'react'
import { RetweetOutlined } from '@ant-design/icons'
import ConfigProvider from '@components/ConfigProvider'
import { borderRadius } from '@root/design-tokens'
import { pluralizeSelected } from '@utils/helper'
import { BulkActionType } from '../types'
import { usePermissions } from '@root/hooks/usePermissions'

interface Props {
  name?: string
  totalItems?: number
  onClearSelection: () => void
  bulkActions: BulkActionType[]
  onItemClick?: (id: string) => void
  customTitle?: (title: string) => ReactNode
}

const BulkActions = ({
  name,
  totalItems,
  onClearSelection,
  bulkActions,
  onItemClick,
  customTitle,
}: Props) => {
  const {
    token: { colorPrimary },
  } = theme.useToken()

  const { checkPermission } = usePermissions('')

  const bulkActionsWithPermission = (bulkActions || []).filter(({ permission }) => {
    return checkPermission?.(permission || '')
  })

  if (bulkActionsWithPermission?.length === 0) return null

  //--------------------------------------------------------------------------> Render

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            borderRadiusLG: borderRadius,
          },
        },
      }}
    >
      <div>
        <Card
          style={{
            border: `1px solid ${colorPrimary}`,
            borderRadius: borderRadius,
          }}
          styles={{
            body: {
              padding: '4px 12px',
            },
          }}
        >
          <Flex gap={8} align="center" justify="space-between">
            <Typography.Text
              style={{
                wordBreak: 'keep-all',
              }}
              strong
            >
              {customTitle?.(`${pluralizeSelected(totalItems)} selected:}`) ||
                `${pluralizeSelected(totalItems)} selected:`}
            </Typography.Text>

            <div>
              <Space>
                {(bulkActionsWithPermission || []).map((bulkAction) => {
                  const { text, id, permission, ...rest } = bulkAction
                  const { isHide } = rest

                  const isAllowToClick = checkPermission?.(permission || '')

                  if (!isAllowToClick) return null
                  if (isHide) return null

                  return (
                    <>
                      <Button key={id} onClick={() => onItemClick?.(id)} {...rest} type="text">
                        {text}
                      </Button>
                      <Divider type="vertical" />
                    </>
                  )
                })}
              </Space>
              <Button
                type="link"
                icon={<RetweetOutlined />}
                iconPosition="start"
                onClick={onClearSelection}
                data-testid={`${name ? `${name}-` : ''}selection-clear-button`}
              >
                Clear selection
              </Button>
            </div>
          </Flex>
        </Card>
      </div>
    </ConfigProvider>
  )
}

export default BulkActions
