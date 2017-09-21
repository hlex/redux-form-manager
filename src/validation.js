const isEmail = (value) => {
  // if (value === '') return true;
  return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
}
const isThaiMobile = (value) => {
  // if (value === '') return true;
  return /^(\+)?(66|0)(-|\s)?\d{2}(-|\s)?\d{3}(-|\s)?\d{4}$/.test(value);
}
const isThaiPhone = (value) => {
  // if (value === '') return true;
  return /^(\+)?(66|0)(-|\s)?\d{2}(-|\s)?\d{3}(-|\s)?\d{3}$/.test(value);
}
const isThaiID = (value) => {
  // if (value === '') return true;
  if (value.length !== 13) return false;

  let j = 13;
  const temp = [];
  let temp2 = 0;

  for (let i = 0; i <= 11; i += 1) {
    temp[i] = Number(value[i]) * j;
    temp2 += temp[i];
    j -= 1;
  }

  const mod = temp2 % 11;
  const ans = 11 - mod;
  const answer = ans % 10;
  const www = Number(value[12]);
  if (www === answer) {
    return true;
  }
  return false;
};
const moreThanMaxLength = (value, maxLength) => {
  if (value === null || value === undefined) {
    return false
  }
  return value.length > maxLength
};
const lessThanMinLength = (value, minLength) => {
  if (value === null || value === undefined) {
    return false;
  }
  return value.length < minLength
};
const isAlphabet = (value) => {
  return /[a-zA-Zก-๙]/.test(value);
};
function isNumber(value) {
  const _value = toNumber(value);
  const re = /^-?\d+(\.\d+)?$/;
  return re.test(_value);
}
const isCorrectBracket = (value) => {
  // const regex = /^[A-Za-z0-9ก-๙]+\([A-Za-z0-9ก-๙]+\)/;
  // const regex = /\([A-Za-z0-9ก-๙\-\s./]+\)/;
  const regex = /^.+\(.+\)/;
  if (/[()]/.test(value)) {
    return regex.test(value);
  }
  return true;
  // return regex.test(value);
};
const notStartWithSpacing = (value) => {
  const regex = /^\s/;
  return !regex.test(value);
};
const notContainDoubleSpacing = (value) => {
  const regex = /\s{2,}/;
  return !regex.test(value);
};
const notEndWithSpacing = (value) => {
  const regex = /\s$/;
  return !regex.test(value);
};
const notContainSpecialChar = (value) => {
  const spe = /[!@#$%&฿"'<>*+~`_?{}()|^\\/]/;
  return !spe.test(value);
};

const validateRules = (value, rules) => {
  let errorMessage = false
  for (const ruleKey in rules) {
    const rule = rules[ruleKey] // rule could be string or object
    switch (ruleKey) {
      case 'required':
      case 'require':
        errorMessage = value === '' ? rule : ''
        break
      case 'email':
        if (!isEmail(value)) errorMessage = rule
        break
      case 'thaiMobile':
        if (!isThaiMobile(value)) errorMessage = rule
        break
      case 'thaiPhone':
        if (!isThaiPhone(value)) errorMessage = rule
        break
      case 'thaiId':
        if (!isThaiID(value)) errorMessage = rule
        break
      case 'maxLength':
        if (!rule.maxLength) {
          console.error('maxLength error. Please send maxLength key')
          break
        }
        if (moreThanMaxLength(value, rule.maxLength)) errorMessage = rule
        break
      case 'customValidate':
        for (let i = 0; i < rules.customValidate.length; i++) {
          if (value !== '' && !rules.customValidate[i].valid(value)) {
            errorMessage = rules.customValidate[i].message
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
