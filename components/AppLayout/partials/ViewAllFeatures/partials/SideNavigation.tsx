import { Menu } from '@models/entities/Menu'
import Flex from '@components/Flex'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import { theme } from 'antd'

interface Props {
  menu: Menu[]
  onChange?: (id: string) => void
  id?: string
}

const SideNavigation = ({ menu, onChange, id }: Props) => {
  const { token } = theme.useToken()

  return (
    <Flex vertical gap={8}>
      {(menu || []).map((item) => {
        return (
          <Flex
            key={item?.id?.toString()}
            onClick={() => onChange?.(item?.id?.toString() || '')}
            gap={4}
            justify="space-between"
            align="center"
            style={{
              padding: 12,
              ...(id === item?.id?.toString() && {
                borderRadius: 12,
                background: token.colorPrimaryBg,
              }),
            }}
          >
            <Typography.Text
              style={{
                cursor: 'pointer',
                ...(id === item?.id?.toString() && {
                  color: token.colorPrimary,
                }),
              }}
              onClick={() => onChange?.(item?.id?.toString() || '')}
            >
              {item?.name}
            </Typography.Text>
            <Image src="/images/customLeftArrow.svg" alt="left-arrow" width={10} height={9} />
          </Flex>
        )
      })}
    </Flex>
  )
}

export default SideNavigation
