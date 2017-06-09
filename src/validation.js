import _h from './helpers/index.js'

/*
  rules: {
    required: 'กรุณาระบุชื่อ',
    maxLength: {
      value: 13,
      message: 'Hello'
    }
  }
*/
const validateRules = (value, rules) => {
  let errorMessage = ''
  for (const ruleKey in rules) {
    const rule = rules[ruleKey] // rule could be string or object
    switch (ruleKey) {
      case 'required':
      case 'require':
        errorMessage = _h.isEmpty(value) ? rule : ''
        break
      case 'maxLength':
        errorMessage = value.length <= rule.value.length ? rule : ''
        break
      case 'customerValidate':
        break
      default:
        errorMessage = ''
        break
    }
  }
  return errorMessage
}

export default validateRules
