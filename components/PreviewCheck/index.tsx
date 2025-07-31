import { Typography } from '@components/Typography'
import { CopyConfig } from 'antd/lib/typography/Base'
import { useTranslation } from 'react-i18next'

const PreviewCheck = ({
  attributes,
  copyable,
  isSecondary = false,
}: {
  attributes: {
    id?: string
    uuid?: string
    name?: string
  }[]
  copyable?: boolean | CopyConfig | undefined
  isSecondary?: boolean | undefined
}) => {
  const { t } = useTranslation()

  return (
    <ul style={{ margin: 0, paddingLeft: 20, paddingTop: 8 }}>
      {(attributes || []).map((attribute) => {
        return (
          <li key={attribute?.uuid ?? attribute?.id}>
            <Typography.Text strong>{attribute?.name}</Typography.Text>&nbsp;
            <Typography.Text
              type="secondary"
              copyable={
                typeof copyable === 'undefined'
                  ? {
                      text: attribute?.id ?? attribute?.uuid,
                    }
                  : copyable
              }
            >
              (
              <Typography.Text type={isSecondary ? 'secondary' : undefined}>
                {t('title.id')}
              </Typography.Text>
              :{' '}
              <Typography.Text
                type={isSecondary ? 'secondary' : undefined}
                ellipsis
                style={{ maxWidth: '60%' }}
              >
                {attribute?.id ?? attribute?.uuid}
              </Typography.Text>
              )
            </Typography.Text>
          </li>
        )
      })}
    </ul>
  )
}

export default PreviewCheck
