import { useEffect, useMemo, useRef, useState } from "react"

import { useRouter } from "next/navigation"
import { Col, Divider, Empty, Input, InputRef, Row } from "antd"

import ItemNavigation from "@components/AppLayout/partials/ViewAllFeatures/partials/ItemNavigation"
import SideNavigation from "@components/AppLayout/partials/ViewAllFeatures/partials/SideNavigation"
import Flex from "@components/Flex"
import ModalDialog from "@components/ModalDialog"
import { Menu } from "@models/entities/Menu"
import { colorFillBackground } from "@root/design-tokens"
import { useDebounceCallback } from "@root/hooks/useDebounce"
import { useRecursiveMenuNavigation } from "@root/hooks/useRecursiveMenuNavigation"
import { useGetMenu } from "@root/queries/useGetMenu"
// import { env } from 'next-runtime-env'

interface Props {
  onClose: () => void
}

// const docsURL = env('NEXT_PUBLIC_DOCS_URL') || ''

const filterDataByName = (data: Menu[], name: string) => {
  return data
    .map((parent: Menu) => {
      // Recursively filter children first
      const filteredChildren: Menu[] = parent.children
        ? filterDataByName(parent.children, name).filter(Boolean)
        : []

      // Check if the parent name matches
      const parentMatches =
        (parent.name || "").toLowerCase().includes(name.toLowerCase()) || parent.path === name

      // If parent matches, keep all its children
      if (parentMatches) {
        return { ...parent }
      }

      // If any child matches, return only the relevant children
      if (filteredChildren.length > 0) {
        return { ...parent, children: filteredChildren }
      }

      return null
    })
    .filter(Boolean) as Menu[] // Remove null values
}

const ViewAllFeatures = ({ onClose }: Props) => {
  const { menu } = useGetMenu()

  const { defaultOpenKeys } = useRecursiveMenuNavigation()

  const defaultOpenKeysRefs = useRef<string[]>(defaultOpenKeys)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const startKey = (defaultOpenKeysRefs?.current || []).at(0) || ""
  const endKey = (defaultOpenKeysRefs?.current || []).at(-1) || ""

  const [search, setSearch] = useState<string>("")

  const debounced = useDebounceCallback(setSearch, 500)

  const filteredMenu = useMemo(() => {
    if (!search) return menu
    defaultOpenKeysRefs.current = []

    return filterDataByName(menu || [], search)
  }, [menu, search])

  useEffect(() => {
    if (filteredMenu?.length && (defaultOpenKeysRefs.current || []).length === 0) {
      const [firstMenu] = filteredMenu || []
      if (firstMenu?.id) {
        setSelectedId(firstMenu.id.toString())
      }
    }
  }, [filteredMenu])

  const onSelectMenu = (id: string) => {
    setSelectedId(id)
  }

  const inputRef = useRef<InputRef | null>(null)

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current?.focus()
    }
    return () => {
      inputRef.current = null
      defaultOpenKeysRefs.current = []
    }
  }, [])

  return (
    <ModalDialog
      open
      title="All features"
      width={960}
      styles={{
        body: { padding: 8, paddingTop: 0, paddingBottom: 0 },
        header: {
          marginBottom: 0
        },
        footer: {
          marginTop: 0
        }
      }}
      onCancel={onClose}
      footer={null}
      // footer={[
      //   <Flex key={'documentation'}>
      //     <Typography.Link target="_blank" href={docsURL}>
      //       <Space>
      //         <FileUnknownOutlined />
      //         Documentation
      //       </Space>
      //     </Typography.Link>
      //   </Flex>,
      // ]}
    >
      <Flex vertical gap={12} style={{ paddingTop: 12 }}>
        <Input.Search
          placeholder="Search"
          ref={inputRef}
          style={{ width: "25%" }}
          onChange={ev => debounced(ev.target.value)}
          onSearch={value => {
            debounced(value)
          }}
        />
        <Divider style={{ margin: 0 }} />
        <MenuSpotLight
          menu={filteredMenu || []}
          selectedChildrenId={endKey || ""}
          selectedParentId={selectedId || startKey}
          onClose={onClose}
          onSelectMenu={onSelectMenu}
        />
      </Flex>
    </ModalDialog>
  )
}

interface MenuProps {
  selectedParentId?: string | null
  onSelectMenu: (value: string) => void
  onClose: () => void
  menu: Menu[] | undefined
  selectedChildrenId?: string | null
}

const MenuSpotLight = ({
  selectedParentId,
  onSelectMenu,
  onClose,
  menu,
  selectedChildrenId
}: MenuProps) => {
  const { push } = useRouter()

  const filterMenuById = (m: Menu) => (m.id || "").toString() === selectedParentId

  const flattenMenu = (m: Menu) => m.children

  const selectedMenusItems = (menu || []).filter(filterMenuById).flatMap(flattenMenu)
  if ((menu || [])?.length === 0) {
    return <Empty description={false} />
  }

  return (
    <Row gutter={[12, 12]} style={{ marginTop: -12 }}>
      <Col
        span={6}
        style={{ padding: 12, background: colorFillBackground, borderRight: "1px solid #D9D9D9" }}
      >
        <SideNavigation id={selectedParentId || ""} menu={menu || []} onChange={onSelectMenu} />
      </Col>
      <Col
        span={18}
        style={{
          maxHeight: "60vh",
          overflow: "auto",
          padding: 12
        }}
      >
        <ItemNavigation
          items={selectedMenusItems || []}
          selectedId={selectedChildrenId || ""}
          onChange={(path: string) => {
            push(path)
            onClose?.()
          }}
        />
      </Col>
    </Row>
  )
}

export default ViewAllFeatures
