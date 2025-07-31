import { ButtonProps } from 'antd'

export type BulkActionType = Omit<ButtonProps, 'children' | 'onClick'> & {
  text: string
  id: string
  permission?: string
  isHide?: boolean
}

export const paginationOptions = [10, 20, 30, 50, 100]
