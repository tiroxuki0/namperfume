import { env } from "next-runtime-env"

import { decodeBase64 } from "@utils/helper"

const base64PasswordRegex = env("NEXT_PUBLIC_REGEX_PASSWORD_POLICY") || ""
const maxPasswordLength = env("NEXT_PUBLIC_MAX_PASSWORD_LENGTH") || 0
const minPasswordLength = env("NEXT_PUBLIC_MIN_PASSWORD_LENGTH") || 0

export const usePasswordPolicy = () => {
  // TODO: remove this log after understanding the weirdo bug
  console.log({
    base64PasswordRegex,
    maxPasswordLength,
    minPasswordLength
  })
  return {
    passwordRegex: decodeBase64(base64PasswordRegex) || "",
    maxPasswordLength: isNaN(+maxPasswordLength) ? 0 : +maxPasswordLength,
    minPasswordLength: isNaN(+minPasswordLength) ? 0 : +minPasswordLength
  }
}
