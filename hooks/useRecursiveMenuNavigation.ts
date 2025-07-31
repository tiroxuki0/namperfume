import { Menu as MenuType } from "@models/entities/Menu"
import { usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"
import { DEFAULT_ROUTE } from "@root/constant"
import { ItemType } from "antd/es/menu/interface"
import { useGetMenu } from "@root/queries/useGetMenu"

export const useRecursiveMenuNavigation = () => {
  const { menu: menuItems } = useGetMenu()

  function filterDataByPath(data: MenuType[], name: string): MenuType[] {
    return data
      .map((parent) => {
        // Recursively filter children first
        const filteredChildren = parent.children ? filterDataByPath(parent.children, name).filter(Boolean) : []

        // Check if the parent name matches
        const parentMatches = parent.path === name

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
      .filter(Boolean) as MenuType[]
  }

  function getAllKeys(nodes: MenuType[]): string[] {
    let ids: string[] = []

    for (const node of nodes) {
      ids.push(node.children?.length > 0 ? (node?.id || "").toString() : node?.path || "")
      if (node.children && node.children.length > 0) {
        ids = ids.concat(getAllKeys(node.children))
      }
    }

    return ids
  }

  function getAllPaths(data: MenuType[]): string[] {
    let paths: string[] = []

    data.forEach((item) => {
      // Add the path of the current item
      if (item.path && item.path !== "#") {
        paths.push(item.path)
      }
      // Recursively add paths from the children
      if (item.children && item.children.length > 0) {
        paths = paths.concat(getAllPaths(item.children))
      }
    })

    return paths.filter(Boolean)
  }

  const splitString = (path: string) => {
    const s = path.split("/").slice(0, path.split("/").length - 1)
    return s.join("/")
  }

  const filterMenuByPathName = (pathName: string, menuItems: MenuType[]) => {
    const allPaths = getAllPaths(menuItems)

    return findPathName(pathName, allPaths)
  }

  const findPathName = (pathName: string, allPaths: string[]) => {
    const results = allPaths.filter((path) => path === pathName)
    if (results.length === 0) {
      const newPathName = splitString(pathName)
      if (!newPathName) return []
      return findPathName(newPathName, allPaths)
    }
    return allPaths.filter((path) => path === pathName)
  }

  const urlPathName = usePathname()

  const pathname = useMemo(() => {
    if (urlPathName === "/" || !urlPathName) return DEFAULT_ROUTE

    const paths = filterMenuByPathName(urlPathName, menuItems || [])

    const [path] = paths

    return path
  }, [urlPathName, menuItems])

  const findItemsByPath = useCallback((path: string, items: MenuType[]): MenuType[] => {
    return items.filter((item) => {
      if ("children" in item && item?.children?.length > 0) {
        return !!findItemsByPath(path, item?.children)?.length
      }
      return item?.path === path
    })
  }, [])

  const selectedMenus = useMemo(() => {
    return findItemsByPath(pathname, menuItems || [])
  }, [findItemsByPath, pathname, menuItems])

  const handleSubMenuItem = useCallback((subitem: MenuType): ItemType => {
    if ("children" in subitem && (subitem.children || []).length > 0) {
      return {
        key: subitem?.id?.toString() || "",
        label: subitem?.name,
        children: (subitem?.children || []).map(handleSubMenuItem)
      }
    }

    return {
      key: subitem?.path || "",
      label: subitem?.name
    }
  }, [])

  const handleMenu = useCallback(
    (menuItem: MenuType): ItemType => {
      if (!!menuItem.children?.length) {
        return {
          key: menuItem?.id?.toString() || "",
          label: menuItem?.name || "",
          children: (menuItem.children || []).map(handleSubMenuItem)
        }
      }

      return {
        key: menuItem?.id?.toString() || "",
        label: menuItem?.name
      }
    },
    [handleSubMenuItem]
  )

  const items = useMemo(() => {
    return (selectedMenus || []).map((menu: MenuType) => handleMenu(menu))
  }, [selectedMenus, handleMenu])

  const flattenedChildren = (items || []).flatMap((item) => (item && "children" in item ? item?.children : [])).filter(Boolean) as ItemType[]

  return {
    items,
    pathname,
    defaultOpenKeys: getAllKeys(filterDataByPath(menuItems || [], pathname)),
    flattenedChildren,
    getAllKeys
  }
}
