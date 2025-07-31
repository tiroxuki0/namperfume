"use client"

import React, { isValidElement, ReactNode, useState } from "react"

import { CloseOutlined, FilterOutlined, RetweetOutlined, SearchOutlined } from "@ant-design/icons"
import {
  Table as AntdTable,
  Badge,
  Drawer,
  Form,
  FormInstance,
  Select,
  Space,
  Switch,
  TableProps,
  theme,
  Typography
} from "antd"
import { useTranslation } from "react-i18next"

import Button from "@components/Button"
import Flex from "@components/Flex"
import Input from "@components/Input"
import SelectResource from "@components/SelectResource"
import {
  CustomElementPropertyWithOutServer,
  FilteringProperty,
  SearchFilterPropertyWithOutServer,
  SelectFilterPropertyWithOutServer,
  SelectFilterPropertyWithServer,
  SwitchFilterProperty
} from "@models/entities/FilterProperty"
import { ObjectLiteral } from "@models/entities/ObjectLiteral"
import { usePermissions } from "@root/hooks/usePermissions"
import { AccessDeniedView } from "@components/AccessDeniedView"

import BulkActions from "./partials/BulkActions"
import { BulkActionType, paginationOptions } from "./types"

type ScrollConfig = {
  index?: number
  key?: React.Key
  top?: number
}
type Reference = {
  nativeElement: HTMLDivElement
  scrollTo: (config: ScrollConfig) => void
}

type Props<T> = {
  name?: string
  filterProperties?: FilteringProperty[]
  action?: ReactNode
  setFilteringQuery?: (payload: ObjectLiteral) => void
  selectedItems?: T[]
  bulkAction?: {
    options?: BulkActionType[]
    total?: number
    onClearSelection?: () => void
    onItemClick?: (id: string) => void
    customTitle?: (title: string) => ReactNode
    dataTestid?: string
  }
  showFilter?: boolean
  showSearch?: boolean
  onSearch?: (value: string) => void
  filterComponent?: ReactNode
  permission?: string
  title?: string
}

export type CustomTableType<T> = Props<T> &
  React.PropsWithChildren<Omit<TableProps<T>, "title">> &
  React.RefAttributes<Reference>

