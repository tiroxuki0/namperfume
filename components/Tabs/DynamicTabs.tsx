import React, { useState, ReactNode, useEffect, useRef } from "react"

import { Segmented } from "antd"
import { SegmentedProps } from "antd/lib/segmented"

interface DynamicTabsProps {
  tabLabels: string[]
  children: ReactNode | ReactNode[]
  defaultActiveTab?: number
  className?: string
  onChange?: (activeTab: number) => void
  segmentedProps?: Omit<SegmentedProps, "options" | "value" | "onChange">
  tabContentStyle?: React.CSSProperties
  lazyLoad?: boolean
  "data-testid"?: string
  enableScrollOnChange?: boolean // New prop to enable/disable scroll
  preRenderAll?: boolean
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({
  tabLabels,
  children,
  defaultActiveTab = 0,
  className = "",
  onChange,
  segmentedProps = {},
  tabContentStyle = {},
  lazyLoad = false,
  "data-testid": dataTestId,
  enableScrollOnChange = true, // Default to true
  preRenderAll = false
}) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab)
  const [renderedTabs, setRenderedTabs] = useState<number[]>([])
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (preRenderAll) {
      // If lazyLoad is false or preRenderAll is true, mark all tabs as rendered
      setRenderedTabs(tabLabels.map((_, index) => index))
    } else if (!renderedTabs.includes(activeTab)) {
      // Otherwise, only add the active tab to renderedTabs
      setRenderedTabs([...renderedTabs, activeTab])
    }
  }, [activeTab, lazyLoad, preRenderAll, tabLabels])

  useEffect(() => {
    if (defaultActiveTab !== undefined) {
      setActiveTab(defaultActiveTab)
    }
  }, [defaultActiveTab])

  const handleTabChange = (value: string | number) => {
    const tabIndex = Number(value)
    setActiveTab(tabIndex)

    if (enableScrollOnChange && tabsContainerRef.current) {
      setTimeout(() => {
        tabsContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        })
      }, 100)
    }

    if (onChange) {
      onChange(tabIndex)
    }
  }

  const options = tabLabels.map((label, index) => ({
    label,
    value: index
  }))

  const childrenArray = React.Children.toArray(children)

  return (
    <div className={`dynamic-tabs ${className}`} ref={tabsContainerRef}>
      <Segmented
        className="custom-segmented"
        data-testid={dataTestId}
        options={options}
        value={activeTab}
        onChange={handleTabChange}
        {...segmentedProps}
      />
      <div data-testid={`${dataTestId}-content`} style={{ marginTop: 20, ...tabContentStyle }}>
        {lazyLoad
          ? childrenArray.map((child, index) => (
              <div key={index} style={{ display: activeTab === index ? "block" : "none" }}>
                {(activeTab === index || renderedTabs.includes(index)) && child}
              </div>
            ))
          : childrenArray[activeTab]}
      </div>
    </div>
  )
}

export default DynamicTabs
