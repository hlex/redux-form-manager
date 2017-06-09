const initialState = {
  firstname: '',
  lastname: '',
  fatherName: '',
  motherName: '',
  age: '',
  gender: '',
  email: '',
  contactMobileNumber: '',
  contactNumber: '',
  address: {
    number: '',
    moo: '',
    village: '',
    buildingName: '',
    buildindRoom: '',
    buildingFloor: '',
    soi: '',
    street: '',
    subdistrict: '',
    district: '',
    province: '',
    zipCode: ''
  },
  food: '',
  drink: '',
  shirtSize: ''
}

const customer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORM/CHANGE/CUSTOMER':
      return {
        ...state,
        [action.key]: action.value
      }
    default:
      return state
  }
}

export default customer
