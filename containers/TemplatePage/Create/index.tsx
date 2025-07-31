"use client"

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import Button from "@components/Button"
import Flex from "@components/Flex"
import FormStepLayout from "@components/FormStepLayout"
import PageLayout from "@components/PageLayout"
import ProtectedRoute from "@components/ProtectedShield"
import { CreationStep } from "@root/constant/step"
import { useVisible } from "@root/hooks/useVisible"
import ROUTE from "@utils/pageRoutes"
import { Form, Space } from "antd"
import { useRouter } from "next/navigation"
import React, { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { TEMPLATE_CREATE_TEST_ID } from "../data-testid"
import { useCreateSample } from "../mutation/useCreateSample"
import DiscardPrompt from "@containers/TemplatePage/components/modals/DiscardPrompt"

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
    if (!!Object.values(fields)?.length && Object.values(fields).some((field: any) => !!field)) {
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
        title={t("templatePage.create.title")}
        type="banner"
        onBack={onBack}
        breadcrumb={formatBreadcrumb()}
        styles={{
          body: {
            padding: 0
          }
        }}
        footer={
          <Flex justify="space-between">
            <Button disabled={isCreating} type="text" data-testid={TEMPLATE_CREATE_TEST_ID.CANCEL_BUTTON} onClick={onGoBack}>
              {t("button.cancel")}
            </Button>
            <Space>
              {step > CreationStep.Step1 && (
                <Button
                  disabled={isCreating}
                  icon={<ArrowLeftOutlined />}
                  onClick={() => {
                    setStep((prev) => (prev -= 1))
                  }}
                  data-testid={TEMPLATE_CREATE_TEST_ID.BACK_BUTTON}
                >
                  {t("button.backOnly")}
                </Button>
              )}
              <Button
                type="primary"
                loading={isCreating}
                onClick={() => {
                  if (step === CreationStep.Step2) {
                    form.submit()
                    return
                  }
                  form.validateFields().then(() => {
                    setStep((prev) => (prev += 1))
                  })
                }}
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                data-testid={TEMPLATE_CREATE_TEST_ID.CREATE_BUTTON}
              >
                {step === CreationStep.Step2 ? t("button.create") : t("button.next")}
              </Button>
            </Space>
          </Flex>
        }
      >
        <Form
          initialValues={
            {
              // initialValues
            }
          }
          id="template-creation-form"
          layout="vertical"
          form={form}
          onFinish={onCreate}
        >
          <FormStepLayout step={step} stepList={stepList} stepForm={childrenMapping[step]} />
        </Form>
        {visible && <DiscardPrompt onCancel={hide} onDiscard={onBack} />}
      </PageLayout>
    </ProtectedRoute>
  )
}

export default Page
