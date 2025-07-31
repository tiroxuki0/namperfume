'use client'

import React, { useState } from 'react'
import { Avatar, Dropdown, theme } from 'antd'
import { Typography } from '@components/Typography'
import styles from './style.module.css'
import LogoutPrompt from './LogoutPrompt'
import { useRouter } from 'next/navigation'
import ROUTE from '@utils/pageRoutes'
import Image from 'next/image'

type UserBulkActionType = 'profile' | 'logout'

const UserBulkAction = {
  ManageProfile: 'profile' as UserBulkActionType,
  Logout: 'logout' as UserBulkActionType,
}

const App = ({
  username,
  menuItems,
}: {
  username?: string
  menuItems?: { key: string; text: string; url: string }[]
}) => {
  const {
    token: { colorBgContainer, colorPrimaryBg, geekblue },
  } = theme.useToken()
  const [action, setAction] = useState<string | null>(null)

  const router = useRouter()

  const onClick = (item: { key: string; text: string; url: string }) => {
    if (item.key === UserBulkAction.Logout) {
      setAction(item?.key)
      return
    }
    router.push(ROUTE.PROFILE.LIST)
  }

  const onClose = () => setAction(null)

  const avatar = (username || []).slice(0, 1)

  //--------------------------------------------------------------------------> Render

  return (
    <>
      <Dropdown
        menu={{
          items: (menuItems || []).map((item) => ({
            key: item?.key,
            label: item?.text,
            href: item?.url,
            onClick: () => onClick(item),
          })),
        }}
        trigger={['click']}
      >
        <div className={styles.frame}>
          <Avatar
            style={{ backgroundColor: colorPrimaryBg, color: geekblue, textTransform: 'uppercase' }}
            shape="square"
          >
            {avatar}
          </Avatar>

          <div className={styles.item}>
            <Typography.Text style={{ color: colorBgContainer }}>{username}</Typography.Text>
          </div>

          <Image src="/images/customArrowDown.svg" alt="svg" width={8} height={8} />
        </div>
      </Dropdown>

      {action === UserBulkAction.Logout && <LogoutPrompt onClose={onClose} />}
    </>
  )
}

export default App
