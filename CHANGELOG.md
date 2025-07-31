# Changelog

## [Unreleased]

### Added

- **validateCommonName Function**: Introduced a new utility function `validateCommonName` to validate common names within the application. This function ensures that input strings meet specific criteria defined by a regular expression pattern (`REGEX_VALIDATE_COMMON_NAME`). It checks for valid, non-empty strings and matches them against the pattern to determine validity.

### Details

- **Functionality**: The `validateCommonName` function takes a string input and returns `true` if the input is a valid, non-empty string that matches the specified regular expression pattern. Otherwise, it returns `false`.
- **Usage Context**: This function is used in scenarios where input validation is required, such as form submissions or data processing tasks, to ensure that the input adheres to the expected format for a common name.
- **Dependencies**: Relies on the `isValidStringAndNotEmpty` helper function to verify that the input is a valid, non-empty string.
- **Configuration**: The regular expression pattern is defined in `@root/constant` as `REGEX_VALIDATE_COMMON_NAME`.

### Example

const isValid = validateCommonName('ValidName123'); // Returns true
const isInvalid = validateCommonName('Invalid@Name!'); // Returns false

### Added

- **`shouldDisableOption` Callback**: Introduced a new optional callback function `shouldDisableOption` in the `SelectResource` component. This function allows developers to specify custom logic to determine whether an option should be disabled in the dropdown.

### Details

- **Functionality**: The `shouldDisableOption` function takes an `option` of type `ObjectLiteral` as its parameter and returns a boolean value. If the function returns `true`, the option will be disabled in the dropdown menu.
- **Usage Context**: This feature is useful in scenarios where certain options need to be conditionally disabled based on specific criteria, such as user permissions or data states.
- **Integration**: The `disabled` property of each option in the dropdown is set based on the result of the `shouldDisableOption` function.

### Example

<SelectResource
shouldDisableOption={(option) => option.someCondition === true}
/>
