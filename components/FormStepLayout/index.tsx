"use client"

import { ReactNode } from "react"

import { Col, Row } from "antd"
import { StepProps } from "antd/lib"

import FlexCustom from "@components/FlexCustom"
import Steps from "@components/Steps"

const FormStepLayout = ({
  step,
  stepList,
  stepForm
}: {
  step: number
  stepList: StepProps[]
  stepForm: ReactNode
}) => {
  return (
    <>
      <FlexCustom.FlexStep style={{ marginBottom: 0 }}>
        <Steps current={step} items={stepList} size="small" type="navigation" />
      </FlexCustom.FlexStep>
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
