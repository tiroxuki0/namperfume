"use client"

import { ReactNode } from "react"

import { Col, Row } from "antd"
import { StepProps } from "antd/lib"

const FormStepLayout = ({
  stepForm
}: {
  step: number
  stepList: StepProps[]
  stepForm: ReactNode
}) => {
  return (
    <>
      <Row
        gutter={[12, 12]}
        style={{
          marginLeft: 0,
          marginRight: 0,
          position: "relative"
        }}
      >
        <Col span={24} style={{ padding: 24, marginBottom: 60 }}>
          {stepForm}
        </Col>
      </Row>
    </>
  )
}

export default FormStepLayout
