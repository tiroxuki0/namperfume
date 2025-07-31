import useCopyToClipboard from '@root/hooks/useCopyToClipboard'
import { Trans, useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { Card, Space, Tooltip } from 'antd'
import { InputPassword } from '@components/Input/index'
import Button from '@components/Button'
import { Typography } from '@components/Typography'
import { RuleObject, StoreValue } from 'rc-field-form/es/interface'
import { InfoCircleOutlined } from '@ant-design/icons'
import { usePasswordPolicy } from '@root/hooks/usePasswordPolicy'

export const useValidatePassword = () => {
  const { t } = useTranslation()

  const { maxPasswordLength, minPasswordLength, passwordRegex } = usePasswordPolicy()

  const regex = new RegExp(passwordRegex || '')

  function generatePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%&*'
    let password = ''

    // Retry logic to ensure password matches the regex
    while (true) {
      const length =
        Math.floor(Math.random() * ((maxPasswordLength ?? 0) - (minPasswordLength ?? 0) + 1)) +
        (minPasswordLength ?? 0)
      password = Array.from(
        { length },
        () => characters[Math.floor(Math.random() * characters.length)]
      ).join('')

      // Validate the password against the regex
      if (regex.test(password)) break
    }

    return password
  }

  const validatePassword = (value: string) => {
    if (!regex.test(value)) {
      return {
        result: false,
        message: (
          <Trans
            i18nKey="error.wrongPassword"
            values={{ policy: 'password complexity requirements' }}
            components={{
              span: <span />,
            }}
          />
        ),
      }
    }

    if (regex.test(value) && minPasswordLength && value.length < minPasswordLength) {
      return {
        result: false,
        message: t('error.minPassword', { password: minPasswordLength }),
      }
    }

    if (regex.test(value) && maxPasswordLength && value.length > maxPasswordLength) {
      return {
        result: false,
        message: t('error.maxPassword', { password: maxPasswordLength }),
      }
    }
    return {
      result: regex.test(value),
      message: '',
    }
  }

  const passwordValidator =
    ({ require, label }: { require: boolean; label?: string }) =>
    (_: RuleObject, value: StoreValue) => {
      if (require && !value) {
        return Promise.reject(t('error.requiredInput', { field: label }))
      }
      const { result, message } = validatePassword(value)

      if (!result) {
        return Promise.reject(message)
      }
      return Promise.resolve()
    }

  return {
    passwordValidator,
    generatePassword,
  }
}

export const PasswordSuggestion = () => {
  const { t } = useTranslation()

  const { maxPasswordLength, minPasswordLength, passwordRegex } = usePasswordPolicy()

  const pwRegex = (passwordRegex || '').split(/[()]/)
  let stringPassedRegex = (pwRegex || '').filter((regx) => regx.startsWith('?=.*'))

  const getPlainText = (st: string) =>
    st.replaceAll('[', '').replaceAll(']', '').split('-').join('')
  const isNumber = (str: string) => /^[0-9]+$/.test(str)
  const isUppercase = (str: string) => /^[A-Z]+$/.test(str)
  const isLowercase = (str: string) => /^[a-z]+$/.test(str)
  const isSpecialCharacter = (str: string) => /[^a-zA-Z0-9\s]/.test(str)

  stringPassedRegex = (stringPassedRegex || '')
    .map((st) => st.replaceAll('\\d', '[0-9]'))
    .map((st) => st.replaceAll('?=.*', ''))

  stringPassedRegex = (stringPassedRegex || '').map((str) => {
    if (isNumber(getPlainText(str))) {
      return t('error.passwordPolicy.rangeNumber', {
        message: getPlainText(str).split('').join('-'),
      })
    }

    if (isLowercase(getPlainText(str))) {
      return t('error.passwordPolicy.rangeLowercase', {
        message: getPlainText(str).split('').join('-'),
      })
    }

    if (isUppercase(getPlainText(str))) {
      return t('error.passwordPolicy.rangeUppercase', {
        message: getPlainText(str).split('').join('-'),
      })
    }

    if (isSpecialCharacter(getPlainText(str))) {
      return t('error.passwordPolicy.specialCharacter', {
        message: getPlainText(str),
      })
    }

    return str
  })

  return (
    <Tooltip
      overlayInnerStyle={{
        minWidth: 360,
        background: '#fff',
        padding: 0,
      }}
      color="#fff"
      title={
        <Card size="small" title={t('error.passwordPolicy.title')}>
          <Trans
            i18nKey="error.passwordPolicy.between"
            values={{
              message: t('error.passwordPolicy.minAndMax', {
                min: minPasswordLength,
                max: maxPasswordLength,
              }),
            }}
            components={{
              strong: <strong />,
            }}
          />
          {(stringPassedRegex || []).map((str) => {
            return (
              <div key={str}>
                <Trans
                  i18nKey="error.passwordPolicy.atLeast"
                  values={{
                    message: str,
                  }}
                  components={{
                    strong: <strong />,
                  }}
                />
              </div>
            )
          })}
        </Card>
      }
    >
      <InfoCircleOutlined />
    </Tooltip>
  )
}

export const GeneratePasswordInput = ({
  value,
  onChange,
}: {
  value?: string | number
  onChange?: (value: string | number) => void
}) => {
  const { copy } = useCopyToClipboard()

  const { t } = useTranslation()

  const { generatePassword } = useValidatePassword()

  const [password, setPassword] = useState<string>('')

  //--------------------------------------------------------------------------> Render

  return (
    <Space.Compact className="test-password" size="middle" style={{ width: '100%' }}>
      <InputPassword
        autoComplete="new-password"
        value={value}
        data-testid="common-input-password"
        onChange={(ev) => onChange?.(ev.target.value)}
      />
      <Button
        onClick={() => {
          const password = generatePassword()
          setPassword(password)
          onChange?.(password)
        }}
        data-testid="generate-button-password"
      >
        {t('usersPage.actions.passwordGenerate')}
      </Button>

      <Button
        data-testid="generate-button-copy-password"
        onClick={() => copy(password)}
        icon={
          <div style={{ marginTop: 8 }}>
            <Typography.Text copyable={{ text: password }} />
          </div>
        }
      />
    </Space.Compact>
  )
}
