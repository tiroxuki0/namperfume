import React from "react"

import { startCase } from "lodash"
import { useTranslation } from "react-i18next"

const TranslatedText = (props: { text: string; localeKey: string; defaultText?: string }) => {
  const { text, localeKey, defaultText } = props
  const { t } = useTranslation()
  const pattern = `${localeKey}.${text}`

  const translatedText = t(pattern, defaultText || startCase(text))

  // t(select.virtualNetwork)
  return <React.Fragment>{translatedText}</React.Fragment>
}

export default TranslatedText
