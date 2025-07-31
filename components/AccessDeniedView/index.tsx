import Image from "next/image"

import Flex from "@components/Flex"
import { Typography } from "@components/Typography"

export const AccessDeniedView = () => {
  return (
    <Flex vertical align="center" gap={12} style={{ paddingTop: 12 }}>
      <Image alt="open_in_new" height={64} src="/images/access-denied-view.svg" width={64} />

      <Typography.Text
        type="secondary"
        style={{
          fontWeight: 700,
          fontSize: 14
        }}
      >
        You don’t have permission to access this feature
      </Typography.Text>

      <Typography.Text
        type="secondary"
        style={{
          fontWeight: 400,
          fontSize: 14
        }}
      >
        Please contact your administrator for assistance
      </Typography.Text>
    </Flex>
  )
}
