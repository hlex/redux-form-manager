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
    customerValidate: [
      email: (value) => {
        return value.indexOf('@') > 0
      },
      myname: (value) => {
        return value === 'myname'
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
  const { customer } = state
  const isMale = customer.gender === 'MALE'
  console.log('isMale', isMale)
  return {
    firstname: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'text',
      key: 'firstname',
      name: 'firstname',
      placeholder: 'this is first name',
      label: 'Firstname',
      value: customer.firstname,
      disabled: false,
      rules: {
        required: 'กรุณาระบุชื่อ'
      }
    },
    lastname: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'text',
      key: 'lastname',
      name: 'lastname',
      placeholder: 'this is last name',
      label: 'Lastname',
      value: customer.lastname,
      disabled: false,
      rules: {
        required: 'กรุณาระบุนามสกุล'
      }
    },
    fatherName: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'text',
      key: 'fatherName',
      name: 'fatherName',
      placeholder: 'just type your dad\'s name Ex. dad',
      label: 'Father name',
      value: customer.fatherName,
      disabled: false,
      rules: {
        required: 'กรุณาระบุชื่อพ่อ'
      }
    },
    motherName: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'text',
      key: 'motherName',
      name: 'motherName',
      placeholder: _.get(customer, 'fatherName', '') === 'dad'
        ? 'Your father is \'dad\' so I disabled mother name'
        : 'I love mom so I validated mom before dad',
      label: 'motherName',
      value: customer.motherName,
      disabled: _.get(customer, 'fatherName', '') === 'dad',
      rules: {
        required: 'กรุณาระบุชื่อแม่'
      }
    },
    age: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'select',
      key: 'age',
      name: 'age',
      placeholder: 'select your age',
      options: [
        ...range(getRandomInt(15, 40)).map((integer) => {
          return {
            label: `${integer}`,
            value: `${integer}`
          }
        })
      ],
      label: 'Age',
      value: customer.age,
      disabled: false,
      rules: {
        required: 'กรุณาระบุอายุ'
      }
    },
    gender: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'radio',
      key: 'gender',
      name: 'gender',
      label: 'gender',
      options: [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' }
      ],
      value: customer.gender,
      disabled: false,
      rules: {
        required: 'กรุณาระบุเพศ'
      }
    },
    food: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'checkbox',
      key: 'food',
      name: 'food',
      label: 'food',
      options: [
        { label: 'Chicken', value: 'chicken', disabled: isMale },
        { label: 'Steak', value: 'steak', disabled: isMale },
        { label: 'Hamburger', value: 'hamburger', disabled: isMale },
        { label: 'Noodle', value: 'noodle' },
        { label: 'Egg', value: 'egg' }
      ],
      value: customer.food,
      disabled: false,
      rules: {
        required: 'กรุณาเลือกรายการอาหาร'
      }
    },
    drink: {
      actionType: 'FORM/CHANGE/CUSTOMER',
      type: 'checkbox',
      key: 'drink',
      name: 'drink',
      label: 'drink',
      options: [
        { label: 'Cola', value: 'cola' },
        { label: 'Orange Juice', value: 'orangeJuice' },
        { label: 'Way', value: 'way' },
        { label: 'Iced Coffee', value: 'icedCoffee' },
        { label: 'Water', value: 'water' }
      ],
      value: customer.drink,
      disabled: false,
      rules: {
        required: 'กรุณาเลือกเครื่องดื่ม'
      }
    }
  }
}

export default createForm
