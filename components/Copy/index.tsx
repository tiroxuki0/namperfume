import React, { useState } from "react"

import { Tooltip } from "antd"
import { CopyOutlined, CheckOutlined } from "@ant-design/icons"

interface Copy {
  value?: string | undefined
}
function Copy({ value }: Copy) {
  const [isCopy, setIsCopy] = useState(false)

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value)
      setIsCopy(true)
      setTimeout(() => setIsCopy(false), 4000)
    }
  }

  return (
    <Tooltip title={isCopy ? "Copied" : "Copy"}>
      {isCopy ? (
        <CheckOutlined
          style={{ cursor: "pointer", color: "#52c41a", marginLeft: "5px", marginRight: "3px" }}
        />
      ) : (
        <CopyOutlined
          style={{ cursor: "pointer", color: "#1d39c4", marginLeft: "5px", marginRight: "3px" }}
          onClick={handleCopy}
        />
      )}
    </Tooltip>
  )
}

export default Copy
