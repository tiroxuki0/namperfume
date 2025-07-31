import { useProfileStore } from '@root/stores/profile/store'
import { InputNumber as AntInputNumber, InputNumberProps } from 'antd'

type Props = InputNumberProps & {
  showCurrency?: boolean
  disableFormatter?: boolean
}

export const InputNumber = ({ showCurrency, disableFormatter, ...props }: Props) => {
  const currency = useProfileStore.getState().currencyState
  const code = currency?.code
  const regex = new RegExp(`${code}\\s?|,`, 'g')
  return (
    <AntInputNumber
      formatter={
        disableFormatter ? undefined : (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      parser={
        disableFormatter ? undefined : (value) => value?.replace(regex, '') as unknown as number
      }
      placeholder="Enter"
      suffix={showCurrency ? code : null}
      {...props}
      style={{ width: '100%', borderRadius: '12px', ...props.style }}
    />
  )
}
