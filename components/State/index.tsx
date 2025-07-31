import { TagProps } from "antd/lib"

import Tag from "@components/Tag"
import { snakeCaseToTitleCase, textType } from "@utils/helper"

interface StateProps extends TagProps {
  label: string | undefined | null
  icon?: React.ReactNode
}

const State = ({ label, icon, ...StateProps }: StateProps) => {
  if (!label) return "-"

  // prevent state is number
  if (typeof label !== "string") return "-"

  const state = textType(label)

  return (
    <Tag
      {...(state !== "stopped" && {
        color: state
      })}
      {...StateProps}
    >
      {icon}
      {snakeCaseToTitleCase(label)}
    </Tag>
  )
}

export default State
