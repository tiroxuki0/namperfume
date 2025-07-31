import Flex from '@components/Flex'
import Image from 'next/image'
import { Typography } from '@components/Typography'

export const AccessDeniedView = () => {
  return (
    <Flex vertical gap={12} align="center" style={{ paddingTop: 12 }}>
      <Image width={64} height={64} src="/images/access-denied-view.svg" alt="open_in_new" />

      <Typography.Text
        type="secondary"
        style={{
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        You don’t have permission to access this feature
      </Typography.Text>

      <Typography.Text
        type="secondary"
        style={{
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        Please contact your administrator for assistance
      </Typography.Text>
    </Flex>
  )
}
