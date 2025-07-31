'use client'

import React from 'react'
import styles from './styles.module.css'
import Button from '@components/Button'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Flex from '@components/Flex'
import { Typography } from '@components/Typography'
import Image from 'next/image'

export default function Page() {
  const router = useRouter()
  const { t } = useTranslation()

  const onRedirect = () => {
    router.push('/')
  }

  //--------------------------------------------------------------------------> Render

  return (
    <div className={styles.frame}>
      <div className={styles.item}>
        <Flex vertical align="flex-start" gap={24}>
          <Typography.Text
            style={{
              fontWeight: 500,
              fontSize: 24,
            }}
          >
            {t('error.unauthorized.title')}
          </Typography.Text>
          <Image src="images/access-denied.svg" alt="403" width={62} height={94} />

          <Typography.Text
            style={{
              fontWeight: 400,
              fontSize: 14,
            }}
          >
            {t('error.unauthorized.description')}
          </Typography.Text>
          <Button type="primary" onClick={onRedirect} style={{ width: '100%' }}>
            {t('button.backToHomePage')}
          </Button>
        </Flex>
      </div>
    </div>
  )
}
