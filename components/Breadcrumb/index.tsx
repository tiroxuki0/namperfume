import { Breadcrumb as AntBreadcrumb, BreadcrumbProps } from "antd"
import { AnyObject } from "antd/es/_util/type"

type Props<T extends AnyObject> = BreadcrumbProps<T>

const Breadcrumb = <T extends AnyObject>(props: Props<T>) => {
  const { children, items, ...rest } = props

  // Handle breadcrumb items to limit levels
  const processedItems =
    items && items?.length > 5
      ? [
          ...items.slice(0, 2), // First two levels
          { title: "..." }, // Ellipsis for middle levels
          ...items.slice(items.length - 3) // Last three levels
        ]
      : items

  return (
    <AntBreadcrumb {...rest} items={processedItems}>
      {children}
    </AntBreadcrumb>
  )
}

export default Breadcrumb
