/*
  Template: createForm
*/
const createForm = (state) => {
  const { customer } = state
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
    }
  }
}

export default createForm
