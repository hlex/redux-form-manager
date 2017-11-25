const initialState = {
  name: '',
  code: '',
  price: '',
  size: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FORM/CHANGE/PRODUCT':
      return {
        ...state,
        [action.key]: action.value
      }
    default:
      return state
  }
}
