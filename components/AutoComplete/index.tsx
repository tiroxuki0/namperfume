import { AutoComplete as AntdAutocomplete, AutoCompleteProps } from 'antd'
import { BaseOptionType, DefaultOptionType } from 'antd/es/select'

const AutoComplete = <T, O extends BaseOptionType | DefaultOptionType>(
  props: React.PropsWithChildren<AutoCompleteProps<T, O>> & React.RefAttributes<any>
) => {
  const { children, ...rest } = props

  return <AntdAutocomplete {...rest}>{children}</AntdAutocomplete>
}

export default AutoComplete
