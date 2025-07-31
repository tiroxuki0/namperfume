import Image from "next/image"
import { theme } from "antd"

import { Menu } from "@models/entities/Menu"
import Flex from "@components/Flex"
import { Typography } from "@components/Typography"

interface Props {
  menu: Menu[]
  onChange?: (id: string) => void
  id?: string
}

const SideNavigation = ({ menu, onChange, id }: Props) => {
  const { token } = theme.useToken()

  return (
    <Flex vertical gap={8}>
      {(menu || []).map(item => {
        return (
          <Flex
            align="center"
            gap={4}
            justify="space-between"
            key={item?.id?.toString()}
            style={{
              padding: 12,
              ...(id === item?.id?.toString() && {
                borderRadius: 12,
                background: token.colorPrimaryBg
              })
            }}
            onClick={() => onChange?.(item?.id?.toString() || "")}
          >
            <Typography.Text
              style={{
                cursor: "pointer",
                ...(id === item?.id?.toString() && {
                  color: token.colorPrimary
                })
              }}
              onClick={() => onChange?.(item?.id?.toString() || "")}
            >
              {item?.name}
            </Typography.Text>
            <Image alt="left-arrow" height={9} src="/images/customLeftArrow.svg" width={10} />
          </Flex>
        )
      })}
    </Flex>
  )
}

export default SideNavigation
