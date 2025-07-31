import { Menu } from '@models/entities/Menu'
import { Col, Row, theme } from 'antd'
import CardRadius from '@components/Card'
import Flex from '@components/Flex'
import { Typography } from '@components/Typography'
import Button from '@components/Button'
import { ExportOutlined } from '@ant-design/icons'
import { useRecursiveMenuNavigation } from '@root/hooks/useRecursiveMenuNavigation'

const ItemNavigation = ({
  items,
  onChange,
  selectedId,
}: {
  items: Menu[] | undefined
  onChange?: (path: string) => void
  selectedId?: string
}) => {
  const { getAllKeys } = useRecursiveMenuNavigation()

  const { token } = theme.useToken()

  return (
    <Row gutter={[24, 24]}>
      {(items || []).map((item) => {
        const allKeys = getAllKeys([item])
        const isMatched = allKeys.includes(selectedId as string)
        return (
          <Col span={24} key={item?.id}>
            <CardRadius
              style={{
                ...(isMatched && {
                  border: `1px solid ${token.colorPrimary}`,
                  background: token.colorFillTertiary,
                }),
              }}
              styles={{
                body: {
                  padding: 16,
                },
              }}
            >
              <Flex vertical gap={12}>
                <Flex vertical gap={4}>
                  {item?.children?.length > 0 ? (
                    <Typography.Text
                      style={{
                        fontWeight: 500,
                        fontSize: 16,
                        margin: 0,
                      }}
                    >
                      {item?.name}
                    </Typography.Text>
                  ) : (
                    <Typography.Link
                      onClick={(ev) => {
                        ev.preventDefault()
                        onChange?.(item?.path || '')
                      }}
                      style={{
                        fontWeight: 500,
                        fontSize: 16,
                        margin: 0,
                      }}
                    >
                      {item?.name}
                    </Typography.Link>
                  )}

                  {item?.children && (
                    <div>
                      {item?.children?.map((t) => {
                        return (
                          <ButtonLink
                            onClick={(path: string) => {
                              onChange?.(path)
                            }}
                            key={t?.id}
                            menu={t}
                            selectedId={selectedId}
                          />
                        )
                      })}
                    </div>
                  )}
                </Flex>
              </Flex>
            </CardRadius>
          </Col>
        )
      })}
    </Row>
  )
}

const ButtonLink = ({
  menu,
  onClick,
  selectedId,
}: {
  selectedId?: string
  menu: Menu
  onClick?: (path: string) => void
}) => {
  if (menu?.children?.length > 0) {
    return (
      <>
        {menu?.children?.map((t) => {
          return <ButtonLink selectedId={selectedId} onClick={onClick} key={t?.id} menu={t} />
        })}
      </>
    )
  }

  return (
    <Button
      size={'small'}
      onClick={() => onClick?.(menu?.path || '')}
      icon={<ExportOutlined />}
      type="link"
      style={{
        textDecoration: selectedId === menu?.path ? 'underline' : '',
      }}
    >
      {menu?.name}
    </Button>
  )
}

export default ItemNavigation
