const initialState = {
  firstname: '',
  lastname: ''
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
