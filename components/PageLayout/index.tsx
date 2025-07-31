import React, { ReactNode, useMemo } from "react"

import { ArrowLeftOutlined } from "@ant-design/icons"
import { BreadcrumbProps, Card, Col, Row, Skeleton, theme } from "antd"
import { AnyObject } from "antd/es/_util/type"
import classNames from "classnames"

import Breadcrumb from "@components/Breadcrumb"
import Flex from "@components/Flex"
import { Typography } from "@components/Typography"
import { useStateMenu } from "@root/stores/menu/store"

import footerStyles from "./styles.module.css"

type HeaderBreadcrumbProps<T extends AnyObject> = BreadcrumbProps<T>

interface Props<T extends AnyObject> {
  breadcrumb?: HeaderBreadcrumbProps<T>
  extra?: ReactNode
  title: ReactNode
  subTitle?: ReactNode
  backIcon?: ReactNode | boolean
  children?: ReactNode
  onBack?: () => void
  split?: boolean
  styles?: {
    header?: React.CSSProperties
    body?: React.CSSProperties
    extra?: React.CSSProperties
    title?: React.CSSProperties
    actions?: React.CSSProperties
    cover?: React.CSSProperties
  }
  type?: "banner" | "card"
  loading?: boolean
  footer?: ReactNode
  isFetching?: boolean
}

const PageLayout = <T extends AnyObject>(props: Props<T>) => {
  const {
    breadcrumb,
    extra,
    title,
    subTitle,
    backIcon,
    children,
    onBack,
    styles,
    type = "card",
    loading,
    footer,
    isFetching
  } = props

  const {
    token: { colorPrimaryBg, colorFillTertiary, colorFillSecondary }
  } = theme.useToken()

  const { collapsed } = useStateMenu()

  const renderIcon = useMemo(() => {
    if (typeof backIcon === "boolean" && !backIcon) return null

    return <ArrowLeftOutlined onClick={() => onBack?.()} />
  }, [backIcon, onBack])

  const renderTitle = useMemo(() => {
    if (typeof title === "string") {
      return isFetching || loading ? (
        <Skeleton.Input
          active
          style={{
            height: 24
          }}
        />
      ) : (
        <Typography.Title level={4} style={{ margin: 0, fontWeight: 500, fontSize: 24 }}>
          {title}
        </Typography.Title>
      )
    }
    return title
  }, [title, isFetching, loading])

  const renderSubtitle = useMemo(() => {
    if (typeof subTitle === "string") {
      return (
        <Typography.Text style={{ margin: 0 }} type="secondary">
          {subTitle}
        </Typography.Text>
      )
    }
    return subTitle
  }, [subTitle])

  const renderBreadcrumb = useMemo(() => {
    if (typeof breadcrumb === "undefined") return null

    const { items } = breadcrumb

    const breadcrumbItems = (items || []).map(item => {
      const { href, title, ...rest } = item
      if (href) {
        return {
          ...rest,
          title: <Typography.Link href={href}>{title}</Typography.Link>
        }
      }
      return item
    })
    return {
      ...breadcrumb,
      items: breadcrumbItems
    }
  }, [breadcrumb])

  //--------------------------------------------------------------------------> Render

  return (
    <Card
      key="title"
      loading={loading}
      style={{
        border: "none"
      }}
      styles={{
        header: {
          padding: "16px 24px",
          fontWeight: 400,
          ...(type === "banner" && {
            backgroundImage: `url(/images/pac.svg)`,
            backgroundPosition: "right -20px top 0",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            backgroundOrigin: "padding-box",
            backgroundClip: "border-box",
            backgroundColor: colorPrimaryBg,
            padding: 24,
            borderRadius: 0
          }),
          ...styles?.header
        },
        body: {
          padding: "8px 24px"
        },
        title: {
          fontWeight: "normal"
        },
        ...styles
      }}
      title={
        <Row gutter={[12, 12]}>
          {typeof breadcrumb !== "undefined" && (
            <Col span={24}>
              <Breadcrumb {...renderBreadcrumb} />
            </Col>
          )}

          <Col span={24}>
            <Flex align="center" justify="space-between">
              <Flex align="baseline" gap={8}>
                {renderIcon}
                <Flex vertical gap={8}>
                  {renderTitle}
                  {renderSubtitle}
                </Flex>
              </Flex>
              {extra && extra}
            </Flex>
          </Col>
        </Row>
      }
    >
      <Row>{children && <Col span={24}>{children}</Col>}</Row>{" "}
      {footer && (
        <Col
          span={24}
          className={classNames(footerStyles.footer, {
            [footerStyles.expand]: !collapsed
          })}
          style={{
            borderTop: `1px solid ${colorFillSecondary}`,
            background: colorFillTertiary
          }}
        >
          {footer}
        </Col>
      )}
    </Card>
  )
}

export default PageLayout
