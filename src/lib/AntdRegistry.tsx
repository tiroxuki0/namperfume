'use client'

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import ConfigProvider from '@components/ConfigProvider'
import {
  borderRadius,
  card,
  colorFillTertiary,
  colorPrimary,
  controlHeight,
  darkItemBgMnu,
  darkItemSelectedBg,
} from '@root/design-tokens'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { theme } from 'antd'
import { DM_Sans } from 'next/font/google'
import { useServerInsertedHTML } from 'next/navigation'
import React from 'react'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken()

  const queryClient = new QueryClient()

  const cache = React.useMemo<Entity>(() => createCache(), [])

  const isServerInserted = React.useRef<boolean>(false)

  //--------------------------------------------------------------------------> Use effect

  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (isServerInserted.current) {
      return
    }
    isServerInserted.current = true
    return <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  })

  //--------------------------------------------------------------------------> Render

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          hashed: false,
          // customize theme
          token: {
            fontFamily: dmSans.style.fontFamily,
            colorPrimary: colorPrimary,
            controlHeight: controlHeight,
            colorLink: colorPrimary,
            colorFillTertiary: colorFillTertiary,
            controlItemBgHover: colorBgLayout,
            controlItemBgActive: '#F0F5FF',
          },
          components: {
            Menu: {
              darkItemBg: darkItemBgMnu,
              darkSubMenuItemBg: darkItemBgMnu,
              darkItemSelectedBg: darkItemSelectedBg,
              itemBorderRadius: 0,
              lineWidthFocus: 4,
              itemPaddingInline: 40,
            },
            Button: {
              borderRadius: borderRadius,
              borderRadiusLG: borderRadius,
              borderRadiusSM: borderRadius,
            },
            Card: {
              borderRadiusLG: card.borderRadius,
            },
            Input: {
              borderRadius: borderRadius,
            },
            Select: {
              borderRadius: borderRadius,
            },
            DatePicker: {
              borderRadius: borderRadius,
            },
            Alert: {
              borderRadiusLG: borderRadius,
              colorInfo: colorPrimary,
              colorInfoBorder: '#ADC6FF',
            },
            Tag: {
              borderRadiusSM: 8,
            },
            Tooltip: {
              borderRadius: 12,
            },
            Descriptions: {
              titleMarginBottom: 4,
              itemPaddingBottom: 4,
            },
            Table: {
              rowExpandedBg: 'none',
            },
            Form: {
              itemMarginBottom: 8,
            },
            Segmented: {
              borderRadius: borderRadius,
              borderRadiusSM: borderRadius,
            },
            Steps: {
              iconSizeSM: 32,
            },
            InputNumber: {
              borderRadius: 12,
              borderRadiusSM: 12,
            },
            Skeleton: {
              controlHeightSM: 22,
            },
          },
        }}
      >
        <StyleProvider cache={cache}>{children}</StyleProvider>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default StyledComponentsRegistry
