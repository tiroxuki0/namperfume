"use client"

import React, { ReactNode } from "react"

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"

import { Form, Space } from "antd"

import { useRouter } from "next/navigation"

import { useTranslation } from "react-i18next"

import Button from "@components/Button"
import Flex from "@components/Flex"
import FormStepLayout from "@components/FormStepLayout"
import PageLayout from "@components/PageLayout"
import ProtectedRoute from "@components/ProtectedShield"
import { CreationStep } from "@root/constant/step"
import { useVisible } from "@root/hooks/useVisible"
import ROUTE from "@utils/pageRoutes"

import DiscardPrompt from "@containers/TemplatePage/components/modals/DiscardPrompt"

import { TEMPLATE_CREATE_TEST_ID } from "../data-testid"
import { useCreateSample } from "../mutation/useCreateSample"

const Page = () => {
  const { t } = useTranslation()
  const { visible, show, hide } = useVisible()
  const formatBreadcrumb = () => {
    return {
      items: [
        {
          title: t("templatePage.breadcrumb1")
        },
        {
          title: t("templatePage.breadcrumb2")
        },
        {
          title: <a href={ROUTE.TEMPLATE.LIST}> {t("templatePage.title")}</a>
        },
        {
          title: t("button.create")
        }
      ]
    }
  }
  const stepList = [
    {
      title: t("title.generalInformation")
    },
    {
      title: t("title.pricing")
    }
  ]

  const [form] = Form.useForm()

  const router = useRouter()

  const [step, setStep] = React.useState<number>(CreationStep.Step1)

  const { create, isCreating } = useCreateSample()

  const onBack = () => router.push(ROUTE.TEMPLATE.LIST)
  const onGoBack = () => {
    const fields = form.getFieldsValue(true)
    if (
      !!Object.values(fields)?.length &&
      (Object.values(fields) as (string | number | boolean | null | undefined)[]).some(
        field => !!field
      )
    ) {
      show()
      return
    }
    onBack()
  }

  const childrenMapping: Record<number, ReactNode> = {
    [CreationStep.Step1]: <></>,
    [CreationStep.Step3]: <></>
  }
  const onCreate = () => {
    const params = null

    if (params)
      create(params, {
        onSuccess: onBack
      })
  }

  return (
    <ProtectedRoute>
      <PageLayout
        breadcrumb={formatBreadcrumb()}
        title={t("templatePage.create.title")}
        type="banner"
        footer={
          <Flex justify="space-between">
            <Button
              data-testid={TEMPLATE_CREATE_TEST_ID.CANCEL_BUTTON}
              disabled={isCreating}
              type="text"
              onClick={onGoBack}
            >
              {t("button.cancel")}
            </Button>
            <Space>
              {step > CreationStep.Step1 && (
                <Button
                  data-testid={TEMPLATE_CREATE_TEST_ID.BACK_BUTTON}
                  disabled={isCreating}
                  icon={<ArrowLeftOutlined />}
                  onClick={() => {
                    setStep(prev => (prev -= 1))
                  }}
                >
                  {t("button.backOnly")}
                </Button>
              )}
              <Button
                data-testid={TEMPLATE_CREATE_TEST_ID.CREATE_BUTTON}
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                loading={isCreating}
                type="primary"
                onClick={() => {
                  if (step === CreationStep.Step2) {
                    form.submit()
                    return
                  }
                  form.validateFields().then(() => {
                    setStep(prev => (prev += 1))
                  })
                }}
              >
                {step === CreationStep.Step2 ? t("button.create") : t("button.next")}
              </Button>
            </Space>
          </Flex>
        }
        styles={{
          body: {
            padding: 0
          }
        }}
        onBack={onBack}
      >
        <Form
          form={form}
          id="template-creation-form"
          layout="vertical"
          initialValues={
            {
              // initialValues
            }
          }
          onFinish={onCreate}
        >
          <FormStepLayout step={step} stepForm={childrenMapping[step]} stepList={stepList} />
        </Form>
        {visible && <DiscardPrompt onCancel={hide} onDiscard={onBack} />}
      </PageLayout>
    </ProtectedRoute>
  )
}

export default Page
