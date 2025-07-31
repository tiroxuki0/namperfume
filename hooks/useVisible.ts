import { useState } from "react"

export const useVisible = () => {
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  return {
    show: showModal,
    hide: hideModal,
    visible
  }
}
