
const validateRules = (value, rules) => {
  let errorMessage = false
  for (const ruleKey in rules) {
    const rule = rules[ruleKey] // rule could be string or object
    switch (ruleKey) {
      case 'required':
      case 'require':
        errorMessage = value === '' ? rule : ''
        break

      case 'customValidate':
        for (let i = 0; i < rules.customValidate.length; i++) {
          if (value !== '' && !rules.customValidate[i].validate(value)) {
            errorMessage = rules.customValidate[i].massage
            break
          }
        }
        break

      default:
        errorMessage = ''
        break
    }
  }
  return errorMessage
}

export default validateRules