const CustomTable = <T,>(props: CustomTableType<T>) => {
  const {
    name,
    filterProperties,
    action,
    setFilteringQuery,
    bulkAction,
    selectedItems,
    pagination,
    showFilter = true,
    showSearch = true,
    onSearch,
    filterComponent,
    permission,
    dataSource,
    title,
    ...rest
  } = props

  const { token } = theme.useToken()

  const { checkPermission, status } = usePermissions("")

  const isAllowed = checkPermission(permission || "")

  const { t } = useTranslation("common")

  const { borderRadiusLG, colorBorderSecondary } = token

  const [open, setOpen] = useState(false)
  const [filteredCount, setFilteredCount] = useState(0)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const [form] = Form.useForm()

  const isSearchProperty = (
    filterProperty: FilteringProperty
  ): filterProperty is SearchFilterPropertyWithOutServer => {
    return (
      !filterProperty.shouldFetchFromServer &&
      !("options" in filterProperty) &&
      !("component" in filterProperty)
    )
  }

  const isServerlessSelectProperty = (
    filterProperty: FilteringProperty
  ): filterProperty is SelectFilterPropertyWithOutServer => {
    return (
      !filterProperty.shouldFetchFromServer &&
      "options" in filterProperty &&
      typeof filterProperty?.options === "object" &&
      Array.isArray(filterProperty?.options)
    )
  }

  const isServerProperty = (
    filterProperty: FilteringProperty
  ): filterProperty is SelectFilterPropertyWithServer => {
    return filterProperty?.shouldFetchFromServer || false
  }

  const isCustomComponentProperty = (
    filterProperty: FilteringProperty
  ): filterProperty is CustomElementPropertyWithOutServer => {
    return !filterProperty.shouldFetchFromServer && "component" in filterProperty
  }

  const isSwitchProperty = (
    filterProperty: FilteringProperty
  ): filterProperty is SwitchFilterProperty => {
    return filterProperty.type === "switch"
  }

  const { options, onClearSelection, total, onItemClick, customTitle } = bulkAction || {}

  const onCountFilteredFormSelected = () => {
    const values = form.getFieldsValue(true)
    const filteredCount = Object.values(values || {}).filter(value => value != null).length
    setFilteredCount(filteredCount)
  }

  //--------------------------------------------------------------------------> Render

  if (!isAllowed && status === "success") {
    return <AccessDeniedView />
  }

  return (
    <Flex vertical gap={showSearch || showFilter || action || title ? 24 : 4}>
      <Flex gap={4} justify="space-between">
        <Space>
          {title && (
            <Typography.Text
              style={{
                fontWeight: 500
              }}
            >
              {title}
            </Typography.Text>
          )}
          {showSearch && (
            <Input
              addonAfter={<SearchOutlined />}
              data-testid={`${name ? `${name}-` : ""}search-input`}
              placeholder="Search"
              onChange={ev => {
                onSearch?.(ev.target?.value)
              }}
            />
          )}
          {filterComponent}
          {showFilter && (
            <Button
              data-testid={`${name ? `${name}-` : ""}filter-button`}
              iconPosition="start"
              icon={
                <Badge count={filteredCount} offset={[0, -8]}>
                  <FilterOutlined />
                </Badge>
              }
              onClick={showDrawer}
            >
              {t("button.filter")}
            </Button>
          )}
          {filteredCount > 0 && (
            <Button
              data-testid={`${name ? `${name}-` : ""}clear-filter-button`}
              icon={<CloseOutlined />}
              iconPosition="start"
              type="link"
              onClick={() => {
                form.resetFields()
                form.submit()
              }}
            >
              {t("button.clearAllFilters")}
            </Button>
          )}
        </Space>

        {action && action}
      </Flex>

      {!!selectedItems?.length && !!options?.length && (
        <BulkActions
          bulkActions={options || []}
          customTitle={customTitle}
          name={name}
          totalItems={total}
          onClearSelection={() => onClearSelection?.()}
          onItemClick={(id: string) => {
            onItemClick?.(id)
          }}
        />
      )}

      <div
        style={{
          border: `1px solid ${colorBorderSecondary}`,
          borderRadius: borderRadiusLG
        }}
      >
        <AntdTable
          {...rest}
          {...(typeof pagination === "boolean" && !pagination
            ? {
                pagination: pagination
              }
            : {
                pagination: {
                  style: {
                    padding: "0 20px"
                  },
                  pageSizeOptions: [...paginationOptions],

                  showTotal: total => t("select.total", { total }),
                  position: ["bottomLeft"],
                  showSizeChanger: true,
                  ...pagination
                }
              })}
          dataSource={dataSource}
        />
      </div>

      <Drawer
        open={open}
        title="Filter"
        footer={
          <Flex justify="space-between">
            <Button
              data-testid={`${name ? `${name}-` : ""}reset-filter-button`}
              icon={<RetweetOutlined />}
              iconPosition="start"
              type="link"
              onClick={() => form.resetFields()}
            >
              {t("button.reset")}
            </Button>
            <Space>
              <Button
                data-testid={`${name ? `${name}-` : ""}cancel-filter-button`}
                onClick={onClose}
              >
                {t("button.cancel")}
              </Button>
              <Button
                data-testid={`${name ? `${name}-` : ""}submit-filter-button`}
                form="advanced-filter-form"
                htmlType="submit"
                key="submit"
                type="primary"
              >
                {t("button.apply")}
              </Button>
            </Space>
          </Flex>
        }
        onClose={onClose}
      >
        <Form
          layout="vertical"
          onValuesChange={(changed, all) => console.log("Changed:", changed, "All:", all)}
          onFinish={values => {
            setFilteringQuery?.(values)
            onClose()
            onCountFilteredFormSelected()
          }}
          form={form}
          /* 
           Please do not remove id attribute - research antd-form-remote-submit to know why
          */
          id="advanced-filter-form"
        >
          {(filterProperties || []).map((filterProperty, index) => {
            if (isSwitchProperty(filterProperty)) {
              return (
                <Form.Item
                  key={filterProperty?.key}
                  label={filterProperty?.propertyLabel}
                  name={filterProperty?.key}
                  valuePropName={filterProperty?.valuePropName}
                >
                  <Flex>
                    {filterProperty.labelFalsy && filterProperty.labelTruthy ? (
                      <Typography.Text style={{ marginRight: "8px" }}>
                        {filterProperty.labelFalsy}
                      </Typography.Text>
                    ) : (
                      ""
                    )}
                    <Switch
                      data-testid={filterProperty["data-testid"]}
                      defaultChecked={filterProperty.defaultChecked}
                      onChange={value => form.setFieldValue(filterProperty?.key, value)}
                    />
                    {filterProperty.labelFalsy && filterProperty.labelTruthy ? (
                      <Typography.Text style={{ marginLeft: "8px" }}>
                        {filterProperty.labelTruthy}
                      </Typography.Text>
                    ) : (
                      ""
                    )}
                  </Flex>
                </Form.Item>
              )
            }

            if (isSearchProperty(filterProperty)) {
              return (
                <Form.Item
                  key={filterProperty?.key}
                  label={filterProperty?.propertyLabel}
                  name={filterProperty?.key}
                >
                  <Input data-testid={filterProperty["data-testid"]} placeholder="Enter" />
                </Form.Item>
              )
            }

            if (isServerlessSelectProperty(filterProperty)) {
              return (
                <SelectWithoutServer filterProperty={filterProperty} key={`serverless-${index}`} />
              )
            }

            if (isCustomComponentProperty(filterProperty)) {
              return (
                <CustomComponentProperty
                  filterProperty={filterProperty}
                  form={form}
                  key={`custom-${index}`}
                />
              )
            }

            if (isServerProperty(filterProperty)) {
              return <ServerProperty filterProperty={filterProperty} key={`server-${index}`} />
            }

            return null
          })}
        </Form>
      </Drawer>
    </Flex>
  )
}

