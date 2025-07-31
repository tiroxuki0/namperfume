import { useState } from "react"

type CopyValue = string | null
type CopyFunction = (text: string) => Promise<boolean>
export default function useCopyToClipboard(): {
  copiedValue: CopyValue
  copy: CopyFunction
} {
  const [copiedValue, setCopiedValue] = useState<CopyValue>(null)

  const copy: CopyFunction = async (text: string) => {
    if (!navigator.clipboard) {
      return false
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopiedValue(text)
      return true
    } catch (error) {
      console.error(error)
      setCopiedValue(null)
      return false
    }
  }

  return {
    copiedValue,
    copy
  }
}
