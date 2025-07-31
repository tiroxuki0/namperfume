import { ConfigProvider as AntdConfigProvider, ConfigProviderProps } from 'antd'

const ConfigProvider = (props: ConfigProviderProps) => {
  const { children, ...rest } = props

  return <AntdConfigProvider {...rest}>{children}</AntdConfigProvider>
}

export default ConfigProvider