export default CustomTable

export const SelectWithoutServer = ({
  filterProperty
}: {
  filterProperty: SelectFilterPropertyWithOutServer
}) => {
  return (
    <Form.Item label={filterProperty?.propertyLabel} name={filterProperty?.key}>
      <Select
        allowClear
        showSearch
        data-testid={filterProperty["data-testid"]}
        mode={filterProperty?.mode}
        optionFilterProp="label"
        options={"options" in filterProperty ? filterProperty?.options : []}
        placeholder="Select"
      />
    </Form.Item>
  )
}

export const ServerProperty = ({
  filterProperty
}: {
  filterProperty: SelectFilterPropertyWithServer
}) => {
  return (
    <Form.Item
      extra={filterProperty?.propertyExtra}
      label={filterProperty?.propertyLabel}
      name={filterProperty?.key}
    >
      <SelectResource
        allowClear
        apiVersion={filterProperty?.apiVersion || "1"}
        dataTestId={filterProperty["data-testid"]}
        extraParams={filterProperty?.extraParams}
        labelField={filterProperty?.labelField || ""}
        labelRender={filterProperty?.labelRender}
        mode={filterProperty?.mode}
        needTranslate={filterProperty?.needTranslate}
        optionRender={filterProperty?.optionRender}
        placeholder="Select"
        resourceApiPath={filterProperty.apiPath}
        responseObject={filterProperty?.responseObject}
        shouldFetch={true}
        style={{ width: "100%" }}
        valueField={filterProperty?.valueField || ""}
      />
    </Form.Item>
  )
}

export const CustomComponentProperty = ({
  filterProperty
}: {
  filterProperty: CustomElementPropertyWithOutServer
  form: FormInstance<ObjectLiteral>
}) => {
  if (!isValidElement(filterProperty?.component)) return null

  return (
    <Form.Item
      extra={filterProperty?.propertyExtra}
      label={filterProperty?.propertyLabel}
      name={filterProperty?.key}
      valuePropName={filterProperty?.valuePropName}
    >
      {filterProperty.component}
    </Form.Item>
  )
}
