/*
  Template: createForm
  ======================
  actionType: , // constant of redux action
  type: '', // text, textArea, radio, checkbox, select, selectWithFilter, switch, buttonGroup, custom
  key: '', // string this should be unique key of field
  name: '', // string same as key
  placeholder: '', // string
  label: '', // string
  value: '', // should be data form reducer
  disabled: '', // true or false
  rules: { // validation rules
    required: 'กรุณาระบุชื่อ',
    customValidate: [
      {
        valid: (value) => {
          return value.indexOf('@') > 0
        },
        message: 'รูปแบบ email ไม่ถูกต้อง'
      }
    ]
  }
*/
const range = (i) => {
  return i ? range(i - 1).concat(i) : []
}
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const createForm = (state) => {
  const { product: { name, code, price, size } } = state
  return {
    name: {
      key: 'name',
      name: 'name',
      type: 'text',
      placeholder: 'fill product name',
      label: 'Product Name',
      value: name,
      disabled: false,
      rules: {
        required: 'กรุณาระบุชื่อสินค้า'
      }
    },
    code: {
      type: 'text',
      key: 'code',
      name: 'code',
      placeholder: 'fill product code',
      label: 'Product Code',
      value: code,
      disabled: false,
      rules: {
        required: 'กรุณาระบุรหัสสินค้า'
      }
    },
    price: {
      type: 'number',
      key: 'price',
      name: 'price',
      placeholder: '',
      label: 'Product Price',
      value: price,
      disabled: false,
      hidden: false,
      rules: {
        required: 'กรุณาระบุราคาสินค้า'
      }
    },
    size: {
      type: 'select',
      key: 'size',
      name: 'size',
      placeholder: 'select your size',
      options: [
        ...range(getRandomInt(40, 45)).map((integer) => {
          return {
            label: `${integer}`,
            value: `${integer}`
          }
        })
      ],
      label: 'Product Size',
      value: size,
      disabled: false,
      rules: {
        required: 'กรุณาระบุไซส์'
      }
    }
  }
}

export default createForm
